import { NextResponse } from 'next/server'
import {env} from 'process'
import crypto from "crypto";
import Status from "../../../../models/Status";
import { getLastDate, isYesterday} from "@/lib/weatherData";

const verifyPressure = (pressure) => {
  const pres = Math.trunc(pressure)
  const stringPres = pres.toString()

  if(stringPres.length >= 5 && pres > 80000){ //remove first 2 numbers
    return pressure.toString().slice(2)
  }
  if(stringPres.length >= 5 && pres > 10000){ //remove first number
    return pressure.toString().slice(1)
  }
  if(stringPres.length > 4 || pres > 2000){ //remove first number
    return pressure.toString().slice(1)
  }
  return pressure
}
export async function POST(request) {
  const db = require("@/database/database");
  const RecordsModel = require("../../../../models/Records");

  //appcepting req
  const res = await request.json()
  console.log(res)
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
    shouldSave,
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
  if (typeof shouldSave !== "boolean") {
    return NextResponse.json({error:"wrong shouldSave value"}, { status: 400 })
  }

  const timeDate = new Date(time);
  const correctedTimeDate = new Date(new Date(time).setHours(timeDate.getHours() - (timeDate.getTimezoneOffset()/60)));
  console.log("time from station:" + time)
  console.log(correctedTimeDate);
  const lastRecordDate = await getLastDate();
  console.log(lastRecordDate);
  const wasItYesterday = await isYesterday(correctedTimeDate, await getLastDate());
  console.log("Was it yesterday: " + wasItYesterday);


  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
    let Time = new Date(time);
    if (isNaN(Time)) {
      console.log("Invalid date" + time);
      Time = new Date();
    }

    //Updating a status
    Status.update({
      time: Time,
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
        console.log("Status Record updated successfully!");
        if(shouldSave){
          let success = true;
          //writing to database
          RecordsModel.create({
            time: time,
            temperature: temperature,
            humidity: humidity,
            rain: rain,
            isRaining: isRaining,
            light: sunlight,
            pressure: verifyPressure(pressure),
          })
            .then(() => {
              console.log("Record created successfully!");
              if (wasItYesterday) {
                const sql = "INSERT INTO `weather-last-days` ( day, highestTemperature, lowestTemperature, highestHumidity, lowestHumidity, wasRaining, highestRaining, highestLight, highestPressure,lowestPressure) SELECT NOW(), MAX(temperature) AS highestTemperature, MIN(temperature) AS lowestTemperature, MAX(humidity) AS highestHumidity, MIN(humidity) AS lowestHumidity, CASE WHEN SUM( CASE WHEN isRaining = TRUE THEN 1 ELSE 0 END ) > 0 THEN TRUE ELSE FALSE END AS wasRaining, MAX(rain) AS highestRaining, MIN(light) AS highestLight, MAX(pressure) AS highestPressure, MIN(pressure) AS lowestPressure FROM ( SELECT * FROM `weather-records` WHERE DATE(createdAt) =( SELECT DATE(createdAt) FROM `weather-records` ORDER BY createdAt DESC LIMIT 1 OFFSET 1 ) ) AS subquery;"
                db.query(sql).then((result)=>{
                  console.log("Executing query was succesfull: "  + result)
                })
                  .catch((err) => {
                    console.error('Error executing the query:', err);
                  })
              }
            })
            .catch((error) => {
              console.log(error);
              success = false;
            });
            console.log("Was it successfull? " + success);
        }
      })
      .catch((error) => {
        console.log(error);
      });

  } catch (error) {
    console.error("Unable to connect to the database:", error);
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