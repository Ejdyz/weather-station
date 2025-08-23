import { prisma } from "./prisma";

export async function getLastHistoryDay() {
  const lastHistoryDay = await prisma.history_days.findFirst({
    orderBy: {
      date: "desc",
    },
  });
  return lastHistoryDay;
}

export async function createOrGetHistoryDaysFromDate(date: Date) {
  const historyDayRecord = prisma.history_days.upsert({
    where: { date: date },
    update: {},
    create: { date: date },
  })
  return historyDayRecord;
}

import { getAllHistoryRecordsForHistoryDayUpdate } from "./history";
import { GeolocationData, getMoonPhase } from "./utils";

export async function updateHistoryDayWithHistoryRecords(historyDayId: number, geoAPIData: GeolocationData) {
  const data = await getAllHistoryRecordsForHistoryDayUpdate(historyDayId);

  const updatedRecord = prisma.history_days.update({
    where: { id: historyDayId },
    data: {
      min_temperature: data._min.temperature,
      max_temperature: data._max.temperature,
      avg_temperature: data._avg.temperature,
      min_humidity: data._min.humidity,
      max_humidity: data._max.humidity,
      avg_humidity: data._avg.humidity,
      min_pressure: data._min.pressure,
      max_pressure: data._max.pressure,
      avg_pressure: data._avg.pressure,
      min_light: data._min.light,
      max_light: data._max.light,
      avg_light: data._avg.light,
      min_wind_speed: data._min.wind_speed,
      max_wind_speed: data._max.max_wind_speed,
      avg_wind_speed: data._avg.wind_speed,
      min_wind_direction: data._min.wind_direction,
      max_wind_direction: data._max.wind_direction,
      avg_wind_direction: data._avg.wind_direction,
      min_rain_mm: data._min.rain_mm,
      max_rain_mm: data._max.rain_mm,
      avg_rain_mm: data._avg.rain_mm,
      sunrise: geoAPIData.sunrise,
      sunset: geoAPIData.sunset,
      moonrise: geoAPIData.moonrise,
      moonset: geoAPIData.moonset,
      moon_phase: getMoonPhase(new Date()),
      golden_hour_start: geoAPIData.golden_hour_begin,
      golden_hour_end: geoAPIData.golden_hour_end,
    }
  })

  return updatedRecord;
}

export async function getAvailableHistoryDays() {
  const historyDays = await prisma.history_days.findMany({
    orderBy: {
      date: "desc",
    },
    select: {
      date: true,
    }
  });

  return historyDays.map(day => day.date);
}