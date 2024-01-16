from machine import Pin, I2C, UART,Timer
import utime as time
from dht import DHT11, InvalidChecksum
import network
import ntptime
import requests
import gc

# On board led setup
led = machine.Pin("LED", machine.Pin.OUT)
timer = Timer()


# WiFi setup
ssid = "SSID"
password = "janajana"
api_url = "http://192.168.1.104:3000/api/weather"
api_password = "password"

# delay between posts in minutes (now set to 1)
delay = 60*1000*1

# port setup
dhtPin = Pin(27, Pin.OUT, Pin.PULL_DOWN)
adc = machine.ADC(26)
photo_pin = machine.ADC(2)
uart = UART(0,9600)

# functions for getting weather details

def getTemp():
    global dhtPin
    sensor = DHT11(dhtPin)
    try:
        return sensor.temperature
    except:
        return -1

def getHumidity():
    global dhtPin
    sensor = DHT11(dhtPin)
    try:
        return sensor.humidity
    except:
        return -1

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

def getTimestamp():
    return utime.localtime()

    
def ledBlink():
    led.on()
    time.sleep_ms(100)
    led.off()
    time.sleep_ms(100)
    led.on()
    time.sleep_ms(100)
    led.off()
    
    
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
ntptime.host = 'pool.ntp.org'  # You can use other NTP servers
ntptime.settime()

#garbage collector
gc.collect()

def SendData(timer):
    global api_password 
    # Define API endpoint and data
    post_data = {
      "temperature": getTemp(),
      "humidity": getHumidity(),
      "pressure": getPressure(),
      "sunlight": getLumens(),
      "isRaining":isRaining(),
      "rain":getRain(),
      "time": getTimestamp(),
      "password": api_password
    }
    
    #sending req to api
    req = requests.post(api_url,json=post_data)
 
    #printing response
    print(req.text)
    
    # indicate sended data
    ledBlink()
    
# loop for sending data
timer.init(period=delay, mode=Timer.PERIODIC, callback=SendData)
