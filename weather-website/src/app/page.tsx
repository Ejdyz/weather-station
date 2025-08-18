import { Slider } from "@/components/ui/slider";
import { getLatestRecordFromHistoryAndStatus } from "@/lib/history";
import { formatWeatherData, apparentTemperature, dewPointTemperature, skyCondition, convertDirectionToCardinalString } from "@/lib/utils";
import DateComponent from "@/components/ui/date";
import { getTranslator } from "@/lib/server-dictionary";

export const dynamic = 'force-dynamic';

export default async function Page() {
  const { t } = await getTranslator();

  const wind_direction = t('data.wind_direction_cardinal') as Record<string, string>;
  const latestRecord = await getLatestRecordFromHistoryAndStatus();

  const data = [
    { title: "data.sky_condition", key: 'sky_condition', value: skyCondition(latestRecord?.pressure || 0, latestRecord?.humidity || 0, latestRecord?.temperature || 0, latestRecord?.wind_speed || 0) },
    { title: "data.temperature", key: 'temperature', value: formatWeatherData('temperature', latestRecord?.temperature) },
    { title: "data.apparent", key: 'apparent', value: formatWeatherData('temperature', apparentTemperature(latestRecord?.temperature || 0, latestRecord?.humidity || 0, (latestRecord?.wind_speed || 0) * 3.6)) },
    { title: "data.dew_point", key: 'dew_point', value: formatWeatherData('temperature', dewPointTemperature(latestRecord?.temperature || 0, latestRecord?.humidity || 0)) },
    { title: "data.humidity", key: 'humidity', value: formatWeatherData('humidity', latestRecord?.humidity) },
    { title: "data.pressure", key: 'pressure', value: formatWeatherData('pressure', latestRecord?.pressure) },
    { title: "data.wind_speed", key: 'wind_speed', value: formatWeatherData('wind_speed', latestRecord?.wind_speed) },
    { title: "data.wind_direction", key: 'wind_direction', value: wind_direction[convertDirectionToCardinalString(latestRecord?.wind_direction || 0)] },
    { title: "data.rain", key: 'rain', value: formatWeatherData('rain_mm', latestRecord?.rain_mm) },
    { title: "data.time", key: 'time', value: <DateComponent date={latestRecord?.created_at} /> },
  ];

  return (
    <div className="min-h-[100dvh] flex h-full justify-center md:items-center items-start bg-gradient-to-b from-sky-950 to-blue-500">
      <div className="md:w-96 w-full min-h-56 md:h-auto h-[100dvh] overflow-hidden relative border-sky-200 md:scale-125 gap-2">
        <div className="rounded-md bg-white/30 bg-opacity-0 p-2">
          <Slider slides={
            data.map(item => (
              <div key={item.key} className="p-14">
                <h3 className="text-lg font-semibold">{t(item.title)}</h3>
                <p className="text-sm">{item.value}</p>
              </div>
            ))
          } />
        </div>
      </div>
    </div>
  );
}