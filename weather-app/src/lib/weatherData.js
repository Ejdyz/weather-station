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
export async function isNight(){
  const currentTime = new Date().getHours()
  return currentTime < 6 || currentTime > 20
}

export async function getCurrentBackground(data) {
  const currentCloudiness = await getHowCloudyCurrentlyIs(data)
  const currentRaininess = await getHowMuchIsCurrentlyRaining(data)
  const isCurrentlyNight = await isNight()

  //define background colors for different weather
  const clearWeatherNight = "h-full w-full bg-gradient-to-tr from-gray-700 via-gray-800 to-gray-900"

  const clearWeatherDay = "h-full w-full bg-gradient-to-tr from-gray-300 via-cyan-500 to-blue-600"

  const partlyCloudyDay = "h-full w-full bg-gradient-to-tr from-sky-400 to-gray-400"
  const cloudyWeather = "h-full w-full bg-gradient-to-tr from-sky-300 to-gray-500"

  const drizzleWeather = "h-full w-full bg-gradient-to-tr from-sky-700 to-gray-400"
  const rainyWeather = "h-full w-full bg-gradient-to-tr from-sky-800  to-gray-500"
  const snowyWeather = "h-full w-full bg-gradient-to-tr from-sky-300  to-cyan-600"

  if (data === null) return clearWeatherNight
  //if its night
  if (isCurrentlyNight) return clearWeatherNight

  //if its clear weather and it is not raining
  if (currentCloudiness === "clear" && currentRaininess == null) return clearWeatherDay

  if (currentCloudiness === "partly cloudy") return partlyCloudyDay

  if (currentCloudiness === "cloudy") return cloudyWeather

  if (currentRaininess === "drizzle") return drizzleWeather

  if (currentRaininess === "rain") return rainyWeather

  if (currentRaininess === "snow") return snowyWeather
  return clearWeatherDay
}