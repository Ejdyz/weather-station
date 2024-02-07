import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import {
  CleanNightIcon,
  ClearDayIcon,
  ClearDayIconStatic,
  CloudyIcon,
  DrizzleIcon,
  DrizzleIconStatic,
  MoonriseIcon,
  MoonsetIcon,
  NewMoonIcon,
  PartlyCloudyDayDrizzleIcon,
  PartlyCloudyDayIcon,
  PartlyCloudyDayIconStatic,
  PartlyCloudyNightDrizzleIcon,
  PartlyCloudyNightIcon,
  PartlyCloudyNightRainIcon,
  RaindropsIcon,
  RaindropsIconStatic,
  RainingIcon,
  RainingIconStatic,
  SnowingIcon,
  SnowingIconStatic,
  SunriseIcon,
  SunsetIcon,
} from "@/components/icons/Icons";

export function VercelTable({data}) {
  return (
    (<div className=" w-full overflow-auto rounded-xl align-middle ">
      <Table>
        <TableHeader className="w-full">
          <TableRow>
            <TableHead className="sticky left-0 bg-white text-black ">Data</TableHead>
            {data.map((item, index) => (
              <TableHead className="text-black bg-gray-100 md:min-w-28 min-w-28" key={index}>{item?.day?.getDate() + "-" + item?.day?.getMonth() + 1 }</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="sticky left-0 bg-white  text-black">Oblačnost</TableCell>
            {data.map((item, index) => (
              <TableHead className="text-black bg-gray-100 " key={index}><div className="max-w-20"><SnowingIconStatic /></div></TableHead>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="sticky left-0 bg-white  text-black">Humidty</TableCell>
            {data.map((item, index) => (
              <TableHead className="text-black bg-gray-100 " key={index}>{item.highestHumidity + " / " + item.lowestHumidity }</TableHead>
            ))}
          </TableRow>
           <TableRow>
            <TableCell className="sticky left-0 bg-white  text-black">Temperature</TableCell>
            {data.map((item, index) => (
                <TableHead className="text-black bg-gray-100 " key={index}>{item.highestTemperature + " / " + item.lowestTemperature }</TableHead>
            ))}
          </TableRow>
           <TableRow>
            <TableCell className="sticky left-0 bg-white  text-black">Pressure</TableCell>
            {data.map((item, index) => (
                <TableHead className="text-black bg-gray-100 " key={index}>{item.highestPressure + " / " + item.lowestPressure }</TableHead>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>)
  );
}
