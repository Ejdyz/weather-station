from machine import ADC, Pin, I2C, UART, Timer
import utime as time
from datetime import datetime
import dht
import network
import ntptime
import urequests as requests
import gc
import json

# Light up onboard led
led = machine.Pin("LED", machine.Pin.OUT)

storedData = []

led.on()


# WiFi setup
ssid = "Petr"
password = "janajana"
api_url = "https://weather.ejdy.cz/api/weather"
api_password = "adG1E4Mg6rFArJG4EKRx2sO3vT34gGs2Na8kJPJrhLlFh5PBYi"

# delay between posts in miliseconds (now set to 5 min)
delay = 1000 * 60
reqNumber = 0
utcDiff = 1

# port setup
dhtPin = machine.Pin(2)
dht_sensor = dht.DHT22(dhtPin)

photo_pin = ADC(Pin(28))
rainSensor = machine.ADC(26)
uart = UART(0, 9600)


def log(text):
    message = str(text)
    print(getTimestamp() + " : free mem:" + str(gc.mem_free()) + " ; aloc mem:" + str(gc.mem_alloc()) + " : " + message )
    

# functions for getting weather details
def settime(t):
    global utcDiff
    import machine
    tm = time.gmtime(t)
    machine.RTC().datetime((tm[0], tm[1], tm[2], tm[6] + 1  ,tm[3] + utcDiff, tm[4], tm[5], 0))

def getTemperatureAndHumidity():
    global dht_sensor
    try:
        dht_sensor.measure()

        temperature_celsius = dht_sensor.temperature()
        humidity_percent = dht_sensor.humidity()
        return [temperature_celsius, humidity_percent]
    except:
        return [-1, -1]


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
    return (
        str(currTime[0])
        + "-"
        + str(currTime[1])
        + "-"
        + str(currTime[2])
        + " "
        + str(0 if currTime[3] + 1 >= 24 else currTime[3] + 1)
        + ":"
        + str(currTime[4])
        + ":"
        + str(currTime[5])
    )


def incrementReqNumber():
    global reqNumber
    reqNumber = (reqNumber + 1) % 5


def ledBlink():
    led.toggle()
    time.sleep_ms(100)
    led.toggle()
    time.sleep_ms(100)
    led.toggle()
    time.sleep_ms(100)
    led.toggle()


# connecting to wifi
wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect(ssid, password)


while not wlan.isconnected():
    pass
if wlan.active():
    # Check if the Pico is connected to Wi-Fi
    if wlan.isconnected():
        log("Connected to Wi-Fi")
    else:
        log("Cant connect to Wi-Fi")


# Synchronize time
while True:
    try:
        ntptime.host = "pool.ntp.org"
        settime(ntptime.time())
        log("Time set successfuly")
        break
    except Exception as e:
        log("cant set time")
        log(e)
    time.sleep(1)        
 
# garbage collector
gc.collect()




def SendData(timer):
    global storedData
    global api_password
    global reqNumber

    tempData = getTemperatureAndHumidity()

    # Define API endpoint and data
    post_data = {
        "temperature": tempData[0],
        "humidity": tempData[1],
        "pressure": getPressure(),
        "sunlight": getLumens(),
        "isRaining": isRaining(),
        "rain": getRain(),
        "time": getTimestamp(),
        "password": api_password,
        "shouldSave": reqNumber == 4,
    }

    # sending req to api
    storedData.append(post_data)
    

    try:
        wlan.connect(ssid, password)
    except Exception as e:
        printp("cant connect to wlan")
        printp(e)


    # Iterate over a copy of storedData
    for data in storedData[:]:  
        try:
            req = requests.post(api_url, json=data)
            log("Request sended")
            log(req.text)
            storedData.remove(data)  # Remove item from the original list
            log(storedData)
        except Exception as e:
            log("cant send data")
            log(e)
            log(storedData)
            break

    # indicate sended data 
    ledBlink()
    incrementReqNumber();

# Function to start periodic data sending
def sendDataPeriodically():
    global delay
    
    # define timer
    timer = Timer()
    #send initial data
    SendData(timer)
    #start sending data periodically
    timer.init(period=delay, mode=Timer.PERIODIC, callback=SendData)

sendDataPeriodically()
