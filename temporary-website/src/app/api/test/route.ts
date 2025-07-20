import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export type WeatherData = {
  wind_speed_m_s: number;
  wind_direction: number;
  rain_mm: number;
  temperature_dht: number;
  humidity_dht: number;
  pressure_hpa: number;
  sunlight_raw: number;
  rtc_timestamp: string;
  rtc_sync_lost: boolean;
  api_key: string;
};



export async function POST(req: NextRequest) {
  try {
    const data = await req.json() as WeatherData;
    // Validate the data structure
    
    await prisma.status.create({
      data: {
        wind_speed: data.wind_speed_m_s,
        wind_direction: data.wind_direction,
        rain_mm: data.rain_mm,
        temperature: data.temperature_dht,
        humidity: data.humidity_dht,
        pressure: data.pressure_hpa,
        light: data.sunlight_raw,
        recorded_at: new Date(data.rtc_timestamp),
        rtc_sync_lost: data.rtc_sync_lost,
      }
    });

    // Process the data here (for testing, just echo it back)
    return NextResponse.json({ message: 'Received data', data });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}