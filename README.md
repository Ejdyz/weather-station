# Meteorological Station Project
## Overview
- This project is dedicated to building a comprehensive meteorological station using a Raspberry Pi Pico W and Arduino nano. 
- It aims to measure various environmental parameters and display the data on a web interface. 
- This repository contains both the hardware schematics and software code necessary for the project.

## Hardware Components
- **Raspberry Pi Pico W**: The core computing unit.
- **Arduino Nano**: For interfacing with the pressure sensors.
- **Sensors**:
    - Rain Sensor: For detecting rainfall (**LM393**).
    - Light Sensor: To estimate cloudiness (**GL5528**).
    - Pressure Sensor: For atmospheric pressure measurement (**BMP280**).
    - Temperature Sensor: To measure ambient temperature and humidity (**DHT22**).
  
## Software Components
- **Data Collection Script**: Running on Raspberry Pi Pico W, it collects data from the sensors and sends it to the server.
- **Server**: A backend system to receive and process sensor data.
- **Web Interface**: Displays real-time and historical data on cloudiness, temperature, pressure, and more.

## Usage
This device i will use at my home. It will be placed on my garden. The data will be sent to a server and displayed on a web interface.

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)\
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)\
![Arduino](https://img.shields.io/badge/-Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white)\
![Raspberry Pi](https://img.shields.io/badge/-RaspberryPi-C51A4A?style=for-the-badge&logo=Raspberry-Pi)\
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)\
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)\
![WebStorm](https://img.shields.io/badge/webstorm-143?style=for-the-badge&logo=webstorm&logoColor=white&color=black)