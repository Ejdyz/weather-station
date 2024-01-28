"use server"
import db from "@/database/database";
import {env} from "process"
export const getLastRecord = async () => {
  const table = env.DB_TABLE_RECORDS.toString();
  const sql = "SELECT * FROM " + "`"+ table + "`"+ " ORDER BY id DESC LIMIT 1";

  const lastRecord = await new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing the query:', err);
        reject(err);
      } else {
        resolve(results[0]);
      }
      db.releaseConnection();
    });
  });
  return lastRecord;
}
export const getLastTenRecords = async () => {
  const table = env.DB_TABLE_RECORDS.toString();
  const sql = "SELECT * FROM " + "`"+ table + "`"+ " ORDER BY id DESC LIMIT 10";

  const lastRecords = await new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing the query:', err);
        reject(err);
      } else {
        resolve(results);
      }
      db.releaseConnection();
    });
  });
  return lastRecords;
}

export const getLastTenDays = async ({forCharts,days}) => {
  const table = env.DB_TABLE_DAYS.toString();
  const sql = "SELECT * FROM " + "`"+ table + "`"+ " ORDER BY id DESC LIMIT " + days + ";";

  const lastDays = await new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing the query:', err);
        reject(err);
      } else {
        resolve(results);
      }
      db.releaseConnection();
    });
  });
  if (!forCharts){
    return lastDays
  }
  const data = lastDays.map((day) => {
    let date = new Date(day.day)
    return {
      day: date.getDate() + "/" + date.getMonth()+1,
      temperature: day.highestTemperature,
      humidity: day.highestHumidity,
      pressure: day.highestPressure,
      rain: day.highestRaining
    }
  })

  return data
}

export const getSunriseAndSunset = async () => {
  const apiKey = env.GEOLOCATION_API_KEY.toString();
  return {
    location: {
      location: 'Ústí nad Labem, CZ',
      country: 'Czechia',
      state: 'Northwest',
      city: 'Ústí nad Labem',
      locality: '',
      latitude: 50.6603327,
      longitude: 14.0381357
    },
    date: '2024-01-28',
    current_time: '20:05:30.098',
    sunrise: '07:45',
    sunset: '16:48',
    sun_status: '-',
    solar_noon: '12:16',
    day_length: '09:03',
    sun_altitude: -31.089456916038326,
    sun_distance: 147290229.58239198,
    sun_azimuth: 279.2736870351876,
    moonrise: '19:41',
    moonset: '09:14',
    moon_status: '-',
    moon_altitude: 3.7920620273060655,
    moon_distance: 405553.86315247096,
    moon_azimuth: 78.77612276609557,
    moon_parallactic_angle: -39.13493070212058
  }

  //return await fetch("https://api.ipgeolocation.io/astronomy?apiKey=" + apiKey +"&location=%C3%9Ast%C3%AD%20nad%20Labem,%20CZ").then(response => response.json())
};

