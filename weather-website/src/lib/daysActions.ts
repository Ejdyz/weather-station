"use server"
import { prisma } from "./prisma";
import { History_days } from "@/generated/prisma";

export interface AvailableDate extends History_days {
  all_rain_mm: number;
}


export async function getHistoryDaysInRange(startDate: Date, endDate: Date): Promise<AvailableDate[]> {
  "use server"
  const historyDays = await prisma.history_days.findMany({
    where: {
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: {
      date: "desc",
    },
    //add all the rain from History records combined
    select: {
      id: true,
      created_at: true,
      date: true,
      max_temperature: true,
      avg_temperature: true,
      min_temperature: true,
      max_humidity: true,
      avg_humidity: true,
      min_humidity: true,
      max_pressure: true,
      avg_pressure: true,
      min_pressure: true,
      max_light: true,
      avg_light: true,
      min_light: true,
      max_wind_speed: true,
      avg_wind_speed: true,
      min_wind_speed: true,
      max_wind_direction: true,
      avg_wind_direction: true,
      min_wind_direction: true,
      max_rain_mm: true,
      avg_rain_mm: true,
      min_rain_mm: true,
      sunrise: true,
      sunset: true,
      moonrise: true,
      moonset: true,
      moon_phase: true,
      golden_hour_start: true,
      golden_hour_end: true,
      History: {
        select: {
          rain_mm: true,
        },
      },
    },
  });


  return historyDays.map((day) => {
    return {
      ...day,
      all_rain_mm: day.History.reduce((acc, record) => acc + (record.rain_mm || 0), 0),
    };
  });
}