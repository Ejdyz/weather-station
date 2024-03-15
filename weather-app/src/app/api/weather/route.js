import { NextResponse } from 'next/server'
import {env} from 'process'
import crypto from "crypto";
export async function POST(request) {
  const db = require("@/database/database");
  const RecordsModel = require("../../../../models/Records");

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
    reqNumber, ...otherData
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
  if (typeof reqNumber !== "number") {
    return NextResponse.json({error:"wrong reqNumber value"}, { status: 400 })
  }

  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
    let success = true;
    //writing to database
    RecordsModel.create({
      numberInDay: reqNumber,
      time: time,
      temperature: temperature,
      humidity: humidity,
      rain: rain,
      isRaining: isRaining,
      light: sunlight,
      pressure: pressure >10000? pressure-10000 : pressure,
    })
      .then(() => {
        console.log("Record created successfully!");
      })
      .catch((error) => {
        console.log(error);
        success = false;
      });

    //checking if reqNumber is the latest number in day
    if (reqNumber === 287 && success) {
      const RecordTable = env.DB_TABLE_RECORDS.toString()
      const DayTable = env.DB_TABLE_DAYS.toString()
      const sql = "INSERT INTO " + "`"+ DayTable + "`"+ " ( day, highestTemperature, lowestTemperature, highestHumidity, lowestHumidity, wasRaining, highestRaining, highestLight, lowestPressure, highestPressure ) SELECT NOW(), MAX(temperature) AS highestTemperature, MIN(temperature) AS lowestTemperature, MAX(humidity) AS highestHumidity, MIN(humidity) AS lowestHumidity, CASE WHEN SUM(CASE WHEN isRaining = TRUE THEN 1 ELSE 0 END) > 0 THEN TRUE ELSE FALSE END AS wasRaining, MAX(rain) AS highestRaining, MIN(light) AS highestLight, MAX(pressure) AS highestPressure, MIN(pressure) AS lowestPressure FROM " + "`"+ RecordTable + "`"+ " ORDER BY id DESC LIMIT 288 ;"
      db.query(sql).then((result)=>{
        console.log("Executing query was succesfull: "  + result)
      })
        .catch((err) => {
          console.error('Error executing the query:', err);
        })
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error.original);
    return NextResponse.json({error:"server error"}, { status: 500 })
  }

  //sending response
  return NextResponse.json({message:"data saved succesfully"}, { status: 200 })
}

export async function GET() {
  const db = require("@/database/database");
  const RecordsModel = require("../../../../models/Records");

  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");

    const lastRecord =await new Promise((resolve, reject) => {
      RecordsModel.findOne({
        order: [["id", "DESC"]],
        raw: true,
      })
        .then( (result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    })

    return NextResponse.json(lastRecord, { status: 200 })

  } catch (error) {
    console.error("Unable to connect to the database:", error.original);
    return NextResponse.json({error:"server error"}, { status: 500 })
  }
}