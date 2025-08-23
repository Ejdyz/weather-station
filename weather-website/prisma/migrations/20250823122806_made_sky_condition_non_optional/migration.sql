/*
  Warnings:

  - Made the column `sky_condition_description` on table `History` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sky_condition_icon` on table `History` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "History" ALTER COLUMN "sky_condition_description" SET NOT NULL,
ALTER COLUMN "sky_condition_icon" SET NOT NULL;
