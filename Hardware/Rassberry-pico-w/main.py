from machine import Pin, I2C, UART
import utime as time
from dht import DHT11, InvalidChecksum


dhtPin = 28
adc = machine.ADC(26)
photo_pin = machine.ADC(27)
uart = UART(0,9600)

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
    
    