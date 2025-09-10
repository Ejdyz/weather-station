import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import _  from "lodash"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { timingSafeEqual } from "crypto"
import { FALLBACK_MOONRISE, FALLBACK_MOONSET, FALLBACK_SUNRISE, FALLBACK_SUNSET } from "@/config/config"
import { formatInTimeZone, fromZonedTime } from "date-fns-tz"
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

interface WeatherTypeForFormat {
  type: "temperature" | "humidity" | "pressure" | "wind_speed_ms" | "wind_speed_kmh" | "wind_direction" | "rain_mm" | "light" | "date_full_numeric" | "date_short_numeric" | "date_short_written" | "time_short_numeric";
  value: number | Date | null | undefined;
}

export function formatWeatherData(type: WeatherTypeForFormat["type"], value: WeatherTypeForFormat["value"]): string {
  if (value === null || value === undefined) {
    return "N/A";
  }

  if (value instanceof Date) {
    switch (type) {
      case "date_full_numeric":
        return formatDateToDisplayNumericFull(value);
      case "date_short_numeric":
        return formatDateNumericShort(value);
      case "date_short_written":
        return formatDateToDisplayWrittenDays(value);
      case "time_short_numeric":
        return formatTimeNumericShort(value);
      default:
        throw new Error(`Unknown weather data type: ${type}`);
    }
  } else {
    switch (type) {
      case "temperature":
        return `${_.round(value, 2)} °C`;
      case "humidity":
        return `${_.round(value, 2)} %`;
      case "pressure":
        return `${_.round(value, 2)} hPa`;
      case "wind_speed_ms":
        return `${_.round(value, 2)} m/s`;
      case "wind_speed_kmh":
        return `${_.round(value * 3.6, 2)} km/h`;
      case "wind_direction":
        return convertDirectionToCardinalString(value);
      case "rain_mm":
        return `${_.round(value, 2)} mm`;
      case "light":
        return `${_.round(value, 2)} lx`;
      default:
        throw new Error(`Unknown weather data type: ${type}`);
    }
  }
}

