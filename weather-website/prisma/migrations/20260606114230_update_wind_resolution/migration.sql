-- AlterTable
ALTER TABLE "History" ADD COLUMN     "min_wind_speed" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Status" ADD COLUMN     "wind_speed_max" DOUBLE PRECISION,
ADD COLUMN     "wind_speed_min" DOUBLE PRECISION;
