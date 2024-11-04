"use server"
import {env} from "process"
import { 
  CLOUDY_BORDER, 
  PARTLY_CLOUDY_BORDER, 
  RAIN_AND_DRIZZLE_BORDER, 
  DRIZZLE_AND_DRY_BORDER
} from "@/lib/config";

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
        order: [["time", "DESC"]],
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
        order: [["time", "DESC"]],
      })
        .then( (results) => {
          resolve(results.reverse());
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
        order: [["day", "DESC"]],
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
  try {
    return await fetch("https://api.ipgeolocation.io/astronomy?apiKey=" + apiKey +"&location=%C3%9Ast%C3%AD%20nad%20Labem,%20CZ").then(response => response.json())
  }catch (error) {
    return {
      "location": {
        "location": "Ústí nad Labem, CZ",
        "country": "Czechia",
        "state": "Northwest",
        "city": "Ústí nad Labem",
        "locality": "",
        "latitude": 50.6603327,
        "longitude": 14.0381357
      },
      "date": "2024-04-16",
      "current_time": "22:05:54.284",
      "sunrise": "06:07",
      "sunset": "20:01",
      "sun_status": "-",
      "solar_noon": "13:03",
      "day_length": "13:54",
      "sun_altitude": -17.705051561519447,
      "sun_distance": 150055146.19730252,
      "sun_azimuth": 313.77581186563384,
      "moonrise": "11:40",
      "moonset": "03:56",
      "moon_status": "-",
      "moon_altitude": 54.491004898370804,
      "moon_distance": 400291.59697319684,
      "moon_azimuth": 228.5404454957521,
      "moon_parallactic_angle": 30.990438534999527
    }
  }
};
/**
 * Retrieves the current moon phase.
 * @returns {Promise} A promise that resolves with the current moon phase.
 */
export const getMoonPhase = async () => {
  const currTime =  Math.floor(Date.now() / 1000)
  try {
    const data = await fetch("http://api.farmsense.net/v1/moonphases/?d="+currTime,{
      cache:"no-cache"
    }).then(response => response.json())
    return data[0].Phase;
  }catch (error) {
    return {
      "Error": 0,
      "ErrorMsg": "success",
      "TargetDate": "1713298081",
      "Moon": [
        "Grass Moon"
      ],
      "Index": 8,
      "Age": 8.3290903521252861452239812933839857578277587890625,
      "Phase": "Waxing Gibbous",
      "Distance": 399329.03000000002793967723846435546875,
      "Illumination": 0.59999999999999997779553950749686919152736663818359375,
      "AngularDiameter": 0.498731975139300620636362282311893068253993988037109375,
      "DistanceToSun": 150194937.5093982517719268798828125,
      "SunAngularDiameter": 0.5310109011031709513872556271962821483612060546875
    }
  }
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
  if (data?.rain === -1 || data?.rain < DRIZZLE_AND_DRY_BORDER) return null
  if (data?.temperature < 0 && data?.rain > 0) return "snow"
  if (data?.rain > RAIN_AND_DRIZZLE_BORDER) return "rain"
  if (data?.rain < RAIN_AND_DRIZZLE_BORDER && data?.rain > DRIZZLE_AND_DRY_BORDER  ) return "drizzle"
  return null
}

/**
 * Retrieves what cloud cover is currently.
 * @returns {Promise<"cloudy"| "partly cloudy" | "clear" | null>} A promise that resolves with the current weather.
 */
export async function getHowCloudyCurrentlyIs(data) {
  if (data?.light === -1) return null

  if(data?.light >= CLOUDY_BORDER){
    return "cloudy"
  }
  if(data?.light < CLOUDY_BORDER && data?.light > PARTLY_CLOUDY_BORDER){
    return "clear"
  }
  if(data?.light < PARTLY_CLOUDY_BORDER){
    return "partly cloudy"
  }
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
    const recordDate=new Date(data.updatedAt)
    isActive = (new Date() - recordDate) / (1000*60) < 2

  } catch (error) {
    console.error("Unable to connect to the database:", error.original);
  }

  return {
    isActive:isActive,
    data:data
  };
}
/**
 * Checks if the second date was yesterday relative to the current date.
 * @param {Date} currentDate The current date and time.
 * @param {Date} secondDate The date to compare against.
 * @returns {Promise<boolean>} True if the second date was yesterday from the current date, false otherwise.
 */
export async function isYesterday(currentDate, secondDate) {
  // Set time portion of currentDate to 0
  currentDate.setHours(0, 0, 0, 0);

  // Set time portion of secondDate to 0
  secondDate.setHours(0, 0, 0, 0);

  // Get the time difference between the two dates in milliseconds
  const timeDiff = currentDate.getTime() - secondDate.getTime();

  // Convert milliseconds to days
  const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

  // Check if the second date was exactly 1 day (24 hours) ago
  return daysDiff >= 1;
}
/**
 * Returns a string of the date in the format "YYYY-MM-DD".
 * @param {Date} Date The date that need date extraction.
 * @returns {Promise<string>} A string of the date in the format "YYYY-MM-DD".
 */
export async function getDateString(Date) {
  return Date.getFullYear() + "-" + (Date.getMonth() + 1) + "-" + Date.getDate()
}

export async function getLastDate(){
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
          resolve(result.time);
        })
        .catch((error) => {
          reject(error);
        });
    })
  } catch (error) {
    console.error("Unable to connect to the database:", error.original);
  }
}

export async function getRangeOfDays(startDate, endDate){
  const db = require("@/database/database");
  const DaysModel = require("../../models/Days");
  const { Op } = require("sequelize");

  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
    const lastDays = await new Promise((resolve, reject) => {
      DaysModel.findAll({
        where: {
          day: {
            [Op.between]: [startDate, endDate]
          }
        },
        raw: true,
      })
        .then( (result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    })

    return lastDays
  } catch (error) {
    console.error("Unable to connect to the database:", error.original);
  }
}

export async function getRangeOfRecords(startDate, endDate){
  const db = require("@/database/database");
  const RecordsModel = require("../../models/Records");
  const { Op } = require("sequelize");

  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
    return await new Promise((resolve, reject) => {
      RecordsModel.findAll({
        where: {
          time: {
            [Op.between]: [startDate, endDate]
          }
        }
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