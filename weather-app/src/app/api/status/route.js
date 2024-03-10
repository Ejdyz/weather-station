import {env} from "process";
import {NextResponse} from "next/server";
import {getWeatherStationStatus} from "@/lib/weatherData";

export async function POST(request) {
  const db = require("@/database/database");
  const Status = require("../../../../models/Status");

  //appcepting req
  const res = await request.json()

  //converting req to vars
  const {
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

  //checking password to api
  if(password !== env.API_PASSWORD){
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
    await db.authenticate();
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
    return NextResponse.json(await getWeatherStationStatus(), { status: 200 })
  } catch (error) {
    console.error("Unable to connect to the database:", error.original);
    return NextResponse.json({error:"server error"}, { status: 500 })
  }
}