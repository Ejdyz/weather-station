import {env} from "process";
import {NextResponse} from "next/server";
import {getWeatherStationStatus} from "@/lib/weatherData";
import crypto from 'crypto';

export async function POST(request) {
  const db = require("@/database/database");
  const Status = require("../../../../models/Status");

  //appcepting req
  const res = await request.json()

  //converting req to vars
  let {
    temperature,
    humidity,
    pressure,
    sunlight,
    rain,
    isRaining,
    password,
    time,
    ...otherData
  } = res;

  const buf1 = Buffer.from(password);
  const buf2 = Buffer.from(env.API_PASSWORD);

  if (buf1.length !== buf2.length) {
    return NextResponse.json({error:"wrong password"},{ status: 400 });
  }
  //checking password to api
  if(!crypto.timingSafeEqual(buf1, buf2)){
    return NextResponse.json({error:"wrong password"},{ status: 400 })
  }

  //check every value in req if it is correct
  if (typeof temperature !== "number") {
    return NextResponse.json({error:"wrong temperature value"}, { status: 400 })
  }
  if (typeof humidity !== "number") {
    return NextResponse.json({error:"wrong humidity value"}, { status: 400 })
  }
  if (typeof pressure !== "number") {
    return NextResponse.json({error:"wrong pressure value"}, { status: 400 })
  }
  if (typeof sunlight !== "number") {
    return NextResponse.json({error:"wrong sunlight value"}, { status: 400 })
  }
  if (typeof rain !== "number") {
    return NextResponse.json({error:"wrong rain value"}, { status: 400 })
  }
  if (typeof isRaining !== "boolean") {
    return NextResponse.json({error:"wrong isRaining value"}, { status: 400 })
  }
  if (typeof time !== "string") {
    return NextResponse.json({error:"wrong time value"}, { status: 400 })
  }

  try {

    if(!isValidDateTime(time)){
      time = new Date()
    }else{
      time = new Date(time);
    }
    time = time.setHours(time.getHours() + 1)
    console.log("Connection has been established successfully.");

    Status.update({
      time: time,
      temperature: temperature,
      humidity: humidity,
      rain: rain,
      isRaining: isRaining,
      light: sunlight,
      pressure: pressure,
    },{
      where: {
        id: 1
      }
    })
    .then(() => {
      console.log("Record updated successfully!");
    })
    .catch((error) => {
      console.log(error);
    });


  } catch (error) {
    console.error("Unable to connect to the database:", error.original);
    return NextResponse.json({error:"server error"}, { status: 500 })
  }

  //sending response
  return NextResponse.json({message:"data updated succesfully"}, { status: 200 })
}

export async function GET() {
  try {
    const status = await getWeatherStationStatus();
    if(status.isActive){
      return NextResponse.json({success:"active"}, { status: 200 })
    }else{
      return NextResponse.json({error:"not active"}, { status: 500 })
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error.original);
    return NextResponse.json({error:"server error"}, { status: 500 })
  }
}


function isValidDateTime(dateTimeStr) {
  // Regular expression to match date and time in YYYY-MM-DD HH:MM:SS format
  var dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

  if (!dateTimeRegex.test(dateTimeStr)) {
    // If the date-time string doesn't match the format, it's invalid
    return false;
  }

  // Split the date-time string into date and time components
  var dateTimeComponents = dateTimeStr.split(' ');
  var datePart = dateTimeComponents[0];
  var timePart = dateTimeComponents[1];

  // Check date validity
  var dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(datePart)) {
    return false;
  }

  // Check time validity
  var timeRegex = /^\d{2}:\d{2}:\d{2}$/;
  if (!timeRegex.test(timePart)) {
    return false;
  }

  // Split the time part into hours, minutes, and seconds
  var timeComponents = timePart.split(':');
  var hours = parseInt(timeComponents[0], 10);
  var minutes = parseInt(timeComponents[1], 10);
  var seconds = parseInt(timeComponents[2], 10);

  // Check if hours, minutes, and seconds fall within valid ranges
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
    return false;
  }

  // If all checks pass, the date-time is considered valid
  return true;
}