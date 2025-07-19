-- CreateEnum
CREATE TYPE "forecast_type" AS ENUM ('hourly', 'daily');

-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "recorded_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3),
    "temperature" DOUBLE PRECISION,
    "humidity" DOUBLE PRECISION,
    "pressure" DOUBLE PRECISION,
    "light" INTEGER,
    "wind_speed" DOUBLE PRECISION,
    "wind_direction" DOUBLE PRECISION,
    "rain_mm" DOUBLE PRECISION,
    "rtc_sync_lost" BOOLEAN,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "recorded_at" TIMESTAMP(3) NOT NULL,
    "temperature" DOUBLE PRECISION,
    "humidity" DOUBLE PRECISION,
    "pressure" DOUBLE PRECISION,
    "light" INTEGER,
    "wind_speed" DOUBLE PRECISION,
    "wind_direction" DOUBLE PRECISION,
    "rain_mm" DOUBLE PRECISION,
    "history_daysId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History_days" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3),
    "max_temperature" DOUBLE PRECISION,
    "avg_temperature" DOUBLE PRECISION,
    "min_temperature" DOUBLE PRECISION,
    "max_humidity" DOUBLE PRECISION,
    "avg_humidity" DOUBLE PRECISION,
    "min_humidity" DOUBLE PRECISION,
    "max_pressure" DOUBLE PRECISION,
    "avg_pressure" DOUBLE PRECISION,
    "min_pressure" DOUBLE PRECISION,
    "max_light" DOUBLE PRECISION,
    "avg_light" DOUBLE PRECISION,
    "min_light" DOUBLE PRECISION,
    "max_wind_speed" DOUBLE PRECISION,
    "avg_wind_speed" DOUBLE PRECISION,
    "min_wind_speed" DOUBLE PRECISION,
    "max_wind_direction" DOUBLE PRECISION,
    "avg_wind_direction" DOUBLE PRECISION,
    "min_wind_direction" DOUBLE PRECISION,
    "max_rain_mm" DOUBLE PRECISION,
    "avg_rain_mm" DOUBLE PRECISION,
    "min_rain_mm" DOUBLE PRECISION,

    CONSTRAINT "History_days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Forecasts" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "forecast_for" TIMESTAMP(3) NOT NULL,
    "type" "forecast_type" NOT NULL DEFAULT 'hourly',
    "confidence" DOUBLE PRECISION,
    "temperature" DOUBLE PRECISION,
    "humidity" DOUBLE PRECISION,
    "pressure" DOUBLE PRECISION,
    "light" DOUBLE PRECISION,
    "wind_speed" DOUBLE PRECISION,
    "wind_direction" DOUBLE PRECISION,
    "rain_mm" DOUBLE PRECISION,

    CONSTRAINT "Forecasts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Status_id_key" ON "Status"("id");

-- CreateIndex
CREATE UNIQUE INDEX "History_id_key" ON "History"("id");

-- CreateIndex
CREATE INDEX "idx_history_recorded_at" ON "History"("recorded_at");

-- CreateIndex
CREATE INDEX "idx_history_day_recorded_at" ON "History"("history_daysId", "recorded_at");

-- CreateIndex
CREATE UNIQUE INDEX "History_days_id_key" ON "History_days"("id");

-- CreateIndex
CREATE UNIQUE INDEX "History_days_date_key" ON "History_days"("date");

-- CreateIndex
CREATE INDEX "idx_history_days_date" ON "History_days"("date");

-- CreateIndex
CREATE UNIQUE INDEX "Forecasts_id_key" ON "Forecasts"("id");

-- CreateIndex
CREATE INDEX "idx_forecasts_forecast_for" ON "Forecasts"("forecast_for");

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_history_daysId_fkey" FOREIGN KEY ("history_daysId") REFERENCES "History_days"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
