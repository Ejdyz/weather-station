"use client"
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {RadioGroup, Radio} from "@nextui-org/radio";
import {useState} from "react";


const MainChart = ({data,isForHistory }) => {
  const [selected, setSelected] = useState("Temperature");

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()-1).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
  const CustomTooltip =({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backdropFilter:"blur(5px)", padding:"15px", borderRadius:"5px", border: "1px white solid"}} >
          <p>{formatDate(payload[0].payload.createdAt)}</p>
          <p style={{color: `${payload[0].stroke}`}}>{`${payload[0].name} : ${payload[0].value} ${payload[0].unit}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className={` pb-4 md:w-[94vw] w-[calc(97vw)] text-white`}>
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
        <ResponsiveContainer width="100%" height={320} className={`md:translate-x-0 ${isForHistory && "-translate-x-3"}`} >
          <LineChart
            margin={!isForHistory?{bottom:7,right: 20, top:4,left: 10, }:{}}
            data={data}
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