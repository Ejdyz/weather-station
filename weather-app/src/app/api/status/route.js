import {NextResponse} from "next/server";
import {getWeatherStationStatus} from "@/lib/weatherData";

export async function GET() {
  try {
    const status = await getWeatherStationStatus();
    if(status.isActive){
      return NextResponse.json({success:"active", data:status.data}, { status: 200 })
    }else{
      return NextResponse.json({error:"not active", data:status.data}, { status: 500 })
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error.original);
    return NextResponse.json({error:"server error"}, { status: 500 })
  }
}