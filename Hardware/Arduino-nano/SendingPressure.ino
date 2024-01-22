// připojení potřebných knihoven
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BMP280.h>
// nastavení adresy senzoru
#define BMP280_ADRESA (0x76)
// inicializace senzoru BMP z knihovny
Adafruit_BMP280 bmp;

// konstanta s korekcí měření v hPa
int korekce = 32;

void setup() {
  // komunikace po sériové lince rychlostí 9600 baud
  Serial.begin(9600);
  // zahájení komunikace se senzorem BMP280,
  // v případě chyby je vypsána hláška po sériové lince
  // a zastaven program
  if (!bmp.begin(BMP280_ADRESA)) {
    Serial.println("BMP280 senzor nenalezen, zkontrolujte zapojeni!");
    while (1);
  }
}

void loop() {
  // načtení naměřeného tlaku ze senzoru
  float tlak = (bmp.readPressure()/100.00) + korekce;
  Serial.println(tlak);
  delay(2000);
}
