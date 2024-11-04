"use client"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import {ArrowUpIcon, ArrowDown} from "lucide-react";
import TableIcon from "@/components/tables/TableIcon";

export function WeatherTable({data}) {
  return (
    (<div className=" w-full overflow-auto rounded-xl align-middle ">
      <Table>
        <TableHeader className="w-full">
          <TableRow>
            <TableHead className="sticky left-0 bg-white text-black ">Datum</TableHead>
            {data.map((item, index) => {
              const date = new Date(item.day)
              return(
              <TableHead
                className={"text-black bg-gray-100 text-center " + (data.length <=7? data.length === index+1?"md:min-w-32 min-w-28":"md:min-w-48 min-w-28" : data.length <=10?"min-w-32":"min-w-28")}
                key={index}>
                {date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()}
              </TableHead>
            )})}
            {data.length === 0 && <TableHead className="text-black bg-gray-100 w-11/12"></TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="sticky left-0 bg-white text-center text-black">Oblačnost</TableCell>
            {data.map((item, index) => (
              <TableHead className="text-black bg-gray-100 " key={index}>
                <div className="flex flex-row justify-center align-middle ">
                  <TableIcon data={item}/>
                </div>
              </TableHead>
            ))}
            {data.length === 0 && <TableHead className="text-black bg-gray-100 w-11/12"></TableHead>}
          </TableRow>
           <TableRow>
            <TableCell className="sticky left-0 bg-white text-center text-black ">Teplota <br/><span className="text-gray-300">(°C)</span></TableCell>
             {data.map((item, index) => (
               <TableHead className="text-black bg-gray-100 " key={index}>
                  <span className="flex flex-row justify-center align-middle">
                    <ArrowUpIcon size={20} stroke="Crimson"/>
                    { item.highestTemperature}/{item.lowestTemperature}
                    <ArrowDown size={20} stroke="DeepSkyBlue"/>
                  </span>
                </TableHead>
              ))}
              {data.length === 0 && <TableHead className="text-black bg-gray-100 w-11/12 text-center">Žádná data k zobrazení</TableHead>}
          </TableRow>
          <TableRow>
            <TableCell className="sticky left-0 bg-white text-center text-black">Vlhkost <br/><span className="text-gray-300">(%)</span></TableCell>
            {data.map((item, index) => (
              <TableHead className="text-black bg-gray-100 " key={index}>
                <span className="flex flex-row justify-center align-middle">
                  <ArrowUpIcon size={20} stroke="Crimson"/>
                   {item.highestHumidity}/{item.lowestHumidity}
                  <ArrowDown size={20} stroke="DeepSkyBlue"/>
                </span>
              </TableHead>
            ))}
            {data.length === 0 && <TableHead className="text-black bg-gray-100 w-11/12"></TableHead>}
          </TableRow>
           <TableRow>
            <TableCell className="sticky left-0 bg-white text-center text-black">Tlak <br/><span className="text-gray-300">(hPa)</span></TableCell>
            {data.map((item, index) => (
              <TableHead className="text-black bg-gray-100 " key={index}>
                <span className="flex flex-row justify-center align-middle">
                  <ArrowUpIcon size={20} stroke="Crimson"/>
                  {item.highestPressure}/{item.lowestPressure}
                  <ArrowDown size={20} stroke="DeepSkyBlue"/>
                </span>
              </TableHead>
            ))}
            {data.length === 0 && <TableHead className="text-black bg-gray-100 w-11/12"></TableHead>}
          </TableRow>
        </TableBody>
      </Table>
    </div>)
  );
}
