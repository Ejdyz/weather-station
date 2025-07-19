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

export const metadata = {
  title: "Weather Station",
  description: "Temporary website for the weather station project",
}

const invoices = [
  {
    invoice: "Teplota",
    paymentStatus: "30 °C",
  },
  {
    invoice: "Vlhkost",
    paymentStatus: "70 %",
  },
  {
    invoice: "Tlak",
    paymentStatus: "1013 hPa",
  },
  {
    invoice: "Rychlost větru",
    paymentStatus: "10 m/s",
  },
  {
    invoice: "Směr větru",
    paymentStatus: "Jihozápad",
  },
  {
    invoice: "Srážky",
    paymentStatus: "0.5 mm",
  },
  {
    invoice: "Čas",
    paymentStatus: "2025-01-01 00:00:00",
  }
]


export default function Home() {
  return (
    <div className="min-h-[100dvh] flex h-full justify-center md:items-center items-start md:mt-0 mt-20">
      <Card className="w-96 min-h-56 overflow-hidden relative border-sky-200 scale-125 gap-2">
        <div className="absolute size-96 text-[350px] text-right italic font-bold text-sky-200 -ml-22 mt-20 blur-sm opacity-100">
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
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                      <TableCell className="font-medium">{invoice.invoice}</TableCell>
                      <TableCell >{invoice.paymentStatus}</TableCell>
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
