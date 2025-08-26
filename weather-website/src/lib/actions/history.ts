"use server"
import { prisma } from "@/lib/prisma";
import { History } from "@/generated/prisma";

export async function getHistoryRecordsInRange(startDate: Date, endDate: Date): Promise<History[]> {
  "use server"
  const historyDays = await prisma.history.findMany({
    where: {
      recorded_at: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: {
      recorded_at: "desc",
    },
  });

  return historyDays.reverse();
}