import { getLastHistoryRecord, getLatestRecordFromHistoryAndStatus } from "@/lib/history";
import { formatWeatherData, apparentTemperature, convertDirectionToCardinalString, pressureAtSeaLevel, windSpeedToBeaufortIndex, parseTimeToDate } from "@/lib/utils";
import { getTranslator } from "@/lib/server-dictionary";
import Background from "@/components/ui/background";
import Base from "@/components/ui/base";
import { Separator } from "@/components/ui/separator";
import DataContainer from "@/components/main/dataContainer";
import { Carousel } from "@/components/ui/carousel";
import RiseAndSetComponent from "@/components/main/RiseAndSetComponent";
import MoonPhase from "@/components/main/moonPhase";
import GoldenHour from "@/components/main/goldenHour";
import RecentHistory from "@/components/main/recentHistory";
import { getLastHistoryDay } from "@/lib/days";
import { FALLBACK_GOLDEN_HOUR_END, FALLBACK_GOLDEN_HOUR_START, FALLBACK_MOONRISE, FALLBACK_MOONSET, FALLBACK_SUNRISE, FALLBACK_SUNSET } from "@/config/config";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function Page() {
  const { t } = await getTranslator();
  const wind_direction = t('data.wind_direction_cardinal') as Record<string, string>;
  const beaufort = t('data.beaufort_description') as string[];

  const latestRecord = await getLatestRecordFromHistoryAndStatus();
  const lastHistoryRecord = await getLastHistoryRecord();
  const lastHistoryDay = await getLastHistoryDay();

  const windDirectionValue = convertDirectionToCardinalString(latestRecord?.wind_direction || 0);
  
  const data = {
    temperature: {
      title: t("data.temperature"),
      key: 'temperature',
      value: formatWeatherData('temperature', latestRecord?.temperature),
    },
    apparentTemperature: {
      title: t("data.apparent"),
      shortTitle: t("data.apparent_short"),
      key: 'apparent',
      value: formatWeatherData('temperature', apparentTemperature(latestRecord?.temperature || 0, latestRecord?.humidity || 0, latestRecord?.wind_speed || 0))
    },
    skyCondition: {
      title: t("data.sky_condition"),
      key: 'sky_condition',
      value: lastHistoryRecord?.sky_condition_description,
      formattedValue: t("data.sky_conditions." + (lastHistoryRecord?.sky_condition_description === "unknown" ? "partly_cloudy" : lastHistoryRecord?.sky_condition_description.replace(" ", "_"))),
    },
    dewPoint: {
      title: t("data.dew_point"),
      key: 'dew_point',
      value: formatWeatherData('temperature', lastHistoryRecord?.dew_point || 0),
      icon: "/icons/thermometer-raindrop.svg",
    },
    vaporPressure: {
      title: t("data.vapor_pressure"),
      key: 'vapor_pressure',
      value: formatWeatherData('pressure', lastHistoryRecord?.vapor_pressure || 0),
      icon: "/icons/thermometer.svg"
    },
    saturationVaporPressure: {
      title: t("data.saturation_vapor_pressure"),
      key: 'saturation_vapor_pressure',
      value: formatWeatherData('pressure', lastHistoryRecord?.saturation_vapor_pressure || 0),
      icon: "/icons/thermometer.svg"
    },
    humidity: { 
      title: t("data.humidity"), 
      key: 'humidity', 
      value: formatWeatherData('humidity', latestRecord?.humidity),
      icon: "/icons/humidity.svg"
    },
    pressure: { 
      title: t("data.pressure"), 
      key: 'pressure', 
      value: formatWeatherData('pressure', latestRecord?.pressure),
      valueAtSeaLevel: formatWeatherData('pressure', pressureAtSeaLevel(latestRecord?.pressure || 0, latestRecord?.temperature || 0)),
      icon: "/icons/barometer.svg"
    },
    windSpeed: { 
      title: t("data.wind_speed"), 
      key: 'wind_speed', 
      value: formatWeatherData('wind_speed_ms', latestRecord?.wind_speed),
      valueKmh: formatWeatherData('wind_speed_kmh', latestRecord?.wind_speed),
      icon: (latestRecord?.wind_speed || 0) > 2.5 ? "/icons/windsock.svg" : "/icons/windsock-weak.svg",
    },
    beaufort: {
      title: beaufort[windSpeedToBeaufortIndex(latestRecord?.wind_speed || 0)],
      key: 'beaufort',
      value: windSpeedToBeaufortIndex(latestRecord?.wind_speed || 0),
      icon: `/icons/wind-beaufort-${windSpeedToBeaufortIndex(latestRecord?.wind_speed || 0)}.svg`,
    },
    wind_direction: { 
      title: t("data.wind_direction"), 
      key: 'wind_direction', 
      value: wind_direction[windDirectionValue],
      icon: `/icons/compass-${windDirectionValue}.svg`
    },
    rain: { 
      title: t("data.rain"), 
      key: 'rain', 
      value: formatWeatherData('rain_mm', latestRecord?.rain_mm),
      icon: "/icons/raindrop.svg"
    },
    sun: {
      setTime: lastHistoryDay?.sunset || parseTimeToDate(FALLBACK_SUNSET, new Date()),
      riseTime: lastHistoryDay?.sunrise || parseTimeToDate(FALLBACK_SUNRISE, new Date())
    },
    moon: {
      setTime: lastHistoryDay?.moonset || parseTimeToDate(FALLBACK_MOONSET, new Date()),
      riseTime: lastHistoryDay?.moonrise || parseTimeToDate(FALLBACK_MOONRISE, new Date())
    },
    goldenHour: {
      begin: lastHistoryDay?.golden_hour_start || parseTimeToDate(FALLBACK_GOLDEN_HOUR_START, new Date()),
      end: lastHistoryDay?.golden_hour_end || parseTimeToDate(FALLBACK_GOLDEN_HOUR_END, new Date())
    }

  }

  return (
    <Background>
      <Base>
        <div className="flex text-white md:flex-row flex-col h-full md:max-h-80">
          <div className="flex justify-between items-center md:w-1/2 w-full">
            <div className="flex justify-center flex-col items-start p-4 ">
              <h1 className="md:text-8xl sm:text-8xl text-4xl font-bold">{data.temperature.value}</h1>
              <strong  className="md:text-2xl">{data.skyCondition.formattedValue}</strong>
              <p>{data.apparentTemperature.shortTitle} <strong>{data.apparentTemperature.value}</strong></p>
            </div>
            <Image width={100}  height={100}  src="/icons/skyCondition/fog.svg" alt="Weather Icon" className="w-full md:p-4 p-4 aspect-square md:max-w-5/12 max-w-1/2" />
          </div>
          <Separator orientation="horizontal" className="md:hidden mx-auto sm:w-[calc(100%-6rem)] w-full" />
          <Separator orientation="vertical" className="hidden md:block my-4 w-1" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 w-full md:w-1/2 items-center">
            <DataContainer 
              title={data.pressure.title}
              value={data.pressure.value}
              icon={data.pressure.icon} 
              additionalData={[
                {
                  title: t("data.pressure_at_sea_level"),
                  value: data.pressure.valueAtSeaLevel,
                  icon: data.pressure.icon
                }
              ]}
            />
            <DataContainer title={data.humidity.title} value={data.humidity.value} icon={data.humidity.icon} />
            <DataContainer 
              title={data.windSpeed.title} 
              value={data.windSpeed.value} 
              icon={data.windSpeed.icon} 
                additionalData={
                  [{ 
                    value: data.windSpeed.valueKmh, 
                    title: t("data.wind_speed"), 
                    icon: data.windSpeed.icon 
                  },
                  { 
                    value: data.beaufort.title, 
                    title: data.beaufort.value + ". " + t("data.beaufort_number"), 
                    icon: data.beaufort.icon 
                  }]
                }/>
            <DataContainer title={data.wind_direction.title} value={data.wind_direction.value} icon={data.wind_direction.icon} />
            <DataContainer title={data.rain.title} value={data.rain.value} icon={data.rain.icon} />
            <DataContainer
              title={data.dewPoint.title}
              value={data.dewPoint.value}
              icon={data.dewPoint.icon} 
              additionalData={[
                {
                  title: data.saturationVaporPressure.title,
                  value: data.saturationVaporPressure.value,
                  icon: data.saturationVaporPressure.icon
                },
                {
                  title: data.vaporPressure.title,
                  value: data.vaporPressure.value,
                  icon: data.vaporPressure.icon
                }
              ]}
            />
          </div>
        </div>
      </Base>
      <div className="grid grid-cols-2 gap-2">
        {/* Sunset and Sunrise */}
        <Base className="lg:h-40 h-32 lg:p-2">
          <div className="lg:hidden h-full">
            <Carousel dotsClassName="lg:bottom-4 bottom-2 relative" slides={[
              <RiseAndSetComponent key={"sun"} className="relative lg:mt-9 mt-10 lg:scale-100 scale-75" riseTime={data.sun.riseTime} setTime={data.sun.setTime} currentTime={new Date()} type="sun"/>,
              <RiseAndSetComponent key={"moon"} className="relative lg:mt-9 mt-10 lg:scale-100 scale-75" riseTime={data.moon.riseTime} setTime={data.moon.setTime} currentTime={new Date()} type="moon"/>
            ]}/>
          </div>
          <div className="justify-evenly hidden lg:flex">
            <RiseAndSetComponent className="relative lg:scale-100 scale-75" riseTime={data.sun.riseTime} setTime={data.sun.setTime} currentTime={new Date()} type="sun"/>
            <RiseAndSetComponent className="relative lg:scale-100 scale-75" riseTime={data.moon.riseTime} setTime={data.moon.setTime} currentTime={new Date()} type="moon"/>
          </div>
        </Base>
        {/* Golden hour and moon phase */}
        <Base className="lg:h-40 h-32 lg:p-2">
          <div className="lg:hidden h-full">
            <Carousel dotsClassName="lg:bottom-4 bottom-2 relative" slides={[
              <MoonPhase key={"moonPhase"} date={new Date()} />,
              <GoldenHour key={"goldenHour"} date={data.goldenHour.begin + " - " + data.goldenHour.end} />
            ]}/>
          </div>
          <div className="justify-evenly hidden lg:flex h-full">
            <MoonPhase key={"moonPhase"} date={new Date()} />
            <GoldenHour date={data.goldenHour.begin + " - " + data.goldenHour.end} />
          </div>
        </Base>
      </div>
      <Base className="mb-8 p-4">
        <RecentHistory sunriseDate={data.sun.riseTime} sunsetDate={data.sun.setTime} />
      </Base>
    </Background>
  );
}