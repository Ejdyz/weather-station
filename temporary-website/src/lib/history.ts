import { prisma } from '@/lib/prisma';
import { createOrGetHistoryDaysFromDate, updateHistoryDayWithHistoryRecords } from '@/lib/days';
import { Status } from '@/generated/prisma';


export async function createHistoryRecord(statusRecords: Status[]) {

  const lastStatusRecord = statusRecords[0];

  const lastHistoryDay = await createOrGetHistoryDaysFromDate(lastStatusRecord.recorded_at);

  const data = {
    recorded_at: lastStatusRecord.recorded_at,
    history_daysId: lastHistoryDay.id,
    temperature: lastStatusRecord.temperature,
    humidity: lastStatusRecord.humidity,
    pressure: lastStatusRecord.pressure,
    light: lastStatusRecord.light,
    wind_speed: (() => {
        const vals = statusRecords.map(r => r.wind_speed).filter((v): v is number => v !== null);
        return vals.length ? vals.reduce((sum, v) => sum + v, 0) / vals.length : null;
    })(),
    wind_direction: (() => {
        const vals = statusRecords.map(r => r.wind_direction).filter((v): v is number => v !== null);
        return vals.length ? vals.reduce((sum, v) => sum + v, 0) / vals.length : null;
    })(),
    rain_mm: (() => {
        const vals = statusRecords.map(r => r.rain_mm).filter((v): v is number => v !== null);
        return vals.length ? vals.reduce((sum, v) => sum + v, 0) / vals.length : null;
    })(),
  }

  const record = await prisma.history.create({
    data: data,
  });

  await updateHistoryDayWithHistoryRecords(lastHistoryDay.id);

  return record;
}

export async function getAllHistoryRecordsForHistoryDayUpdate(historyDayId: number) {
  const historyRecords = await prisma.history.aggregate({
    where: {
      history_daysId: historyDayId
    },
    _min: {
      temperature: true,
      humidity: true,
      pressure: true,
      light: true,
      wind_speed: true,
      wind_direction: true,
      rain_mm: true,
    },
    _max: {
      temperature: true,
      humidity: true,
      pressure: true,
      light: true,
      wind_speed: true,
      wind_direction: true,
      rain_mm: true,
    },
    _avg: {
      temperature: true,
      humidity: true,
      pressure: true,
      light: true,
      wind_speed: true,
      wind_direction: true,
      rain_mm: true,
    },
  });

  return historyRecords;
}