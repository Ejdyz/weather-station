import { NextResponse } from 'next/server'
import {env} from 'process'
import crypto from "crypto";
import Status from "../../../../models/Status";
import { getLastDate, isYesterday} from "@/lib/weatherData";
import { Sequelize, Op } from 'sequelize';
import db from "@/database/database";
import RecordsModel from "../../../../models/Records";
import DaysModel from "../../../../models/Days";

const verifyPressure = (pressure) => {
  const pres = Math.trunc(pressure)
  const stringPres = pres.toString()
  if(pres > 100000 || pressure <= 0) { //remove first 3 numbers
    return calculatePressureFromDB();
  }
  if(stringPres.length >= 5 && pres > 80000){ //remove first 2 numbers
    return pressure.toString().slice(2)
  }

  if(stringPres.length >= 5 && pres > 10000){ //remove first number
    return pressure.toString().slice(1)
  }

  if(stringPres.length > 4 || pres > 1800){ //remove first number
    return pressure.toString().slice(1)
  }

  return pressure
}

export function calculatePressureFromDB(){
  RecordsModel.findAll({
    attributes: ['pressure'], // Select only the 'pressure' column
    order: [['time', 'DESC']], // Order by time in descending order to get the latest records first
    limit: 2, // Limit the result to 2 records
  })
    .then(records => {

      //`records` will contain an array of objects with 'pressure' property
      const pressureParts = records.map(record => {
        const pressure = record.pressure.toFixed(2); // Round to 2 decimal places and convert to string
        const [main, decimal] = pressure.split('.').map(Number); // Split into main and decimal parts
        return { main, decimal };
      }).reverse();

      //calculate the diff of the two records
      const diff = pressureParts[0].main - pressureParts[1].main;

      //calculate the diff of the two records
      const decimalDiff = pressureParts[0].decimal - pressureParts[1].decimal;

      //Return the calculated pressure from the last records
      console.log((pressureParts[1].main - diff) + ((pressureParts[1].decimal - decimalDiff)/100))
    })
}
export async function POST(request) {
  
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
  console.log("time from station:"  + correctedTimeDate);
  const lastRecordDate = await getLastDate();
  console.log(lastRecordDate);
  const yesterdayTime = await getLastDate();
  yesterdayTime.setHours(yesterdayTime.getHours() + 2);
  console.log("time in db:"  + yesterdayTime);
  const wasItYesterday = await isYesterday(correctedTimeDate, yesterdayTime);
  console.log("Was it yesterday: " + wasItYesterday);

  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
    let Time = new Date(time);

    if (isNaN(Time)) {
      console.log("Invalid date" + time);
      Time = new Date();
    }
    Time = new Date(Time.setHours(Time.getHours() - 2))
    // Usage
    updateStatusAndRecord({
      Time: Time, // Example data
      temperature: temperature,
      humidity: humidity,
      rain: rain,
      isRaining: isRaining,
      sunlight: sunlight,
      pressure: verifyPressure(pressure),
      shouldSave: shouldSave,
      wasItYesterday: wasItYesterday
    }).catch(console.error);

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


async function insertWeatherSummary(){

  // First, find the date of the second to last record
  const lastDate = await RecordsModel.findOne({
    attributes: [
      [Sequelize.fn('DATE', Sequelize.col('time')), 'date']
    ],
    order: [[ 'id', 'DESC' ]],
    offset: 1,
    limit: 1,
    raw: true,
  });

  if (!lastDate) {
    console.log('No records found.');
    return;
  }

  // Now, perform the aggregation on this date
  let aggregation = await RecordsModel.findOne({
    where: {
      [Op.and]: [
        Sequelize.where(Sequelize.fn('DATE', Sequelize.col('time')), '=', lastDate.date)
      ]
    },
    attributes: [
      [Sequelize.fn('MAX', Sequelize.col('temperature')), 'highestTemperature'],
      [Sequelize.fn('MIN', Sequelize.col('temperature')), 'lowestTemperature'],
      [Sequelize.fn('MAX', Sequelize.col('humidity')), 'highestHumidity'],
      [Sequelize.fn('MIN', Sequelize.col('humidity')), 'lowestHumidity'],
      [Sequelize.literal(`CASE WHEN SUM(CASE WHEN isRaining = TRUE THEN 1 ELSE 0 END) > 0 THEN TRUE ELSE FALSE END`), 'wasRaining'],
      [Sequelize.fn('MAX', Sequelize.col('rain')), 'highestRaining'],
      [Sequelize.fn('MAX', Sequelize.col('light')), 'highestLight'],
      [Sequelize.fn('MAX', Sequelize.col('pressure')), 'highestPressure'],
      [Sequelize.fn('MIN', Sequelize.col('pressure')), 'lowestPressure']
    ],
    raw: true,
  });

  // Set the 'day' property of the aggregation result object
  aggregation.day = lastDate.date;

  // Insert the aggregated data into weather-last-days
  await DaysModel.create(aggregation);
  console.log('Data inserted successfully.');
}


async function createRecord({ Time, temperature, humidity, rain, isRaining, sunlight, pressure }) {
  try {
    await RecordsModel.create({
      time: Time,
      temperature: temperature,
      humidity: humidity,
      rain: rain,
      isRaining: isRaining,
      light: sunlight,
      pressure: verifyPressure(pressure)
    });
    console.log("Record created successfully!");
  } catch (error) {
    console.error("Error creating record:", error);
    throw error; // Re-throw to handle it in the calling function
  }
}

async function updateStatusAndRecord({Time, temperature, humidity, rain, isRaining, sunlight, pressure, shouldSave, wasItYesterday}) {
  try {
    // Update status
    await Status.update({
      time: Time,
      temperature: temperature,
      humidity: humidity,
      rain: rain,
      isRaining: isRaining,
      light: sunlight,
      pressure: pressure
    }, {
      where: { id: 1 }
    });
    console.log("Status Record updated successfully!");

    // Conditionally create a record
    if (shouldSave) {
      await createRecord({ Time, temperature, humidity, rain, isRaining, sunlight, pressure });
      console.log("Was it successful? Yes");

      // Further conditional operation
      if (wasItYesterday) {
        await insertWeatherSummary();
      }
    }
  } catch (error) {
    console.error("Error updating status or creating record:", error);
  }
}
