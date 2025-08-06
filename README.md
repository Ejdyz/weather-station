<p align="center">
  <a href="https://github.com/dolezalll/3itcTeamGame">
    <img src="https://github.com/Ejdyz/weather-station/assets/103042103/fb7fff09-5f3c-4d35-aaa4-a3c8753112f8" alt="Logo" width="200" height="120">
  </a>
</p>

# Meteorological Station V2
## Improvements over V1
 - Added 2 new sensors for checking wind speed and direction
 - Swapped rain detection sensor which returned only true or false for rain drop sensor which can detect how much mm of rain dropped per m2
 - Using ESP32 instead of Raspberry PI Pico W and Arduino Nano
 - New a design of the website
## Overview
- This project is dedicated to building a meteorological station using a ESP32. 
- It aims to measure various environmental parameters and display the data on a web interface. 
- This repository contains both the hardware schematics and software code necessary for the project.

## Possible additional functions
- Connection to network and power delivery via PoE
- Adding web server for rendering useful information and remote resetting  

## Hardware Components
- **ESP32** - The core computing unit of the weather station.
- **Sensors**:
    - Rain Sensor - For detecting raindrops (**MS-WH-SP-RG**).
    - Wind Speed Sensor - For detecting wind speed (**WH-SP-WS01**) 
    - Wind Direction Sensor - For detecting wind direction (**WH-SP-WD**)
    - Pressure Sensor - For atmospheric pressure measurement (**BMP280**).
    - Temperature Sensor - To measure ambient temperature and humidity (**DHT22**).
    - Light Sensor - To estimate cloudiness (**GL5528**).
  
## Software Components
- **Data Collection Script**: Running on ESP32, it collects data from the sensors and sends it to the server.
- **Server**: A backend system to receive and process sensor data.
- **Web Interface**: Displays real-time and historical data on cloudiness, temperature, pressure, and more.

## Usage
- I will use this device at my home. It will be placed on my garden. The data will be sent to a server and displayed on a web interface.

<p align="center">
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Nextui-black?style=for-the-badge&logo=nextui&logoColor=white" alt="Next UI" />
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next JS" />
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white" alt="Threejs" />
    <br>
  <img src="https://img.shields.io/badge/-Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white" alt="Arduino" />
  <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  <img src="https://img.shields.io/badge/blender-%23F5792A.svg?style=for-the-badge&logo=blender&logoColor=white" alt="Blender" />
  <img src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white" alt="VS Code" />
</p>
