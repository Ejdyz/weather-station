import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { DraftingCompass, CloudSun, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from 'next/link'
import { getLatestRecordFromHistoryAndStatus } from "@/lib/history";
import { formatWeatherData, apparentTemperature, dewPointTemperature} from "@/lib/utils";
import DateComponent from "@/components/ui/date";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Weather Station",
  description: "Temporary website for the weather station project",
}

export default async function Home() {
  const latestRecord = await getLatestRecordFromHistoryAndStatus()

  const data = [
  {
    name: "Teplota",
    data: formatWeatherData("temperature", latestRecord?.temperature),
  },
  {
    name: "Pocitová teplota",
    data: formatWeatherData("temperature", apparentTemperature(latestRecord?.temperature || 0, latestRecord?.humidity || 0, (latestRecord?.wind_speed || 0) * 3.6)),
  },
  {
    name: "Rosný bod",
    data: formatWeatherData("temperature", dewPointTemperature(latestRecord?.temperature || 0, latestRecord?.humidity || 0)),
  },
  {
    name: "Vlhkost",
    data: formatWeatherData("humidity", latestRecord?.humidity),
  },
  {
    name: "Tlak",
    data: formatWeatherData("pressure", latestRecord?.pressure),
  },
  {
    name: "Rychlost větru",
    data: formatWeatherData("wind_speed", latestRecord?.wind_speed),
  },
  {
    name: "Směr větru",
    data: formatWeatherData("wind_direction", latestRecord?.wind_direction),
  },
  {
    name: "Srážky",
    data: formatWeatherData("rain_mm", latestRecord?.rain_mm),
  },
  {
    name: "Čas",
    data: <DateComponent date={latestRecord?.created_at} />,
  }
]
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
                  <h1 className="text-xl font-semibold">Stránka je ve vývoji!</h1>
                </CardTitle>
                <CardDescription>
                  <br/>
                  V blízké době se můžete těšit na novou stránku, která přinese spoustu nových funkcí a vylepšení.
                  <br/><br/>
                  Po kliknutí na tlačítko Github se dostanete na repozitář, kde můžete sledovat vývoj projektu.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="relative z-10 my-5">
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex items-center">
                  <span className="text-lg font-medium">Plánované vylepšení:</span>
                </div>
                <ul className="list-disc ml-7 ">
                  <li>Nový design a uživatelské rozhraní</li>
                  <li>Nové senzory pro měření počasí</li>
                  <li>Lepší stabilita a spolehlivost</li>
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
                <h1 className="text-xl font-semibold">Dočasné zobrazení dat</h1>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <Table >
                <TableBody>
                  {data.map((data) => (
                    <TableRow key={data.name}>
                      <TableCell className="font-medium">{data.name}</TableCell>
                      <TableCell >{data.data}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </TabsContent>
          <CardFooter className="relative z-10 flex flex-col justify-center gap-2">
              <TabsList className="z-20 h-8 ">
                <TabsTrigger value="landing">Úvod</TabsTrigger>
                <TabsTrigger value="data">Data</TabsTrigger>
              </TabsList>
              <Button size="sm" className=" " asChild>
                <Link href="https://github.com/Ejdyz/weather-station" target="_blank" rel="noopener noreferrer">
                  <Github />Github
                </Link>
              </Button>
          </CardFooter>
        </Tabs>
      </Card>
    </div>
  );
}
