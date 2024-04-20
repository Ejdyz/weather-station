import {env} from "process";
import {NextResponse} from "next/server";
import {getWeatherStationStatus} from "@/lib/weatherData";
import crypto from 'crypto';
//
// export async function POST(request) {
//   const db = require("@/database/database");
//   const Status = require("../../../../models/Status");
//
//   //appcepting req
//   const res = await request.json()
//
//   //converting req to vars
//   const {
//     temperature,
//     humidity,
//     pressure,
//     sunlight,
//     rain,
//     isRaining,
//     password,
//     time,
//     ...otherData
//   } = res;
//
//   const buf1 = Buffer.from(password);
//   const buf2 = Buffer.from(env.API_PASSWORD);
//
//   if (buf1.length !== buf2.length) {
//     return NextResponse.json({error:"wrong password"},{ status: 400 });
//   }
//   //checking password to api
//   if(!crypto.timingSafeEqual(buf1, buf2)){
//     return NextResponse.json({error:"wrong password"},{ status: 400 })
//   }
//
//   //check every value in req if it is correct
//   if (typeof temperature !== "number") {
//     return NextResponse.json({error:"wrong temperature value"}, { status: 400 })
//   }
//   if (typeof humidity !== "number") {
//     return NextResponse.json({error:"wrong humidity value"}, { status: 400 })
//   }
//   if (typeof pressure !== "number") {
//     return NextResponse.json({error:"wrong pressure value"}, { status: 400 })
//   }
//   if (typeof sunlight !== "number") {
//     return NextResponse.json({error:"wrong sunlight value"}, { status: 400 })
//   }
//   if (typeof rain !== "number") {
//     return NextResponse.json({error:"wrong rain value"}, { status: 400 })
//   }
//   if (typeof isRaining !== "boolean") {
//     return NextResponse.json({error:"wrong isRaining value"}, { status: 400 })
//   }
//   if (typeof time !== "string") {
//     return NextResponse.json({error:"wrong time value"}, { status: 400 })
//   }
//
//   try {
//     await db.authenticate();
//     console.log("Connection has been established successfully.");
//
//
//   } catch (error) {
//     console.error("Unable to connect to the database:", error.original);
//     return NextResponse.json({error:"server error"}, { status: 500 })
//   }
//
//   //sending response
//   return NextResponse.json({message:"data updated succesfully"}, { status: 200 })
// }

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