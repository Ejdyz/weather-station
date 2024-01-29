"use server"
import db from "@/database/database";
import {env} from "process"
import RecordsModel from "../../models/Records";
import {NextResponse} from "next/server";

/**
 * Retrieves the last weather record from the database.
 * @returns {Promise} A promise that resolves with the last record from the database.
 */
export const getLastRecord = async () => {
  const db = require("@/database/database");
  const RecordsModel = require("../../models/Records");
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
    return await new Promise((resolve, reject) => {
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
  } catch (error) {
    console.error("Unable to connect to the database:", error.original);
  }
}

/**
 * Retrieves the specified number of last records from the database.
 * @param {number} numOfRecords - The number of records to retrieve.
 * @returns {Promise} A promise that resolves with the specified number of last records from the database.
 */
export const getLastRecords = async (numOfRecords) => {
  const db = require("@/database/database");
  const RecordsModel = require("../../models/Records");
  if (numOfRecords === undefined || numOfRecords === null || numOfRecords === "" || numOfRecords <= 0){
    numOfRecords = 10
  }
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
    return await new Promise((resolve, reject) => {
      RecordsModel.findAll({
        limit: numOfRecords,
        raw: true,
        order: [["id", "DESC"]],
      })
        .then( (result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    })
  } catch (error) {
    console.error("Unable to connect to the database:", error.original);
  }
}
/**
 * Retrieves the data for the last specified number of days.
 * @param {boolean} forCharts - Whether the data is for charts.
 * @param {number} days - The number of days to retrieve data for.
 * @returns {Promise} A promise that resolves with the data for the last specified number of days.
 */
export const getLastDays = async (forCharts, days) => {
  days = parseInt(days)
  const db = require("@/database/database");
  const DaysModel = require("../../models/Days");
  if (days === undefined || days === null || typeof days !== "number" || days <= 0){
    days = 7
  }
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
    const lastDays = await new Promise((resolve, reject) => {
      DaysModel.findAll({
        limit: days,
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
    if (!forCharts){
      return lastDays
    }
    return lastDays.map((day) => {
      let date = new Date(day.day)
      return {
        day: date.getDate() + "/" + date.getMonth()+1,
        temperature: day.highestTemperature,
        humidity: day.highestHumidity,
        pressure: day.highestPressure,
        rain: day.highestRaining
      }
    })
  } catch (error) {
    console.error("Unable to connect to the database:", error.original);
    return null
  }
}
/**
 * Retrieves the sunrise and sunset times.
 * @returns {Promise} A promise that resolves with the sunrise and sunset times.
 */
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
/**
 * Retrieves the current moon phase.
 * @returns {Promise} A promise that resolves with the current moon phase.
 */
export const getMoonPhase = async () => {
  const currTime =  Math.floor(Date.now() / 1000)
  const data = await fetch("https://api.farmsense.net/v1/moonphases/?d="+currTime).then(response => response.json())
  return data[0].Phase;
}
/**
 * Retrieves the current zodiac sign.
 * @returns {Promise} A promise that resolves with the current zodiac sign.
 */
export async function getZodiacSign() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // JavaScript months are 0-indexed

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";

  return "Unknown Zodiac Sign";
}

