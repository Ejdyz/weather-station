import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import _  from "lodash"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { timingSafeEqual } from "crypto"

/**
 * Compares two strings in a timing-safe manner to prevent timing attacks.
 * @param compare - The string to compare.
 * @param expected - The expected string to compare against, defaults to process.env.API_KEY.
 * @returns {boolean} - Returns true if the strings match, false otherwise.
 */
export function timingSafeCryptoCompare(compare: string, expected: string | undefined = process.env.API_KEY): boolean {
  if (!expected || compare.length !== expected.length) {
    return false;
  }
  return timingSafeEqual(
    Buffer.from(compare, 'utf8'),
    Buffer.from(expected, 'utf8')
  );
}

export function convertDirectionToCardinalString(degrees: number): string {
  if (degrees < 0 || degrees > 360) {
    throw new Error("Degrees must be between 0 and 360");
  }
  const directions = [
    "Sever",
    "Severo-východ",
    "Východ",
    "Jihovýchod",
    "Jih",
    "Jiho-západ",
    "Západ",
    "Severo-západ",
  ];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

export function convertDirectionToCardinalChar(degrees: number): string {
  if (degrees < 0 || degrees > 360) {
    throw new Error("Degrees must be between 0 and 360");
  }
  const directions = [
    "S",
    "SV",
    "V",
    "JV",
    "J",
    "JZ",
    "Z",
    "SZ",
  ];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}


interface WeatherTypeForFormat {
  type: "temperature" | "humidity" | "pressure" | "wind_speed" | "wind_direction" | "rain_mm" | "light" | "date";
  value: number | null | undefined;
}

export function formatWeatherData(type: WeatherTypeForFormat["type"], value: WeatherTypeForFormat["value"]): string {
  if (value === null || value === undefined) {
    return "N/A";
  }
  switch (type) {
    case "temperature":
      return `${_.round(value, 2)} °C`;
    case "humidity":
      return `${_.round(value, 2)} %`;
    case "pressure":
      return `${_.round(value, 2)} hPa`;
    case "wind_speed":
      return `${_.round(value, 2)} m/s (${_.round(value * 3.6, 2)} km/h)`;
    case "wind_direction":
      return convertDirectionToCardinalString(value);
    case "rain_mm":
      return `${_.round(value, 2)} mm`;
    case "light":
      return `${_.round(value, 2)} lx`;
    case "date":
      return new Date(value).toLocaleString();
    default:
      throw new Error(`Unknown weather data type: ${type}`);
  }
}

export function formatDateForDisplay(date: Date | string | null | undefined): string {
  if (!date) {
    return "N/A";
  }
  
  // Ensure we have a proper Date object
  const d = typeof date === 'string' ? new Date(date) : date;
  
  // Check if the date is valid
  if (isNaN(d.getTime())) {
    return "Invalid Date";
  }
  
  // Format with explicit Czech locale and timezone
  return d.toLocaleDateString('cs-CZ', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Prague', // Explicit timezone for Czech Republic
  });
};


/**
 * Výpočet nasyceného tlaku vodní páry (hPa)
 * Magnusova rovnice (Alduchov & Eskridge), rozdělená pro vodu a led.
 * 
 * @param {number} tempC - Teplota vzduchu v °C
 * @returns {number} - Nasycený tlak vodní páry (hPa)
 */
function saturationVaporPressure_hPa(tempC : number) : number {
    // Konstanty pro vodu (T >= 0 °C)
    const overWater = { a: 17.62, b: 243.12 };
    // Konstanty pro led (T < 0 °C)
    const overIce   = { a: 22.46, b: 272.62 };

    // Vyber konstanty podle teploty
    const { a, b } = (tempC >= 0) ? overWater : overIce;

    // Magnusův vzorec: e_s = 6.112 * exp((a*T)/(b+T))
    return 6.112 * Math.exp((a * tempC) / (b + tempC));
}

function vaporPressure_hPa(Tc :number, RH :number) {
  const es = saturationVaporPressure_hPa(Tc);
  return (RH / 100) * es; // parciální tlak vodní páry (hPa)
}

/**
 * Calculates the "apparent temperature" based on temperature, humidity, and wind speed.
 * @param T - The temperature in °C.
 * @param RH - The relative humidity in %.
 * @param v - The wind speed in m/s.
 * @returns The apparent temperature in °C.
 */
export function apparentTemperature(T : number, RH : number, v : number) {
  const e = vaporPressure_hPa(T, RH);
  return T + (0.33 * e) - (0.7 * v) - 4.0;
}

/**
 * Calculates the dew point temperature based on temperature and humidity.
 * @param T - The temperature in °C.
 * @param RH - The relative humidity in %.
 * @returns The dew point temperature in °C.
 */
export function dewPointTemperature(T: number, RH: number): number {
  if (RH < 0 || RH > 100) {
    throw new Error("Invalid humidity");
  }

  const a = 17.67;
  const b = 243.5;

  const logValue = ((RH / 100) * Math.exp((a * T) / (b + T)));

  return (b * Math.log(logValue)) / (a - Math.log(logValue));
}