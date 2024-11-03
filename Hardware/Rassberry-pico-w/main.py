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
led.on()

# WiFi setup
ssid = "Petr"
password = "janajana"
api_url = "https://weather.ejdy.cz/api/weather"
api_password = "adG1E4Mg6rFArJG4EKRx2sO3vT34gGs2Na8kJPJrhLlFh5PBYi"

# delay between posts in milliseconds (now set to 1 min)
delay = 1000 * 60
reqNumber = 0
utcDiff = 1

# port setup
dhtPin = machine.Pin(2)
dht_sensor = dht.DHT22(dhtPin)
photo_pin = ADC(Pin(28))
rainSensor = machine.ADC(26)
uart = UART(0, 9600)

data_file = 'unsent_data.json'

def log(text):
    message = str(text)
    print(getTimestamp() + " : free mem:" + str(gc.mem_free()) + " ; aloc mem:" + str(gc.mem_alloc()) + " : " + message)

# WiFi connection
def connect_wifi():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(ssid, password)
    for _ in range(10):
        if wlan.isconnected():
            log("Connected to Wi-Fi")
            return True
        time.sleep(1)
    log("Failed to connect to Wi-Fi")
    return False

def settime(t):
    global utcDiff
    import machine
    tm = time.gmtime(t)
    machine.RTC().datetime((tm[0], tm[1], tm[2], tm[6] + 1, tm[3] + utcDiff, tm[4], tm[5], 0))

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
        f"{currTime[0]:04d}-{currTime[1]:02d}-{currTime[2]:02d}T"+
        f"{currTime[3]:02d}:{currTime[4]:02d}:{currTime[5]:02d}"
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

def save_data_to_file(data):
    with open(data_file, 'a') as f:
        f.write(json.dumps(data) + "\n")

def load_data_from_file():
    try:
        with open(data_file, 'r') as f:
            return [json.loads(line) for line in f]
    except OSError:
        return []

def clear_data_file():
    open(data_file, 'w').close()

def send_data():
    storedData = load_data_from_file()
    for data in storedData[:]:
        try:
            req = requests.post(api_url, json=data)
            log("Request sent")
            log(req.text)
            storedData.remove(data)
        except Exception as e:
            log("Cannot send data")
            log(e)
            break
    if storedData:
        with open(data_file, 'w') as f:
            for data in storedData:
                f.write(json.dumps(data) + "\n")
    else:
        clear_data_file()

def initial_send():
    if connect_wifi():
        send_data()

def SendData(timer):
    tempData = getTemperatureAndHumidity()
    currTime = time.localtime()
    minutes = currTime[4]
    should_save = (minutes % 5 == 0)
    
    post_data = {
        "temperature": tempData[0],
        "humidity": tempData[1],
        "pressure": getPressure(),
        "sunlight": getLumens(),
        "isRaining": isRaining(),
        "rain": getRain(),
        "time": getTimestamp(),
        "password": api_password,
        "shouldSave": should_save,
    }

    save_data_to_file(post_data)
    if connect_wifi():
        send_data()
    ledBlink()

def sendDataPeriodically():
    global delay
    timer = Timer()
    SendData(timer)
    timer.init(period=delay, mode=Timer.PERIODIC, callback=SendData)

# Initial setup
if connect_wifi():
    while True:
        try:
            ntptime.host = "pool.ntp.org"
            settime(ntptime.time())
            log("Time set successfully")
            break
        except Exception as e:
            log("Can't set time")
            log(e)
        time.sleep(1)

gc.collect()
initial_send()  # Check and send any unsent data
sendDataPeriodically()
