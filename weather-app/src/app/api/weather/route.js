import { NextResponse } from 'next/server'
import db from '@/database/database';
import {env} from 'process'
export async function POST(request) {
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

  //checking password to api
  if(password !== env.API_PASSWORD){
    return NextResponse.json({error:"wrong password"})
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

  //save req to database
  const table = env.DB_TABLE_RECORDS.toString()
  const sql = "INSERT INTO " + "`"+ table + "`"+ " ( `numberInDay`, `time`, `temperature`, `humidity`, `rain`, `isRaining`, `light`, `pressure`) VALUES (?,?,?,?,?,?,?,?);"
  const values = [ reqNumber, time,temperature,humidity,rain,isRaining,sunlight,pressure]

  //writing to database
  db.query(sql, values, (err) => {
    if (err) {
      console.error('Database insertion error:', err);
    } else {
      console.log("data saved succesfully")
    }
  });

  //checking if reqNumber is the latest number in day
  if (reqNumber === 143){
    //querry to mySql inserting data from last 143 records
    const RecordTable = env.DB_TABLE_RECORDS.toString()
    const DayTable = env.DB_TABLE_DAYS.toString()
    const sql = "INSERT INTO " + "`"+ DayTable + "`"+ " ( day, highestTemperatrue, lowestTemperatrue, highestHumidity, lowestHumidity, wasRaining, highestRaining, highestLight, averagePressure ) SELECT NOW(), MAX(temperature) AS highestTemperatrue, MIN(temperature) AS lowestTemperatrue, MAX(humidity) AS highestHumidity, MIN(humidity) AS lowestHumidity, CASE WHEN SUM(CASE WHEN isRaining = TRUE THEN 1 ELSE 0 END) > 0 THEN TRUE ELSE FALSE END AS wasRaining, MAX(rain) AS highestRaining, MAX(light) AS highestLight, AVG(pressure) AS averagePressure FROM " + "`"+ RecordTable + "`"+ " ORDER BY id DESC LIMIT 143 ;"
    let dbResults = []
    db.query(sql, (err) => {
      if (err) {
        console.error('Error executing the query:', err);
      }else{
        console.log("data saved succesfully to days database")
      }
    });
  }

  //sending response
  return NextResponse.json({message:"data saved succesfully"}, { status: 200 })
}

export async function GET() {
  const table = env.DB_TABLE_RECORDS.toString();
  const sql = "SELECT * FROM " + "`"+ table + "`"+ " ORDER BY id DESC LIMIT 1";

  let lastRecord = await new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing the query:', err);
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });

  return NextResponse.json(lastRecord, { status: 200 })
}