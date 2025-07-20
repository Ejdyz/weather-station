/*
  Warnings:

  - The `type` column on the `Forecasts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `History_days` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `History_days` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `history_daysId` on the `History` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Forecast_type" AS ENUM ('Hourly', 'Daily');

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_history_daysId_fkey";

-- AlterTable
ALTER TABLE "Forecasts" DROP COLUMN "type",
ADD COLUMN     "type" "Forecast_type" NOT NULL DEFAULT 'Hourly';

-- AlterTable
ALTER TABLE "History" DROP COLUMN "history_daysId",
ADD COLUMN     "history_daysId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "History_days" DROP CONSTRAINT "History_days_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "History_days_pkey" PRIMARY KEY ("id");

-- DropEnum
DROP TYPE "forecast_type";

-- CreateIndex
CREATE INDEX "idx_history_day_recorded_at" ON "History"("history_daysId", "recorded_at");

-- CreateIndex
CREATE UNIQUE INDEX "History_days_id_key" ON "History_days"("id");

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_history_daysId_fkey" FOREIGN KEY ("history_daysId") REFERENCES "History_days"("id") ON DELETE CASCADE ON UPDATE CASCADE;
