from machine import ADC, Pin, I2C, UART, Timer
import utime as time
import dht 
import network
import ntptime
import urequests as requests

import gc

# Light up onboard led
led = machine.Pin("LED", machine.Pin.OUT)

led.on()

# define timer
timer = Timer()

# WiFi setup
ssid = "SSID"
password = "WIFI-Password"
api_url = "https://weather.ejdy.cz/api/weather"
api_password = "api_password"

# delay between posts in miliseconds (now set to 1 min)
delay = 1000*2

reqNumber = 0;

# port setup
dhtPin = machine.Pin(2)
dht_sensor = dht.DHT22(dhtPin)

photo_pin = ADC(Pin(28))
rainSensor = machine.ADC(26)
uart = UART(0,9600)


# functions for getting weather details

def getTemperatureAndHumidity():
    global dht_sensor
    try:
        dht_sensor.measure()
    
        temperature_celsius = dht_sensor.temperature()
        humidity_percent = dht_sensor.humidity()
        return [temperature_celsius,humidity_percent]
    except:
        return [-1,-1]
    

def getRain():
    global rainSensor
    conversion_factor = 100 / (65535)
    rainCoverage = 100 - (rainSensor.read_u16() * conversion_factor)
    return round(rainCoverage, 1)

def isRaining():
    return getRain() > 0.0

def getLumens():
    global photo_pin
    return photo_pin.read_u16()

def getPressure():
    global uart
    sensorData = uart.readline()
    sensorDataStripped = str(sensorData)[2:-5]
    try:
        return float(sensorDataStripped)
    except ValueError:
        return -1
    
def getTimestamp():
    currTime = time.localtime()
    return str(currTime[0]) + "-" + str(currTime[1]) + "-" + str(currTime[2]) + " " + str(currTime[3]+1) + ":" + str(currTime[4]) + ":" + str(currTime[5])
     
def incrementReqNumber():
    global reqNumber
    
    if reqNumber >= 143:
      reqNumber = 0
    else:
      reqNumber += 1
      
def ledBlink():
    led.toggle()
    time.sleep_ms(100)
    led.toggle()
    time.sleep_ms(100)
    led.toggle()
    time.sleep_ms(100)
    led.toggle()

#connecting to wifi   
wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect(ssid, password)


while not wlan.isconnected():
     pass
if wlan.active():
     # Check if the Pico is connected to Wi-Fi
     if wlan.isconnected():
         print("Connected to Wi-Fi")
     else:
         print("Cant connect to Wi-Fi")

# Synchronize time
ntptime.host = 'pool.ntp.org'
ntptime.settime()

#garbage collector
gc.collect()


def SendData(timer):
    global api_password
    global reqNumber
        
    tempData = getTemperatureAndHumidity()
    
    # Define API endpoint and data
    post_data = {
      "temperature": tempData[0],
      "humidity": tempData[1],
      "pressure": getPressure(),
      "sunlight": getLumens(),
      "isRaining":isRaining(),
      "rain":getRain(),
      "time": getTimestamp(),
      "password": api_password,
      "reqNumber": reqNumber
    }
    
    #sending req to api
    req = requests.post(api_url,json=post_data)
    print("odeslan zaznam")
    print(post_data)
    # indicate sended data
    ledBlink()
    incrementReqNumber()
    #printing response
    print(req.text)

# Calculate time until midnight
def timeUntilMidnight():
    now = time.localtime()
    return time.mktime((now[0], now[1], now[2], 23,59,59,0,0)) - (time.time() + 3600)

# Function to start sending data at midnight
def startSendingDataAtMidnight():
    # Wait until midnight
    time.sleep(timeUntilMidnight())
    
    # Start periodic sending of data
    SendData(Timer())
    sendDataPeriodically()
    
# Function to start periodic data sending
def sendDataPeriodically():
    global timer
    global delay
    timer.init(period=delay, mode=Timer.PERIODIC, callback=SendData)

# Start sending data at midnight
startSendingDataAtMidnight()
