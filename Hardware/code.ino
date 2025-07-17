#include <Arduino.h>
#include <Adafruit_BMP280.h>
#include <DHT.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <SPIFFS.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include <ThreeWire.h>
#include <RtcDS1302.h>

// Pin definitions
#define ANEMOMETER_PIN 13
#define WIND_DIR_PIN   35
#define RAIN_PIN       14
#define DHTPIN         27
#define DHTTYPE        DHT11
#define LDR_PIN        34
// RTC Pins
#define RTC_CLK_PIN    26 // SCLK/CLK
#define RTC_DAT_PIN    25 // IO/DAT Pin
#define RTC_RST_PIN    33 // CE/RST

ThreeWire myWire(RTC_DAT_PIN, RTC_CLK_PIN, RTC_RST_PIN);
RtcDS1302<ThreeWire> Rtc(myWire);

// RTC Globals
bool rtcConfidenceLost = false;
char rtcTimestamp[25]; // "YYYY-MM-DDTHH:MM:SSZ"

DHT dht(DHTPIN, DHTTYPE);
Adafruit_BMP280 bmp;

// Constants
const float ANEMOMETER_SCALER = 0.34;  // m/s per Hz
const float RAIN_MM_PER_TIP = 0.2794;  // mm per pulse

// Values
float dhtTemperature = 0.0, dhtHumidity = 0.0;
float pressure = 0.0, bmpTemperature = 0.0;
int sunlightRaw = 0;

// Wi-Fi and API
const char* ssid = "Hotspot";
const char* password = "testtest";
const char* apiEndpoint = "http://192.168.1.1:3000/api/test";
const char* apiKey = "testingKey";
byte mac[6];

// Global counters
volatile uint32_t anemometerCount = 0;
volatile uint32_t rainCount = 0;
volatile uint32_t lastRainInterrupt = 0;
volatile uint32_t lastWindSpeedInterrupt = 0;

// Wind direction data
volatile int windDirCount[8] = { 0 };
const int windDirRaw[8] = {750, 2000, 3730, 3120, 2650, 1350, 150, 370};
const char* windDirLabel[8] = {"N", "NE", "E", "SE", "S", "SW", "W", "NW"};

// --- Wi-Fi watchdog globals ---
static const uint32_t WIFI_CHECK_PERIOD_MS = 5000;  // how often to poll

// backoff table: immediate first check (0), then 5s, 15s, 30s, 60s (cap)
static const uint32_t wifiRetryIntervals[] = {0, 5000, 15000, 30000, 60000};
static const uint8_t  wifiRetryIntervalsCount = sizeof(wifiRetryIntervals)/sizeof(wifiRetryIntervals[0]);

static uint8_t  wifiAttemptStage = 0;
static uint32_t wifiLastAttempt  = 0;
static bool     wifiWasConnected = false;
volatile bool   wifiJustReconnected = false;  // set true when link comes back

// Interrupts
void IRAM_ATTR anemometerISR() {
  uint32_t now = millis();
  if (now - lastWindSpeedInterrupt > 1) {
    anemometerCount++;
    lastWindSpeedInterrupt = now;
  }
}

void IRAM_ATTR rainISR() {
  uint32_t now = millis();
  if (now - lastRainInterrupt > 200) {
    rainCount++;
    lastRainInterrupt = now;
  }
}

// Wind direction helper
int getWindDirectionIndex(int analogValue) {
  int closestIndex = 0;
  int minDiff = abs(analogValue - windDirRaw[0]);
  for (int i = 1; i < 8; i++) {
    int diff = abs(analogValue - windDirRaw[i]);
    if (diff < minDiff) {
      minDiff = diff;
      closestIndex = i;
    }
  }
  return closestIndex;
}

// RTC helper
void updateRtcStatus() {
  RtcDateTime now = Rtc.GetDateTime();
  if (!now.IsValid()) {
    rtcConfidenceLost = true;
    strcpy(rtcTimestamp, "0000-00-00T00:00:00Z");
  } else {
    rtcConfidenceLost = false;
    snprintf(rtcTimestamp, sizeof(rtcTimestamp), "%04u-%02u-%02uT%02u:%02u:%02uZ",
             now.Year(), now.Month(), now.Day(),
             now.Hour(), now.Minute(), now.Second());
  }
}

// WiFi helper
void printWiFiDetails() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("Wifi is not connected.");
    return;
  }

  WiFi.macAddress(mac);
  long rssi = WiFi.RSSI(); // Strength
  byte bssid[6]; WiFi.BSSID(bssid); // MAC address of router connected to

  // WiFi SSID connected to:
  Serial.print("Connected to: "); Serial.println(WiFi.SSID());
  // Devide IP Address:
  Serial.print("IP: "); Serial.println(WiFi.localIP());
  // Device MAC Address:
  Serial.print("MAC: ");
  Serial.print(mac[0],HEX); Serial.print(":"); Serial.print(mac[1],HEX); Serial.print(":");
  Serial.print(mac[2],HEX); Serial.print(":"); Serial.print(mac[3],HEX); Serial.print(":");
  Serial.print(mac[4],HEX); Serial.print(":"); Serial.println(mac[5],HEX);
  // Strenght of the signal:
  Serial.print("Signal strength: ");
  Serial.print(rssi);
  Serial.println("dBm");
  // MAC Address of connected router:
  Serial.print("Router MAC address: ");
  Serial.print(bssid[0],HEX); Serial.print(":"); Serial.print(bssid[1],HEX); Serial.print(":");
  Serial.print(bssid[3],HEX); Serial.print(":"); Serial.print(bssid[3],HEX); Serial.print(":");
  Serial.print(bssid[4],HEX); Serial.print(":"); Serial.println(bssid[5],HEX);
}

