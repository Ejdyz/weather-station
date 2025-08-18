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

export function convertDirectionToEnglishCardinalCharacters(degrees: number): string {
  if (degrees < 0 || degrees > 360) {
    throw new Error("Degrees must be between 0 and 360");
  }
  const directions = [
    "N",
    "NE",
    "E",
    "SE",
    "S",
    "SW",
    "W",
    "NW",
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

/**
 * Heuristic sky condition from pressure (hPa), humidity (%), temperature (°C)
 * Requires your helpers: dewPointTemperature(T, RH) and vaporPressure_hPa(T, RH)
 * @param pressure_hPa 
 * @param humidity_percent 
 * @param temperature_C 
 * @returns "clear" | "partly cloudy" | "cloudy" | "overcast" | "unknown"
 */
export function skyConditionWithoutFog(pressure_hPa: number, humidity_percent: number, temperature_C: number) : "unknown" | "overcast" | "clear" | "partly cloudy" | "cloudy" {
  if (!isFinite(pressure_hPa) || !isFinite(humidity_percent) || !isFinite(temperature_C)) return "unknown";
  const RH = Math.max(0, Math.min(100, humidity_percent));

  const Td = dewPointTemperature(temperature_C, RH);      // °C
  const dpd = temperature_C - Td;                         // dew-point depression (°C)
  const vp = vaporPressure_hPa(temperature_C, RH) || 0;   // hPa, optional tie-breaker

  const clamp = (x: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, x));

  // Pressure: map ~1025 hPa (strong high) → 0 (clear bias), ~995 hPa (deep low) → 1 (cloudy bias)
  const pressureScore = clamp((1025 - pressure_hPa) / 30, 0, 1);

  // Humidity: 40% → 0, 100% → 1
  const humidityScore = clamp((RH - 40) / 60, 0, 1);

  // Dew-point depression: 10°C+ → 0 (dry/clear bias), 0°C → 1 (near saturation)
  const dpdScore = clamp((10 - dpd) / 10, 0, 1);

  // Vapor pressure (temperature-dependent moisture proxy): 5 hPa → ~0, 25 hPa → ~1
  const vpScore = clamp((vp - 5) / 20, 0, 1);

  // Near-saturation + high RH often means low cloud/overcast or fog
  if (dpd <= 2 && RH >= 90) return "overcast";

  // Very high pressure and very dry → likely clear
  if (pressure_hPa >= 1022 && RH <= 45 && dpd >= 6) return "clear";

  const cloudinessIndex =
    0.45 * dpdScore +
    0.30 * humidityScore +
    0.20 * pressureScore +
    0.05 * vpScore;

  if (cloudinessIndex < 0.25) return "clear";
  if (cloudinessIndex < 0.50) return "partly cloudy";
  if (cloudinessIndex < 0.75) return "cloudy";
  return "overcast";
}

/**
 * Heuristic sky condition including fog from pressure (hPa), humidity (%), temperature (°C), wind speed (m/s)
 * @param pressure_hPa 
 * @param humidity_percent 
 * @param temperature_C 
 * @param wind_mps 
 * @returns "unknown" | "overcast" | "clear" | "partly cloudy" | "cloudy" | "fog"
 */
export function skyCondition(pressure_hPa: number, humidity_percent: number, temperature_C: number, wind_mps: number) : "unknown" | "overcast" | "clear" | "partly cloudy" | "cloudy" | "fog" {
  if (![pressure_hPa, humidity_percent, temperature_C, wind_mps].every(isFinite)) {
    return "unknown";
  }

  const RH = Math.max(0, Math.min(100, humidity_percent));
  const Td = dewPointTemperature(temperature_C, RH);
  const dpd = temperature_C - Td; // dew-point depression

  // Optional: vapor pressure tie-breaker if helper exists
  const vp = (typeof vaporPressure_hPa === "function")
    ? (vaporPressure_hPa(temperature_C, RH) || 0)
    : 0;

  // --- Fog detection ---
  // Dense fog: tiny dpd + very high RH + light wind
  if (dpd <= 0.5 && RH >= 97 && wind_mps <= 3) {
    return "fog";
  }
  // Likely fog (patchy/mist): small dpd + high RH + calm wind
  if (dpd <= 1.0 && RH >= 95 && wind_mps <= 2) {
    return "fog";
  }

  // --- Sky condition heuristic (non-fog cases) ---
  const clamp = (x: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, x));

  // Pressure: 1025 = strong high (clear), 995 = deep low (cloudy)
  const pressureScore = clamp((1025 - pressure_hPa) / 30, 0, 1);
  // Humidity: 40% → 0, 100% → 1
  const humidityScore = clamp((RH - 40) / 60, 0, 1);
  // Dew-point depression: 10°C+ → 0, 0°C → 1
  const dpdScore = clamp((10 - dpd) / 10, 0, 1);
  // Vapor pressure: 5–25 hPa scale
  const vpScore = clamp((vp - 5) / 20, 0, 1);

  // Special cases
  if (dpd <= 2 && RH >= 90) return "overcast";
  if (pressure_hPa >= 1022 && RH <= 45 && dpd >= 6) return "clear";

  // Weighted blend
  const cloudinessIndex =
    0.45 * dpdScore +
    0.30 * humidityScore +
    0.20 * pressureScore +
    0.05 * vpScore;

  if (cloudinessIndex < 0.25) return "clear";
  if (cloudinessIndex < 0.50) return "partly cloudy";
  if (cloudinessIndex < 0.75) return "cloudy";
  return "overcast";
}