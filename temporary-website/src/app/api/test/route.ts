import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { StatusApiSchema } from '@/lib/validation';
import { z } from 'zod';
import { timingSafeCryptoCompare } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!timingSafeCryptoCompare(data.api_key, process.env.API_KEY)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const parsedData = StatusApiSchema.safeParse(data);

    

    if (parsedData.success) {
      return NextResponse.json({ status: 200, message: 'Valid user data', data: parsedData });
    } else {
      return NextResponse.json({ status: 400, message: 'Invalid user data', data: z.treeifyError(parsedData.error) });
    }

    // Process the data here (for testing, just echo it back)
    return NextResponse.json({ message: 'Received data', data });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}