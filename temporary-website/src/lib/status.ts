import { prisma } from './prisma';
import { StatusApi } from './validation';

// Extract only the data fields (excluding api_key)
export type StatusEntry = Omit<StatusApi, 'api_key'>;

export async function createStatusEntry(data: StatusEntry) {
  const record = await prisma.status.create({
    data: {
      recorded_at: data.rtc_timestamp,
      rtc_sync_lost: data.rtc_sync_lost,
      temperature: data.temperature_dht,
      internal_temperature: data.temperature_bmp,
      humidity: data.humidity_dht,
      pressure: data.pressure_hpa,
      light: data.sunlight_raw,
      wind_speed: data.wind_speed_m_s,
      wind_direction: data.wind_direction,
      rain_mm: data.rain_mm,
    },
  });
  
  return record;
}

export async function getNumberOfLastStatusRecordsIn5minutes() {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  
  const recentRecords = await prisma.status.findMany({
    where: {
      recorded_at: {
        gte: fiveMinutesAgo,
      },
    },
    orderBy: {
      recorded_at: 'desc',
    },
  });

  return recentRecords.length;
}

export async function getAllStatusRecords() {
  const recentRecords = await prisma.status.findMany();
  return recentRecords;
}

export async function removeStatusRecordsOlderThan(date: Date) {
  await prisma.status.deleteMany({
    where: {
      recorded_at: {
        lte: date,
      },
    },
  });
}

export async function removeAllStatusRecords() {
  await prisma.status.deleteMany({});
}

export async function getLastStatusRecord() {
  const lastRecord = await prisma.status.findFirst({
    orderBy: {
      recorded_at: 'desc',
    },
  });
  
  return lastRecord;
}
