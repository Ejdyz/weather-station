"use client"
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {RadioGroup, Radio} from "@nextui-org/radio";
import {useState} from "react";
import {ArrowUpIcon, ArrowDown, CircleSlash2} from "lucide-react";


const MainChart = ({data,isForHistory }) => {
  const [selected, setSelected] = useState("Temperature");

  console.log(data)

  const getAverageValue = (data, key) => {
    if (isForHistory && key === "Temperature") {
      return data?.data?.temperature?.average.toFixed(2) + "°C"
    }
    if (isForHistory && key === "Humidity") {
      return data?.data?.humidity?.average.toFixed(2) + "%"
    }
    if (isForHistory && key === "Pressure") {
      return data?.data?.pressure?.average.toFixed(2) + "hPa"
    }
    if (isForHistory && key === "Rain") {
      return data?.data?.rain?.average.toFixed(2) + "%"
    }
    return 0;
  }
  const getHighestValue = (data, key) => {
    if (isForHistory && key === "Temperature") {
      return data?.data?.temperature?.highest + "°C"
    }
    if (isForHistory && key === "Humidity") {
      return data?.data?.humidity?.highest+ "%"
    }
    if (isForHistory && key === "Pressure") {
      return data?.data?.pressure?.highest+ "hPa"
    }
    if (isForHistory && key === "Rain") {
      return data?.data?.rain?.highest+ "%"
    }
    return 0;
  }
  const getLowestValue = (data, key) => {
    if (isForHistory && key === "Temperature") {
      return data?.data?.temperature?.lowest+ "°C"
    }
    if (isForHistory && key === "Humidity") {
      return data?.data?.humidity?.lowest+ "%"
    }
    if (isForHistory && key === "Pressure") {
      return data?.data?.pressure?.lowest + "hPa"
    }
    if (isForHistory && key === "Rain") {
      return data?.data?.rain?.lowest+ "%"
    }
    return 0;
  }

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  const CustomTooltip =({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backdropFilter:"blur(5px)", padding:"15px", borderRadius:"5px", border: "1px white solid"}} >
          <p>{formatDate(new Date(payload[0].payload.time))}</p>
          <p style={{color: `${payload[0].stroke}`}}>{`${payload[0].name} : ${payload[0].value} ${payload[0].unit}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className={`pb-4 md:w-[94vw] w-[calc(97vw)] text-white`}>
        <div className="flex w-full md:flex-row flex-col gap-2 justify-between mb-2">
          <RadioGroup
            orientation="horizontal"
            onValueChange={setSelected}
            defaultValue={"Temperature"}
            className="ml-[5vw]"
            >
            <Radio value="Temperature" color="secondary"><h4 className="text-white">Teplota</h4></Radio>
            <Radio value="Humidity" color={"danger"}><h4 className="text-white">Vlhkost</h4></Radio>
            <Radio value="Pressure" color={"warning"}><h4 className="text-white">Tlak</h4></Radio>
            <Radio value="Rain" color={"success"}><h4 className="text-white">Déšť</h4></Radio>
          </RadioGroup>
          {isForHistory &&
            <div className="flex gap-2 ml-[5vw] md:justify-start justify-evenly">
              <div className="flex items-center gap-1"><ArrowUpIcon size={20} stroke="Crimson"/>{getHighestValue(data, selected)}</div>
              <div className="flex items-center gap-1"><CircleSlash2 size={17} />{getAverageValue(data, selected)}</div>
              <div className="flex items-center gap-1"><ArrowDown size={20} stroke="DeepSkyBlue"/>{getLowestValue(data, selected)}</div>
            </div>  
          }
        </div>
        <ResponsiveContainer width="100%" height={320} className={`md:translate-x-0 ${isForHistory && "-translate-x-3"}`} >
          <LineChart
            margin={!isForHistory?{bottom:7,right: 20, top:4,left: 10, }:{}}
            data={isForHistory? data.records : data}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={!isForHistory}/>
            {!isForHistory && <XAxis stroke="#FFF" dataKey="formatedTime" angle={-45} orientation={"bottom"}  tickSize={14}  />}
            <YAxis stroke="#FFF" domain={!isForHistory?[ "dataMin", "dataMax"]:["auto","auto"]} ></YAxis>
            <Tooltip content={<CustomTooltip/>}/>
            <Line
              type="monotone"
              name={
                selected==="Temperature" && "Teplota"||
                selected==="Humidity" && "Vlhkost"||
                selected==="Pressure" && "Tlak"|| "Déšť"
              }
              dataKey={selected.toLowerCase()}
              dot={!isForHistory}
              stroke={
                selected==="Temperature"? "#ffcd25":
                  selected==="Humidity"?"#99e513":
                    selected==="Pressure"?"#ff5757":"#87d5ff"
              }
              unit={
                selected==="Temperature"? "°C":
                  selected==="Humidity"?"%":
                    selected==="Pressure"?"hPa":"%"
              }
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default MainChart;