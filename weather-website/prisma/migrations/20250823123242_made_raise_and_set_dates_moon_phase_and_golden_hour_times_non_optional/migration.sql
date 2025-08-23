/*
  Warnings:

  - Made the column `golden_hour_end` on table `History_days` required. This step will fail if there are existing NULL values in that column.
  - Made the column `golden_hour_start` on table `History_days` required. This step will fail if there are existing NULL values in that column.
  - Made the column `moon_phase` on table `History_days` required. This step will fail if there are existing NULL values in that column.
  - Made the column `moonrise` on table `History_days` required. This step will fail if there are existing NULL values in that column.
  - Made the column `moonset` on table `History_days` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sunrise` on table `History_days` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sunset` on table `History_days` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "History_days" ALTER COLUMN "golden_hour_end" SET NOT NULL,
ALTER COLUMN "golden_hour_start" SET NOT NULL,
ALTER COLUMN "moon_phase" SET NOT NULL,
ALTER COLUMN "moonrise" SET NOT NULL,
ALTER COLUMN "moonset" SET NOT NULL,
ALTER COLUMN "sunrise" SET NOT NULL,
ALTER COLUMN "sunset" SET NOT NULL;
