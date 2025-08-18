import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { DraftingCompass, CloudSun, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { getLatestRecordFromHistoryAndStatus } from "@/lib/history";
import { formatWeatherData, apparentTemperature, dewPointTemperature } from "@/lib/utils";
import DateComponent from "@/components/ui/date";
import { getTranslator } from "@/lib/server-dictionary";
import type { TranslationPath } from '@/dictionaries/types';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const { t } = await getTranslator();
  
  const planned = t('landing.planned_list' as TranslationPath) as string[];
  const latestRecord = await getLatestRecordFromHistoryAndStatus();

  const data = [
    { key: 'temperature', value: formatWeatherData('temperature', latestRecord?.temperature) },
    { key: 'apparent', value: formatWeatherData('temperature', apparentTemperature(latestRecord?.temperature || 0, latestRecord?.humidity || 0, (latestRecord?.wind_speed || 0) * 3.6)) },
    { key: 'dew_point', value: formatWeatherData('temperature', dewPointTemperature(latestRecord?.temperature || 0, latestRecord?.humidity || 0)) },
    { key: 'humidity', value: formatWeatherData('humidity', latestRecord?.humidity) },
    { key: 'pressure', value: formatWeatherData('pressure', latestRecord?.pressure) },
    { key: 'wind_speed', value: formatWeatherData('wind_speed', latestRecord?.wind_speed) },
    { key: 'wind_direction', value: formatWeatherData('wind_direction', latestRecord?.wind_direction) },
    { key: 'rain', value: formatWeatherData('rain_mm', latestRecord?.rain_mm) },
    { key: 'time', value: <DateComponent date={latestRecord?.created_at} /> },
  ];

  return (
    <div className="min-h-[100dvh] flex h-full justify-center md:items-center items-start ">
      <Card className="md:w-96 w-full min-h-56 md:h-auto h-[100dvh] overflow-hidden relative border-sky-200 md:scale-125 gap-2">
        <div className="absolute size-96 text-[350px] text-right italic font-bold text-sky-200 -ml-22 md:mt-20 mt-40 blur-sm opacity-100">
          V2
        </div>
        <Tabs defaultValue="landing" className="z-10" orientation="horizontal">
          <TabsContent value="landing" className="w-full">
            <CardHeader className="relative z-10 px-4 gap-6">
              <div className="flex items-end justify-center mb-2 w-full">
                <CloudSun className="size-15" />
              </div>
              <div>
                <CardTitle className="flex gap-1">
                  <DraftingCompass className="inline" />
                  <h1 className="text-xl font-semibold">{t('landing.title')}</h1>
                </CardTitle>
                <CardDescription>
                  <br />
                  {t('landing.body1')}
                  <br /><br />
                  {t('landing.body2')}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="relative z-10 my-5">
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex items-center">
                  <span className="text-lg font-medium">{t("landing.planned")}</span>
                </div>
                <ul className="list-disc ml-7 ">
                  {planned.map((item: string) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </CardContent>
          </TabsContent>
          <TabsContent value="data">
            <CardHeader className="relative z-10 px-4">
              <div className="flex items-end justify-center mb-2 w-full">
                <CloudSun className="size-15" />
              </div>
              <CardTitle className="flex pb-2">
                <h1 className="text-xl font-semibold">{t('landing.data_title')}</h1>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <Table>
                <TableBody>
                  {data.map(d => (
                    <TableRow key={d.key}>
                      <TableCell className="font-medium">{t("data")[d.key]}</TableCell>
                      <TableCell>{d.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </TabsContent>
          <CardFooter className="relative z-10 flex flex-col justify-center gap-2">
            <TabsList className="z-20 h-8 ">
              <TabsTrigger value="landing">{t('landing.tab_landing')}</TabsTrigger>
              <TabsTrigger value="data">{t('landing.tab_data')}</TabsTrigger>
            </TabsList>
            <Button size="sm" className=" " asChild>
              <Link href="https://github.com/Ejdyz/weather-station" target="_blank" rel="noopener noreferrer">
                <Github />{t('landing.github')}
              </Link>
            </Button>
          </CardFooter>
        </Tabs>
      </Card>
    </div>
  );
}