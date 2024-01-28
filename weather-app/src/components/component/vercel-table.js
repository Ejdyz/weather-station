import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"

export function VercelTable({data}) {
  console.log(data)
  return (
    (<div className=" w-full h-[500px] overflow-auto rounded-xl ">
      <Table>
        <TableHeader className="w-40">
          <TableRow>
            <TableHead className="sticky left-0 bg-white text-black w-96">Data</TableHead>
            {data.map((item, index) => (
              <TableHead className="text-black bg-gray-100 min-w-44" key={index}>{item?.day?.getDate() + "-" + item?.day?.getMonth() + 1 }</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="sticky left-0 bg-white  text-black">Humidty</TableCell>
            {data.map((item, index) => (
              <TableHead className="text-black bg-gray-100 " key={index}>{item.highestHumidity + " / " + item.lowestHumidity + 1 }</TableHead>
            ))}
          </TableRow>
           <TableRow>
            <TableCell className="sticky left-0 bg-white  text-black">Temperature</TableCell>
            {data.map((item, index) => (
                <TableHead className="text-black bg-gray-100 " key={index}>{item.highestTemperatrue + " / " + item.lowestTemperatrue + 1 }</TableHead>
            ))}
          </TableRow>
           <TableRow>
            <TableCell className="sticky left-0 bg-white  text-black">Pressure</TableCell>
            {data.map((item, index) => (
                <TableHead className="text-black bg-gray-100 " key={index}>{item.highestTemperatrue + " / " + item.lowestTemperatrue + 1 }</TableHead>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>)
  );
}