export function formatDateToDisplayNumericFull(date: Date | string | null | undefined): string {
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

export function formatDateToDisplayWrittenDays(date: Date) {
  //[Day of week] [number of day of month]. [Month]
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
  return new Intl.DateTimeFormat('cs-CZ', options).format(date);
}

export function formatDateNumericShort(date: Date) {
  return date.getDate().toString().padStart(2, '0') + '/' + (date.getMonth() + 1).toString().padStart(2, '0') + '/' + date.getFullYear();
}

export function formatTimeNumericShort(date: Date) {
  return date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0');
}



/**
 * Výpočet nasyceného tlaku vodní páry (hPa)
 * Magnusova rovnice (Alduchov & Eskridge), rozdělená pro vodu a led.
 * 
 * @param {number} tempC - Teplota vzduchu v °C
 * @returns {number} - Nasycený tlak vodní páry (hPa)
 */
export function saturationVaporPressure_hPa(tempC : number) : number {
    // Konstanty pro vodu (T >= 0 °C)
    const overWater = { a: 17.62, b: 243.12 };
    // Konstanty pro led (T < 0 °C)
    const overIce   = { a: 22.46, b: 272.62 };

    // Vyber konstanty podle teploty
    const { a, b } = (tempC >= 0) ? overWater : overIce;

    // Magnusův vzorec: e_s = 6.112 * exp((a*T)/(b+T))
    return 6.112 * Math.exp((a * tempC) / (b + tempC));
}

export function vaporPressure_hPa(Tc :number, RH :number) {
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
export function skyCondition(pressure_hPa: number, humidity_percent: number, temperature_C: number, wind_mps: number, rain_mm: number) : "unknown" | "overcast" | "clear" | "partly cloudy" | "cloudy" | "fog" {
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
  if (dpd <= 0.5 && RH >= 97 && wind_mps <= 3 && rain_mm === 0) {
    return "fog";
  }
  // Likely fog (patchy/mist): small dpd + high RH + calm wind
  if (dpd <= 1.0 && RH >= 95 && wind_mps <= 2 && rain_mm === 0) {
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

export function getIconSrcFromWeatherData(pressure_hPa: number, humidity_percent: number, temperature_C: number, wind_mps: number, rain_mm: number, partOfTheDay: "day" | "night") {
  const isRaining = rain_mm > 0;
  const isSnowing = temperature_C < 0;
  const skyConditionString = skyCondition(pressure_hPa, humidity_percent, temperature_C, wind_mps, rain_mm).replace(" ", "-");

  const pathPrefix = "/icons/skyCondition/";
  const rainSuffix = isRaining ? isSnowing ? "-snow" : (rain_mm <= 2.5 ? "-drizzle" : "-rain") : "";

  if (skyConditionString === "unknown") return `${pathPrefix}partly-cloudy-${partOfTheDay}${rainSuffix}.svg`;
  if (skyConditionString === "fog" && !isRaining) return `${pathPrefix}fog.svg`;
  if (skyConditionString === "clear" && isRaining){
    return `${pathPrefix}cloudy${rainSuffix}.svg`;
  }
  if (skyConditionString === "overcast" || skyConditionString === "cloudy"){
    return `${pathPrefix}${skyConditionString}${rainSuffix}.svg`;
  }else{
    return `${pathPrefix}${skyConditionString}-${partOfTheDay}${rainSuffix}.svg`;
  }
}

// Helper to parse a "HH:MM" time string to a Date (local timezone) using today's date.
export function parseTimeToDate(time: string, base: Date): Date {
  const d = new Date(base);
  const [h, m] = time.split(":").map(Number);
  if (Number.isFinite(h) && Number.isFinite(m)) {
    d.setHours(h, m, 0, 0);
  }
  return d;
}

/**
 * Parse a wall-clock time (e.g. "06:15") that is given in a specific IANA timezone
 * for the same calendar day as `base`, and return a UTC Date for that instant.
 * This keeps DST (summer/winter time) correct because the conversion uses the given zone.
 */
export function parseTimeInZoneToUTC(time: string, base: Date, timeZone: string = "Europe/Prague"): Date {
  // Build a local date-time string in the target zone using that zone's calendar day
  console.log("time:", time, "base:", base, "timeZone:", timeZone);
  const dateStrInZone = formatInTimeZone(base, timeZone, "yyyy-MM-dd");
  const localDateTime = `${dateStrInZone} ${time}`; // e.g., 2025-09-10 06:00
  // Interpret the above as time in `timeZone` and convert to a UTC Date
  return fromZonedTime(localDateTime, timeZone);
}

export interface GeolocationData {
  moonrise: Date;
  moonset: Date;
  sunrise: Date;
  sunset: Date;
  golden_hour_begin: string; // keep as string for now
  golden_hour_end: string;   // keep as string for now
}

export async function fetchGeolocationData(): Promise<GeolocationData> {
  // Default values (used if API fails): create Date objects for typical times
  const today = new Date();
  let data: GeolocationData = {
    // Fallbacks assume the location's timezone (Europe/Prague)
    moonrise: parseTimeInZoneToUTC(FALLBACK_MOONRISE, today),
    moonset: parseTimeInZoneToUTC(FALLBACK_MOONSET, today),
    sunrise: parseTimeInZoneToUTC(FALLBACK_SUNRISE, today),
    sunset: parseTimeInZoneToUTC(FALLBACK_SUNSET, today),
    golden_hour_begin: "-:-",
    golden_hour_end: "-:-",
  };

  const API_KEY = process.env.GEOLOCATION_API_KEY;
  const latitude = 50.625209331688644;
  const longitude = 14.15659458567475;
  const elevation = 400;

  try {
    const response = await fetch(`https://api.ipgeolocation.io/v2/astronomy?apiKey=${API_KEY}&lat=${latitude}&long=${longitude}&format=json&elevation=${elevation}`);
    const json = await response.json();
    if (!json || !json.astronomy) {
      throw new Error("Invalid geolocation data");
    }

    // Resolve fallback strings first (replace "-:-" with provided night_* values)
    const sunriseStr: string = json.astronomy.sunrise === "-:-" ? json.astronomy.night_begin : json.astronomy.sunrise;
    const sunsetStr: string = json.astronomy.sunset === "-:-" ? json.astronomy.night_end : json.astronomy.sunset;
    const moonriseStr: string = json.astronomy.moonrise === "-:-" ? json.astronomy.night_begin : json.astronomy.moonrise;
    const moonsetStr: string = json.astronomy.moonset === "-:-" ? json.astronomy.night_end : json.astronomy.moonset;

  const sunriseDate = parseTimeInZoneToUTC(sunriseStr, today);
  const sunsetDateInitial = parseTimeInZoneToUTC(sunsetStr, today);
  const moonriseDate = parseTimeInZoneToUTC(moonriseStr, today);
  let moonsetDate = parseTimeInZoneToUTC(moonsetStr, today);

  // We'll adjust sunset relative to sunrise after both are UTC Dates
  let sunsetDate = sunsetDateInitial;

    if (moonsetDate.getTime() <= moonriseDate.getTime()) {
      moonsetDate = new Date(moonsetDate.getTime() + 24 * 60 * 60 * 1000); // add one day
    }

    if (sunsetDate.getTime() <= sunriseDate.getTime()) {
      sunsetDate = new Date(sunsetDate.getTime() + 24 * 60 * 60 * 1000);
    }

    data = {
      moonrise: moonriseDate,
      moonset: moonsetDate,
      sunrise: sunriseDate,
      sunset: sunsetDate,
      golden_hour_begin: json.astronomy.evening?.golden_hour_begin ?? "-:-",
      golden_hour_end: json.astronomy.evening?.golden_hour_end ?? "-:-",
    };

  } catch (error) {
    console.error("Error fetching geolocation data:", error);
  }

  return data;
}


/**
 * Get the moon phase fraction for a specific date.
 * @param date The date to calculate the moon phase for.
 * @returns A number between 0 and 1 representing the moon phase.
 */
export function getMoonPhaseFraction(date: Date): number {
  // Reference: known new moon (March 29, 2025 at 06:58 UTC)
  const reference = new Date(Date.UTC(2025, 2, 29, 6, 58))
  const synodicMonth = 29.530588853 // days

  const diff = (date.getTime() - reference.getTime()) / 1000 / 60 / 60 / 24
  const phase = (diff % synodicMonth + synodicMonth) % synodicMonth
  return phase / synodicMonth
}
/**
 * Get the name of the moon phase based on its fraction.
 * @param fraction A number between 0 and 1 representing the moon phase.
 * @returns The name of the moon phase.
 */
export function getMoonPhaseName(fraction: number): string {
  if (fraction < 0.03 || fraction > 0.97) return "new"
  if (fraction < 0.25) return "waxing-crescent"
  if (fraction < 0.27) return "first-quarter"
  if (fraction < 0.48) return "waxing-gibbous"
  if (fraction < 0.52) return "full"
  if (fraction < 0.73) return "waning-gibbous"
  if (fraction < 0.77) return "last-quarter"
  return "waning-crescent"
}

export function getMoonPhase(date: Date): string {
  const fraction = getMoonPhaseFraction(date);
  return getMoonPhaseName(fraction);
}

/**
 * Calculate the pressure at sea level.
 * @param pressure The atmospheric pressure at the given altitude.
 * @param temperature The temperature at the given altitude.
 * @returns The pressure at sea level.
 */
export function pressureAtSeaLevel(pressure: number, temperature: number): number {
  const altitude = 400;
  const T_K = temperature + 273.15;
  const k = 5.255877432444129;
  const P0 = pressure * (1 + (0.0065 * altitude) / T_K) ** k;
  return P0;
}

export function windSpeedToBeaufortIndex(wind_speed_ms: number): number {
  const wind_speed_kmh = wind_speed_ms * 3.6;

  if (wind_speed_kmh < 1) return 0;    // Calm
  if (wind_speed_kmh < 6) return 1;    // Light air
  if (wind_speed_kmh < 12) return 2;   // Light breeze
  if (wind_speed_kmh < 20) return 3;   // Gentle breeze
  if (wind_speed_kmh < 29) return 4;   // Moderate breeze
  if (wind_speed_kmh < 39) return 5;   // Fresh breeze
  if (wind_speed_kmh < 50) return 6;   // Strong breeze
  if (wind_speed_kmh < 62) return 7;   // High wind
  if (wind_speed_kmh < 75) return 8;   // Gale
  if (wind_speed_kmh < 89) return 9;   // Strong gale
  if (wind_speed_kmh < 103) return 10; // Storm
  if (wind_speed_kmh < 118) return 11; // Violent storm
  return 12;                            // Hurricane
}
