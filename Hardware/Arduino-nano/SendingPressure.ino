#include <BMP280.h>
BMP280 bmp280;

void setup()
{
  //delay in miliseconds
  int userDelay = 20;
  
  // set up serial port
  Serial.begin(9600);
  delay(10);

  //Join I2C bus
  Wire.begin(); 
  bmp280.begin();
}

void loop()
{
  //Get pressure value
  uint32_t pressure = bmp280.getPressure();

  //Print the results
  Serial.println(pressure);
  
  delay(userDelay);
}
