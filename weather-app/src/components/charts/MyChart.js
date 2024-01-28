"use client"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {Spinner} from "@nextui-org/spinner";

//fetching data from api


const CustomTooltip = ({ active, payload, label, forWhat }) => {
  if (active && payload && payload.length) {
  const attribute = forWhat==="temperature"? "°C" : forWhat==="humidity"?"%": forWhat==="pressure"?"hPa":"%"
    return (
      <div className="custom-tooltip" style={{ backdropFilter:"blur(5px)", padding:"15px", borderRadius:"5px", border: "1px darkgray solid"}} >
        <p className="label">{label}</p>
        <p style={{color: `${payload[0].stroke}`}}>{`${payload[0].dataKey} : ${payload[0].value} ` + attribute}</p>
      </div>
    );
  }
  return null;
};

export default function App({data,forWhat, loading}) {

  return (
    <>
      <div className={"grid justify-center"}>
        {loading? (
          <div className="w-full h-[300px] grid  justify-center ">
            <Spinner size="lg"/>
          </div>
        ) :(
          <div className="overflow-y-hidden" style={{marginTop:"10px",width: "100%",}}>
            <LineChart
              width={1300}
              height={300}
              data={data}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis ></YAxis>
              <Tooltip content={<CustomTooltip forWhat={forWhat}/>}/>
              <Legend />
              <Line type="monotone" dataKey={forWhat} stroke={forWhat==="temperature"? "#F5FF20FF" : forWhat==="humidity"?"#00FF00": forWhat==="pressure"?"#FF0000":"#006ae5"} />
            </LineChart>
          </div>)}
      </div>
    </>
  );

}
