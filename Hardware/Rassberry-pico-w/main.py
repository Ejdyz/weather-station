from machine import ADC, Pin, I2C, UART, Timer
import utime as time
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
status_url = "https://weather.ejdy.cz/api/status"
api_password = "adG1E4Mg6rFArJG4EKRx2sO3vT34gGs2Na8kJPJrhLlFh5PBYi"

# delay between posts in miliseconds (now set to 5 min)
delay = 5 * 60 * 1000
reqNumber = 0

# port setup
dhtPin = machine.Pin(2)
dht_sensor = dht.DHT22(dhtPin)

photo_pin = ADC(Pin(28))
rainSensor = machine.ADC(26)
uart = UART(0, 9600)


# functions for getting weather details

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
        + str(currTime[3] + 1)
        + ":"
        + str(currTime[4])
        + ":"
        + str(currTime[5])
    )


def incrementReqNumber():
    global reqNumber

    if reqNumber >= 287:
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


# connecting to wifi
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
while True:
    try:
        ntptime.host = "pool.ntp.org"
        ntptime.settime()
        print("time set successfuly")
        break
    except :
        print("cant set time")
        
 
# garbage collector
gc.collect()


def parse_json(json_string):
    import json
    parsed_data = json.loads(json.dumps(json_string))
    req_number = parsed_data["reqNumber"]
    return req_number


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
        "reqNumber": reqNumber,
    }

    # sending req to api
    storedData.append(post_data)
    
    # Iterate over a copy of storedData
    for data in storedData[:]:  
        try:
            req = requests.post(api_url, json=data)
            print("odeslan zaznam", parse_json(data))
            print(req.text)
            storedData.remove(data)  # Remove item from the original list
            print(storedData)
        except Exception as e:
            print("cant send data")
            print(e)
            print(storedData)
            break

    # indicate sended data 
    ledBlink()
    incrementReqNumber()


# Calculate time until midnight
def timeUntilMidnight():
    now = time.localtime()
    return time.mktime((now[0], now[1], now[2], 23, 59, 59, 0, 0)) - (time.time() + 3600)


# Function to start sending data at midnight
def startSendingDataAtMidnight():
    # Wait until midnight
    secUntilMidnight = timeUntilMidnight()
    print("seconds until midnight", secUntilMidnight)
    
    # Start periodic sending of request to another API
    sendRequestToStatusAPIPeriodically()
    
    #start sending status data 
    time.sleep(secUntilMidnight)

    # Start periodic sending of data
    SendData(Timer())
    sendDataPeriodically()


# Function to start periodic data sending
def sendDataPeriodically():
    global delay
    # define timer
    timer = Timer()
    timer.init(period=delay, mode=Timer.PERIODIC, callback=SendData)



# Function to send request to another API every minute
def sendRequestToStatusAPIPeriodically():
    # Define your function to send request to another API
    def sendStatusRequest():
        print("Sending request to additional API")
        # Perform your request to the additional API here
        global storedData
        global api_password
        global status_url

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
        }

        try:
            req = requests.post(status_url, json=post_data)
            print("sended status log")
            print(req.text)
        except Exception as e:
            print("cant send data")
            print(e)


        # indicate sended data 
        ledBlink()
        

    # Start timer to send request every minute
    timer = Timer()
    timer.init(period=60000, mode=Timer.PERIODIC, callback=lambda t: sendStatusRequest())


# Start sending data at midnight
startSendingDataAtMidnight()
