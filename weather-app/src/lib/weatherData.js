"use server"
import {env} from "process"
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
          resolve(result.reverse());
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
      return lastDays.reverse()
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

  return await fetch("https://api.ipgeolocation.io/astronomy?apiKey=" + apiKey +"&location=%C3%9Ast%C3%AD%20nad%20Labem,%20CZ").then(response => response.json())
};
/**
 * Retrieves the current moon phase.
 * @returns {Promise} A promise that resolves with the current moon phase.
 */
export const getMoonPhase = async () => {
  const currTime =  Math.floor(Date.now() / 1000)
  const data = await fetch("https://api.farmsense.net/v1/moonphases/?d="+currTime,{
    cache:"no-cache"
  }).then(response => response.json())
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

/**
 * Retrieves string how much is currently raining.
 * @returns {Promise<"rain"| "drizzle" | "snow" | null>} A promise that resolves with the current weather.
 */
export async function getHowMuchIsCurrentlyRaining(data) {
  if (data.rain === -1 || data.rain < env.DRIZZLE_AND_DRY_BORDER) return null
  if (data.temperature < 0 && data.rain > 0) return "snow"
  if (data.rain > env.RAIN_AND_DRIZZLE_BORDER) return "rain"
  if (data.rain < env.RAIN_AND_DRIZZLE_BORDER && data.rain > env.DRIZZLE_AND_DRY_BORDER  ) return "drizzle"
  return null
}

/**
 * Retrieves what cloud cover is currently.
 * @returns {Promise<"cloudy"| "partly cloudy" | "clear" | null>} A promise that resolves with the current weather.
 */
export async function getHowCloudyCurrentlyIs(data) {
  if (data.light === -1) return null
  //if the light is greater than the bottom border of cloudiness it is cloudy
  if (data.light >= env.CLOUDY_BORDER) return "cloudy"
  if (data.light <= env.TOP_CLOUDY_BORDER || data.humidity > 70) return "partly cloudy"
  //if the light is lower than the bottom border of cloudiness and greater than the bottom border of partly cloudiness it is partly cloudy
  if (data.light < env.CLOUDY_BORDER && data.light >= env.PARTLY_CLOUDY_BORDER) return "partly cloudy"
  //if the light is lower than the bottom border of partly cloudiness it is clear weather
  if (data.light < env.PARTLY_CLOUDY_BORDER) return "clear"
  return null
}
/**
 * Checks if the current time is night.
 * Night is defined as hours less than 6 or greater than 19.
 * @returns {boolean} Returns true if it's nighttime, false otherwise.
 */
export async function isNight(sunset, sunrise){
  const currentTime = new Date()

  let sunsetTime = new Date();
  sunsetTime.setHours(parseInt(sunset.split(':')[0], 10));
  sunsetTime.setMinutes(parseInt(sunset.split(':')[1], 10));

  let sunriseTime = new Date();
  sunriseTime.setHours(parseInt(sunrise.split(':')[0], 10));
  sunriseTime.setMinutes(parseInt(sunrise.split(':')[1], 10));

  return currentTime > sunsetTime || currentTime < sunriseTime
}

export async function  getWeatherStationStatus(){
  const db = require("@/database/database");
  const StatusModel = require("../../models/Status");
  let data = null
  let isActive = false
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");

    data = await StatusModel.findOne({
      where: {
        id: 1
      },
      raw: true,
    })
    .catch((error) => {
      console.log(error)
    });
    isActive = (new Date() - new Date(data.updatedAt)) / (1000*60) < 2

  } catch (error) {
    console.error("Unable to connect to the database:", error.original);
  }

  return {
    isActive:isActive,
    data:data};

}