-- AlterTable
ALTER TABLE "History" ADD COLUMN     "app_temperature" DOUBLE PRECISION,
ADD COLUMN     "beaufort" INTEGER,
ADD COLUMN     "dew_point" DOUBLE PRECISION,
ADD COLUMN     "pressure_at_sea_level" DOUBLE PRECISION,
ADD COLUMN     "saturation_vapor_pressure" DOUBLE PRECISION,
ADD COLUMN     "skyConditionDescription" TEXT,
ADD COLUMN     "skyConditionIcon" TEXT,
ADD COLUMN     "vapor_pressure" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "History_days" ADD COLUMN     "golden_hour_end" TIMESTAMP(3),
ADD COLUMN     "golden_hour_start" TIMESTAMP(3),
ADD COLUMN     "moon_phase" TEXT,
ADD COLUMN     "moonrise" TIMESTAMP(3),
ADD COLUMN     "moonset" TIMESTAMP(3),
ADD COLUMN     "sunrise" TIMESTAMP(3),
ADD COLUMN     "sunset" TIMESTAMP(3);
