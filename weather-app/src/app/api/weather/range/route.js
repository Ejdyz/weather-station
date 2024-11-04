import {NextResponse} from "next/server";
import {getRangeOfDays, getRangeOfRecords} from "@/lib/weatherData";

export const fetchCache = 'force-no-store';

export async function POST(request) {
  const res = await request.json()
  
  const {
    type, 
    startDate,
    endDate
  } = res;

  if (typeof type !== "string") {
    return NextResponse.json({error:"Wrong type value",}, { status: 400 })
  }
  if (typeof startDate !== "string") {
    return NextResponse.json({error:"Wrong startDate value",}, { status: 400 })
  }
  if (typeof endDate !== "string") {
    return NextResponse.json({error:"Wrong endDate value",}, { status: 400 })
  }
  
  try {
    if(type === "charts"){
      const result = await getRangeOfRecords(new Date(startDate), new Date(endDate));
      return NextResponse.json({success:true, data:result}, { status: 200 , headers: {'Cache-Control': 'no-store, max-age=0'} })
    }
    if(type === "tables"){
      const result = await getRangeOfDays(new Date(startDate), new Date(endDate));
      return NextResponse.json({success:true, data:result}, { status: 200 , headers: {'Cache-Control': 'no-store, max-age=0'} })
    }
    return NextResponse.json({error:"Wrong type value",}, { status: 400 })
  } catch (error) {
    console.error("Unable to connect to the database:", error.original);
    return NextResponse.json({error:"server error"}, { status: 500 , headers: {'Cache-Control': 'no-store, max-age=0'} })
  }
}