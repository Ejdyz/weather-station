import { NextResponse } from 'next/server'
import db from '../../database/database'; // Import the database connection

export async function POST(request) {
  //TODO | create function that calls the database and return last record
  console.log("TEST 1")
  //appcepting req
  const res = await request.json()
  //converting req to vars
  const { temperature, humidity, pressure,sunlight,rain,isRaining,password,time,reqNumber, ...otherData} = res;

  console.log(res)


}
export async function GET() {
  //TODO | create function that calls the database and return last record
  return NextResponse.json([
    { name: "day 0" , Humidity:1273,Temperature:2758,Pressure:1685},
  ])
}

// request
// {
//   "temperature": 25,
//   "humidity": 60,
//   "pressure": 60,
//   "windSpeed": 15,
//   "sunlight": 12,
//   "rain":"true",
//   "password":"dsadasd"
//   "time": "nejaky timestamp",
//   "reqNumber": 12
// }