// SPIFFS helpers
void saveToFile(const String& data) {
    File file = SPIFFS.open("/unsent_data.txt", FILE_APPEND);
    if (file) {
        file.println(data);
        file.close();
    }
}

void resendSavedData() {
  if (!SPIFFS.exists("/unsent_data.txt")) return;
  if (WiFi.status() != WL_CONNECTED) return;

  File inFile = SPIFFS.open("/unsent_data.txt", FILE_READ);
  if (!inFile) return;

  File outFile = SPIFFS.open("/unsent_data_tmp.txt", FILE_WRITE);
  if (!outFile) {
    inFile.close();
    return;
  }

  while (inFile.available()) {
    String line = inFile.readStringUntil('\n');
    if (line.length() == 0) continue;

    HTTPClient http;
    http.setConnectTimeout(2000);
    http.setTimeout(3000);

    http.begin(apiEndpoint);
    http.addHeader("Content-Type", "application/json");
    int code = http.POST(line);
    http.end();

    if (code < 200 || code >= 300) {
      outFile.println(line);
    }
  }
  inFile.close();
  outFile.close();

  SPIFFS.remove("/unsent_data.txt");
  SPIFFS.rename("/unsent_data_tmp.txt", "/unsent_data.txt");
}

void sendJsonToServer(float windSpeed, const char* windDir, float rain, float dhtTemp, float dhtHum, float press, int light) {
  Serial.println("Sending data to API...");
  StaticJsonDocument<512> jsonDoc;
  jsonDoc["wind_speed_m_s"] = windSpeed;
  jsonDoc["wind_direction"] = windDir;
  jsonDoc["rain_mm"] = rain;
  jsonDoc["temperature_dht"] = dhtTemp;
  jsonDoc["humidity_dht"] = dhtHum;
  jsonDoc["pressure_hpa"] = press;
  jsonDoc["sunlight_raw"] = light;
  jsonDoc["rtc_timestamp"] = rtcTimestamp;
  jsonDoc["rtc_confidence_lost"] = rtcConfidenceLost;
  jsonDoc["api_key"] = apiKey;

  String requestBody;
  serializeJson(jsonDoc, requestBody);

  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.setConnectTimeout(2000);
    http.setTimeout(3000);

    http.begin(apiEndpoint);
    http.addHeader("Content-Type", "application/json");
    int httpResponseCode = http.POST(requestBody);
    http.end();

    if (httpResponseCode < 200 || httpResponseCode >= 300) {
      saveToFile(requestBody);
      Serial.println("Data saved to file");
    }else{
      Serial.println("Data send successfully!");
    }
  } else {
    saveToFile(requestBody);
    Serial.println("Data saved to file");
  }
}

// Tasks
void vTaskWifiWatchdog(void* pvParameters) {
  for (;;) {
    wl_status_t st = WiFi.status();
    if (st == WL_CONNECTED) {
      // On first reconnect after outage
      if (!wifiWasConnected) {
        wifiJustReconnected = true;
        Serial.print("WiFi reconnected. IP: ");
        Serial.println(WiFi.localIP());
      }
      wifiWasConnected = true;
      wifiAttemptStage = 0;  // reset backoff
    } else {
      // Not connected
      wifiWasConnected = false;
      uint32_t now = millis();
      uint32_t wait = wifiRetryIntervals[
        (wifiAttemptStage < wifiRetryIntervalsCount) ? wifiAttemptStage : (wifiRetryIntervalsCount - 1)
      ];
      if (now - wifiLastAttempt >= wait) {
        Serial.println("WiFi reconnect attempt...");
        // Optional clean disconnect; 'true' arg wipes old config from STA? (depends on core ver)
        WiFi.disconnect(false, false);
        WiFi.begin(ssid, password);   // async; returns immediately
        wifiLastAttempt = now;
        if (wifiAttemptStage < (wifiRetryIntervalsCount - 1)) wifiAttemptStage++;
      }
    }
    vTaskDelay(pdMS_TO_TICKS(WIFI_CHECK_PERIOD_MS));
  }
}

void vTaskWindDir(void* pvParameters) {
  for (;;) {
    int raw = analogRead(WIND_DIR_PIN);
    int idx = getWindDirectionIndex(raw);
    windDirCount[idx]++;
    vTaskDelay(pdMS_TO_TICKS(1000));
  }
}

