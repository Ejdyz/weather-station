/*
  Warnings:

  - You are about to drop the column `skyConditionDescription` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `skyConditionIcon` on the `History` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "History" DROP COLUMN "skyConditionDescription",
DROP COLUMN "skyConditionIcon",
ADD COLUMN     "sky_condition_description" TEXT,
ADD COLUMN     "sky_condition_icon" TEXT;
