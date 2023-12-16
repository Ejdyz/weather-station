from machine import Pin, I2C, UART,Timer
import utime as time
from dht import DHT11, InvalidChecksum
import network
import requests
import gc

# WiFi setup
ssid = "Petr"
password = "janajana"
api_url = "http://192.168.1.104:3000/api/weather"
api_password = "password"

# delay between posts in hours (now set to 1)
delay = 60*60*1

# port setup
dhtPin = 28
adc = machine.ADC(26)
photo_pin = machine.ADC(27)
uart = UART(0,9600)

# functions for getting weather details

def getTemp():
    global dhtPin
    pin = Pin(dhtPin, Pin.OUT, Pin.PULL_DOWN)
    sensor = DHT11(pin)
    return sensor.temperature

def getHumidity():
    global dhtPin
    pin = Pin(dhtPin, Pin.OUT, Pin.PULL_DOWN)
    sensor = DHT11(pin)
    return sensor.humidity

def getRain():
    global adc
    conversion_factor = 100 / (65535)
    rainCoverage = 100 - (adc.read_u16() * conversion_factor)
    return round(rainCoverage, 1)

def isRaining():
    return getRain() > 0.0

def getLumens():
    global photo_pin
    return photo_pin.read_u16()

def getPressure():
    global uart
    sensorData=uart.readline()
    return sensorData
    
    
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
        
#garbage collector
gc.collect()

# Define API endpoint and data
post_data = {
  "temperature": getTemp(),
  "humidity": getHumidity(),
  "pressure": getPressure(),
  "sunlight": getLumens,
  "isRaining":isRaining(),
  "rain":getRain(),    
  "password": api_password
}
while True:
    #sending req to api
    x = requests.post(api_url,json=post_data)

    #printing response
    print(x.text)
    
    # delay between posts
    time.sleep(delay)
#disconnecting from wlan
wlan.disconnect()    
