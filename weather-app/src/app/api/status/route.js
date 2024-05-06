import {NextResponse} from "next/server";
import {getWeatherStationStatus} from "@/lib/weatherData";

export const fetchCache = 'force-no-store';

export async function GET() {
  try {
    const status = await getWeatherStationStatus();
    if(status.isActive){
      return NextResponse.json({success:"active", data:status.data, currentTimeAtServer: new Date()}, { status: 200 , headers: {'Cache-Control': 'no-store, max-age=0'} })
    }else{
      return NextResponse.json({error:"not active", data:status.data, currentTimeAtServer: new Date()}, { status: 500 , headers: {'Cache-Control': 'no-store, max-age=0'} })
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error.original);
    return NextResponse.json({error:"server error"}, { status: 500 , headers: {'Cache-Control': 'no-store, max-age=0'} })
  }
}