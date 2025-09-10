import { prisma } from '@/lib/prisma';
import { createOrGetHistoryDaysFromDate, updateHistoryDayWithHistoryRecords } from '@/lib/days';
import { Status } from '@/generated/prisma';
import { getLastStatusRecord } from '@/lib/status';
import { max } from 'lodash';
import { 
  apparentTemperature,
  dewPointTemperature,
  getIconSrcFromWeatherData,
  pressureAtSeaLevel,
  saturationVaporPressure_hPa,
  skyCondition,
  vaporPressure_hPa,
  windSpeedToBeaufortIndex,
  fetchGeolocationData
} from './utils';

export async function createHistoryRecord(statusRecords: Status[]) {
  const lastStatusRecord = statusRecords[0];

  const lastHistoryDay = await createOrGetHistoryDaysFromDate(lastStatusRecord.recorded_at);

  const geoAPIData = await fetchGeolocationData();
  const partOfTheDay = lastStatusRecord.recorded_at >= geoAPIData.sunrise && lastStatusRecord.recorded_at <= geoAPIData.sunset ? "day" : "night";


  const data = {
    recorded_at: lastStatusRecord.recorded_at,
    history_daysId: lastHistoryDay.id,
    temperature: lastStatusRecord.temperature,
    app_temperature: apparentTemperature(lastStatusRecord.temperature || 0, lastStatusRecord.humidity || 0, lastStatusRecord.wind_speed || 0),
    humidity: lastStatusRecord.humidity,
    pressure: lastStatusRecord.pressure,
    pressure_at_sea_level: pressureAtSeaLevel(lastStatusRecord.pressure || 0, lastStatusRecord.temperature || 0),
    light: lastStatusRecord.light,
    wind_speed: lastStatusRecord.wind_speed,
    max_wind_speed: (() => {
        const vals = statusRecords.map(r => r.wind_speed).filter((v): v is number => v !== null);
        return vals.length ? max(vals) : null;
    })(),
    beaufort: windSpeedToBeaufortIndex(lastStatusRecord.wind_speed || 0),
    wind_direction: (() => {
        const vals = statusRecords.map(r => r.wind_direction).filter((v): v is number => v !== null);
        return vals.length ? vals.reduce((sum, v) => sum + v, 0) / vals.length : null;
    })(),
    rain_mm: (() => {
        const vals = statusRecords.map(r => r.rain_mm).filter((v): v is number => v !== null);
        return vals.length ? vals.reduce((sum, v) => sum + v, 0) / vals.length : null;
    })(),
    dew_point: dewPointTemperature(lastStatusRecord.temperature || 0, lastStatusRecord.humidity || 0),
    saturation_vapor_pressure: saturationVaporPressure_hPa(lastStatusRecord.temperature || 0),
    vapor_pressure: vaporPressure_hPa(lastStatusRecord.temperature || 0, lastStatusRecord.humidity || 0),
    sky_condition_icon: getIconSrcFromWeatherData(lastStatusRecord.pressure || 0, lastStatusRecord.humidity || 0, lastStatusRecord.temperature || 0, lastStatusRecord.wind_speed || 0, lastStatusRecord.rain_mm || 0, partOfTheDay),
    sky_condition_description: skyCondition(lastStatusRecord.pressure || 0, lastStatusRecord.humidity || 0, lastStatusRecord.temperature || 0, lastStatusRecord.wind_speed || 0, lastStatusRecord.rain_mm || 0),
  }

  const record = await prisma.history.create({
    data: data,
  });

  await updateHistoryDayWithHistoryRecords(lastHistoryDay.id, geoAPIData);

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
      max_wind_speed: true,
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

export async function getLastHistoryRecord() {
  const lastRecord = await prisma.history.findFirst({
    orderBy: {
      recorded_at: 'desc',
    },
  });

  return lastRecord;
}

export async function getLatestRecordFromHistoryAndStatus() {
  const latestStatus = await getLastStatusRecord();
  if (latestStatus !== null) {
    return latestStatus;
  }
  const latestHistory = await getLastHistoryRecord();
  return latestHistory;
}

export async function getHistoryRecordsWithSpace(count:number, spaceBetweenMin:number) {
  const now = new Date();
  const minutes = now.getMinutes() >= 30? 30 : 0;
  const since = new Date().setMinutes(minutes, 59);

  const historyRecords = await prisma.history.findMany({
    where: {
      recorded_at: {
        gte: new Date(since - count * 60 * 60 * 1000),
      },
    },
    select: {
      recorded_at: true,
      temperature: true,
      app_temperature: true,
      humidity: true,
      pressure: true,
      pressure_at_sea_level: true,
      light: true,
      wind_speed: true,
      max_wind_speed: true,
      beaufort: true,
      wind_direction: true,
      rain_mm: true,
      dew_point: true,
      saturation_vapor_pressure: true,
      vapor_pressure: true,
      sky_condition_icon: true,
      sky_condition_description: true
    },
  });

  const filteredRecords = historyRecords.filter(record => {
    return record.recorded_at.getMinutes() % spaceBetweenMin === 0;
  }).reverse().slice(0, count);

  return filteredRecords;
}
