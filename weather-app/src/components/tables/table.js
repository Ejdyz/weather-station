"use client"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import {ArrowUpIcon, ArrowDown} from "lucide-react";
import TableIcon from "@/components/tables/TableIcon";

export function Table({data}) {
  return (
    (<div className=" w-full overflow-auto rounded-xl align-middle ">
      <Table>
        <TableHeader className="w-full">
          <TableRow>
            <TableHead className="sticky left-0 bg-white text-black ">Datum</TableHead>
            {data.map((item, index) => (
              <TableHead
                className={"text-black bg-gray-100 text-center " + (data.length <=7? data.length === index+1?"md:min-w-32 min-w-28":"md:min-w-48 min-w-28" : data.length <=10?"min-w-32":"min-w-28")}
                key={index}>
                {item?.day?.getDate() + "/" + (item?.day?.getMonth() + 1) + "/" + item?.day?.getFullYear()}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="sticky left-0 bg-white  text-black">Oblačnost</TableCell>
            {data.map((item, index) => (
              <TableHead className="text-black bg-gray-100 " key={index}>
                <div className="flex flex-row justify-center align-middle ">
                  <TableIcon light={item.highestLight} raining={item.highestRaining} lowestTemp={item.lowestTemperature} />
                </div>
              </TableHead>
            ))}
          </TableRow>
           <TableRow>
            <TableCell className="sticky left-0 bg-white  text-black">Teplota <span className="text-gray-300">°C</span></TableCell>
             {data.map((item, index) => (
               <TableHead className="text-black bg-gray-100 " key={index}>
                  <span className="flex flex-row justify-center align-middle">
                    <ArrowUpIcon size={20} stroke="Crimson"/>
                    { item.highestTemperature}/{item.lowestTemperature}
                    <ArrowDown size={20} stroke="DeepSkyBlue"/>
                  </span>
           </TableHead>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="sticky left-0 bg-white  text-black">Vlhkost <span className="text-gray-300">%</span></TableCell>
            {data.map((item, index) => (
              <TableHead className="text-black bg-gray-100 " key={index}>
                <span className="flex flex-row justify-center align-middle">
                  <ArrowUpIcon size={20} stroke="Crimson"/>
                   {item.highestHumidity}/{item.lowestHumidity}
                  <ArrowDown size={20} stroke="DeepSkyBlue"/>
                </span>
              </TableHead>
            ))}
          </TableRow>
           <TableRow>
            <TableCell className="sticky left-0 bg-white  text-black">Tlak <span className="text-gray-300">hPa</span></TableCell>
            {data.map((item, index) => (
              <TableHead className="text-black bg-gray-100 " key={index}>
                <span className="flex flex-row justify-center align-middle">
                  <ArrowUpIcon size={20} stroke="Crimson"/>
                  { item.lowestPressure}/{item.highestPressure}
                  <ArrowDown size={20} stroke="DeepSkyBlue"/>
                </span>
              </TableHead>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>)
  );
}