void vTaskOutput(void* pvParameters) {
  TickType_t xLastWakeTime = xTaskGetTickCount();
  for (;;) {
    vTaskDelayUntil(&xLastWakeTime, pdMS_TO_TICKS(60000));

    updateRtcStatus();

    float speed_m_s = (anemometerCount / 60.0f) * ANEMOMETER_SCALER;
    float speed_km_h = speed_m_s * 3.6f;
    float rain_mm = rainCount * RAIN_MM_PER_TIP;

    int maxCount = 0, dominantIdx = 0;
    for (int i = 0; i < 8; i++) {
        if (windDirCount[i] > maxCount) {
            maxCount = windDirCount[i];
            dominantIdx = i;
        }
    }
    const char* dominantDir = windDirLabel[dominantIdx];

    Serial.println("Trying to resend saved data...");
    resendSavedData();
    Serial.println("Finished resending saved data.");
    
    sendJsonToServer(speed_m_s, dominantDir, rain_mm, dhtTemperature, dhtHumidity, pressure, sunlightRaw);

    anemometerCount = 0;
    rainCount = 0;
    for (int i = 0; i < 8; i++) windDirCount[i] = 0;
  }
}

void vTaskEnvironment(void* pvParameters) {
  for (;;) {
    dhtHumidity = dht.readHumidity();
    dhtTemperature = dht.readTemperature();
    bmpTemperature = bmp.readTemperature();
    pressure = bmp.readPressure() / 100.0F;
    sunlightRaw = analogRead(LDR_PIN);
    vTaskDelay(pdMS_TO_TICKS(5000));
  }
}

void setup() {
  Serial.begin(115200);

  pinMode(ANEMOMETER_PIN, INPUT_PULLUP);
  pinMode(RAIN_PIN, INPUT_PULLUP);
  pinMode(WIND_DIR_PIN, INPUT);
  pinMode(LDR_PIN, INPUT_PULLDOWN);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  if (!SPIFFS.begin(true)) { Serial.println("SPIFFS failed"); }

  attachInterrupt(digitalPinToInterrupt(ANEMOMETER_PIN), anemometerISR, FALLING);
  attachInterrupt(digitalPinToInterrupt(RAIN_PIN), rainISR, FALLING);

  dht.begin();

  if (!bmp.begin()) {
    Serial.println("BMP280 not detected!");
  }
  // RTC Init
  Rtc.Begin();
  RtcDateTime compiled(__DATE__, __TIME__);
  if (!Rtc.IsDateTimeValid()) { Rtc.SetDateTime(compiled); }
  if (Rtc.GetIsWriteProtected()) { Rtc.SetIsWriteProtected(false); }
  if (!Rtc.GetIsRunning()) { Rtc.SetIsRunning(true); }
  RtcDateTime now = Rtc.GetDateTime();
  if (now < compiled) { Rtc.SetDateTime(compiled); }

  updateRtcStatus();        // populate rtcTimestamp & rtcConfidenceLost
  Serial.print("RTC init: ");
  Serial.print(rtcTimestamp);
  Serial.print(" valid=");
  Serial.println(!rtcConfidenceLost);

  // Create tasks
  xTaskCreate(vTaskWifiWatchdog, "WiFiWatch", 3072, NULL, 1, NULL);
  xTaskCreate(vTaskWindDir, "WindDir", 4096, NULL, 1, NULL);
  xTaskCreate(vTaskOutput, "Output", 8192, NULL, 1, NULL);
  xTaskCreate(vTaskEnvironment, "Environment", 4096, NULL, 1, NULL);

}

void loop() { 
  // Serial command handler
  if (Serial.available()) {
    String cmd = Serial.readStringUntil('\n');
    if (cmd.startsWith("RTC SET ")) {
      int y, m, d, hh, mm, ss;
      if (sscanf(cmd.c_str() + 8, "%d-%d-%d %d:%d:%d", &y, &m, &d, &hh, &mm, &ss) == 6) {
        RtcDateTime custom(y, m, d, hh, mm, ss);
        Rtc.SetDateTime(custom);
        updateRtcStatus();
        Serial.println("------------------------");
        Serial.print("RTC updated to: ");
        Serial.print(y); Serial.print("-"); Serial.print(m); Serial.print("-"); Serial.print(d);
        Serial.print(" "); Serial.print(hh); Serial.print(":"); Serial.print(mm); Serial.print(":"); Serial.println(ss);
        Serial.println("------------------------");
      } else {
        Serial.println("------------------------");
        Serial.println("Invalid format! Use: SET YYYY-MM-DD HH:MM:SS");
        Serial.println("------------------------");
      }
      return;
    }
    
    if(cmd.startsWith("RTC GET")){
      updateRtcStatus();
      Serial.println("------------------------");
      Serial.print("current time:"); Serial.println(rtcTimestamp);
      Serial.println("------------------------");
      return;
    }

    if(cmd.startsWith("WiFi GET")){
      Serial.println("------------------------");
      printWiFiDetails();
      Serial.println("------------------------");
      return;
    }
    Serial.println("------------------------");
    Serial.println("Bad command. Available commands:");
    Serial.println("RTC SET");
    Serial.println("RTC GET");
    Serial.println("WiFi GET");
    Serial.println("------------------------");
  }
  vTaskDelay(pdMS_TO_TICKS(100));
}