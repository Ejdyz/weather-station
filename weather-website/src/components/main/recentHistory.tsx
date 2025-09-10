import {
  Dialog,
  DialogPortal,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { getHistoryRecordsWithSpace } from '@/lib/history'
import { getTranslator } from "@/lib/server-dictionary";
import { getIconSrcFromWeatherData, formatTimeNumericShort, formatDateToDisplayNumericFull, formatWeatherData, dewPointTemperature } from '@/lib/utils';
import Image from "next/image";
import DateComponent from "@/components/ui/date";

const now = new Date();
const defaultSunsetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 0);
const defaultSunriseDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0);


export default async function RecentHistory({sunsetDate = defaultSunsetDate, sunriseDate = defaultSunriseDate}: {sunsetDate: Date, sunriseDate: Date}) {
  const { t } = await getTranslator();

  const historyData = await getHistoryRecordsWithSpace(48, 30)

  function HistoryItem({record}: {record: typeof historyData[number]}) {
    const wind_direction = t('data.wind_direction_cardinal') as Record<string, string>;
    const beaufort = t('data.beaufort_description') as string[];
    const skyCondition = t('data.sky_conditions') as Record<string, string>;

    const partOfTheDay = record.recorded_at >= sunriseDate && record.recorded_at <= sunsetDate ? "day" : "night";

    const weatherCondition = getIconSrcFromWeatherData(
      record.pressure || 0, 
      record.humidity || 0, 
      record.temperature || 0, 
      record.wind_speed || 0,
      record.rain_mm || 0,
      partOfTheDay
    )

      const data = [
      {
        name: t("data.temperature"),
        data: formatWeatherData("temperature", record?.temperature),
      },
      {
        name: t("data.apparent"),
        data: formatWeatherData("temperature", record?.app_temperature),
      },
      {
        name: t("data.dew_point"),
        data: formatWeatherData("temperature", dewPointTemperature(record?.temperature || 0, record?.humidity || 0)),
      },
      {
        name: t("data.humidity"),
        data: formatWeatherData("humidity", record?.humidity),
      },
      {
        name: t("data.pressure"),
        data: formatWeatherData("pressure", record?.pressure),
      },
      {
        name: t("data.pressure_at_sea_level"),
        data: formatWeatherData("pressure", record.pressure_at_sea_level),
      },
      {
        name: t("data.saturation_vapor_pressure"),
        data: formatWeatherData("pressure", record.saturation_vapor_pressure),
      },
      {
        name: t("data.vapor_pressure"),
        data: formatWeatherData("pressure", record.vapor_pressure),
      },
      {
        name: t("data.wind_speed"),
        data: formatWeatherData("wind_speed_ms", record?.wind_speed) + " (" + formatWeatherData("wind_speed_kmh", record?.wind_speed) + ")",
      },
      {
        name: t("data.wind_direction"),
        data: wind_direction[formatWeatherData("wind_direction", record?.wind_direction) as keyof typeof wind_direction],
      },
      {
        name: t("data.beaufort"),
        data: beaufort[record?.beaufort || 0] + " (" + record?.beaufort + ". " + t("data.beaufort_number") + ")",
      },
      {
        name: t("data.max_wind_speed"),
        data: formatWeatherData("wind_speed_ms", record?.max_wind_speed) + " (" + formatWeatherData("wind_speed_kmh", record?.max_wind_speed) + ")",
      },
      {
        name: t("data.rain"),
        data: formatWeatherData("rain_mm", record?.rain_mm),
      },
      {
        name: t("data.sky_condition"),
        data: skyCondition[record?.sky_condition_description.replace(" ", "_").toLowerCase()] || "unknown",
      },
    ]

    return (
      <Dialog>
        <DialogTrigger>      
          <div className='text-center text-white min-w-18 max-w-20 select-none cursor-pointer'>
            <p><DateComponent date={record.recorded_at} type="time_short_numeric" /></p>
            <Image width={100}  height={100}  src={weatherCondition} alt={"Weather Icon"} className='w-full h-auto' />
            <p className='font-semibold '>{record.temperature}°C</p>
          </div>
        </DialogTrigger>
        <DialogPortal>
          <DialogContent className="overflow-auto">
          <DialogTitle>{formatDateToDisplayNumericFull(record.recorded_at)}</DialogTitle>
            <Table >
              <TableBody className="text-left">
                {data.map((data) => (
                  <TableRow key={data.name}>
                    <TableCell className="font-medium">{data.name}</TableCell>
                    <TableCell >{data.data}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    )
  }

  return (
    <div className='w-full flex flex-row-reverse gap-2 overflow-auto hover-scrollbar animate-all duration-200 '>
      {historyData.map(record => (
        <HistoryItem key={record.recorded_at.toString()} record={record} />
      ))}
    </div>
  )
}
