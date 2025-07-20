import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { StatusApiSchema } from '@/lib/validation';
import { z } from 'zod';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // Validate the data structure
    
    const parsedData = StatusApiSchema.safeParse(data);

    console.log(parsedData);
    

    if (parsedData.success) {
      return NextResponse.json({ status: 200, message: 'Valid user data', data: parsedData });
    } else {
      return NextResponse.json({ status: 400, message: 'Invalid user data', data: z.treeifyError(parsedData.error) });
    }
    // await prisma.status.create({
    //   data: {
    //     wind_speed: data.wind_speed_m_s,
    //     wind_direction: data.wind_direction,
    //     rain_mm: data.rain_mm,
    //     temperature: data.temperature_dht,
    //     humidity: data.humidity_dht,
    //     pressure: data.pressure_hpa,
    //     light: data.sunlight_raw,
    //     recorded_at: new Date(data.rtc_timestamp),
    //     rtc_sync_lost: data.rtc_sync_lost,
    //   }
    // });

    // Process the data here (for testing, just echo it back)
    return NextResponse.json({ message: 'Received data', data });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}