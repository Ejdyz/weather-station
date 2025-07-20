/*
  Warnings:

  - Made the column `created_at` on table `History_days` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `Status` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Forecasts" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "History" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "History_days" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Status" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;
