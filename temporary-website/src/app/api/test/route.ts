import { NextRequest, NextResponse } from 'next/server';
import { StatusApiSchema } from '@/lib/validation';
import { z } from 'zod';
import { timingSafeCryptoCompare } from '@/lib/utils';
import { createStatusEntry, removeStatusRecordsOlderThan, getAllStatusRecords, removeAllStatusRecords } from '@/lib/status';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!timingSafeCryptoCompare(data.api_key, process.env.API_KEY)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const parsedData = StatusApiSchema.safeParse(data);
    
    if (!parsedData.success) {
      return NextResponse.json({ status: 400, message: 'Invalid user data', data: z.treeifyError(parsedData.error) });
    }
     
    const { api_key, ...statusData } = parsedData.data;
    const lastRecord = await createStatusEntry(statusData);
     
    const fiveMinutesFromLastRecordDate = new Date(lastRecord.recorded_at.getTime() - 5 * 60 * 1000)
    await removeStatusRecordsOlderThan(fiveMinutesFromLastRecordDate);

    const statusRecords = await getAllStatusRecords();
    if (statusRecords.length >= 5 && lastRecord.recorded_at.getMinutes() % 5 === 0) {
      // TODO: Create history record from last 5 status records
      // await createHistoryRecord(statusRecords);
      await removeAllStatusRecords();
    }

    return NextResponse.json({ status: 200, message: 'Status entry created successfully', data: lastRecord });    
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}