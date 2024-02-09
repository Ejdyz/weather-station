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

//TODO add responsive contianer

const CustomTooltip = ({ active, payload, label, forWhat }) => {
  if (active && payload && payload.length) {
  const attribute = forWhat==="temperature"? "°C" : forWhat==="humidity"?"%": forWhat==="pressure"?"hPa":"%"
    return (
      <div className="custom-tooltip"
           style={{backdropFilter: "blur(5px)", padding: "15px", borderRadius: "5px", border: "1px white solid"}}>
        <p className="label text-white">{label}</p>
        <p style={{color: `${payload[0].stroke}`}}>{`${payload[0].name} : ${payload[0].value} ` + attribute}</p>
      </div>
    );
  }
  return null;
};

export default function App({data, forWhat, loading}) {

  return (
    <>
      <div className={"grid justify-center"}>
        {loading ? (
          <div className="md:w-[1300px] w-screen h-[300px] grid  justify-center ">
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
              <XAxis stroke="#fff" dataKey="day" />
              <YAxis stroke="#fff" />
              <Tooltip content={<CustomTooltip forWhat={forWhat}/>}/>
              <Legend />
              <Line type="monotone" name={forWhat==="temperature"? "Teplota" : forWhat==="humidity"?"Vlhkost": forWhat==="pressure"?"Tlak":"Déšť"}  dataKey={forWhat} stroke={forWhat==="temperature"? "#F5FF20FF" : forWhat==="humidity"?"#00FF00": forWhat==="pressure"?"#ff5757":"#87d5ff"} />
            </LineChart>
          </div>)}
      </div>
    </>
  );

}
