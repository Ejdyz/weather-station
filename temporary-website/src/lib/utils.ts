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
  const d = new Date(date);
  return d.toLocaleDateString('cs-CZ', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};