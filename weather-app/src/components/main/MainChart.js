"use client"
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {RadioGroup, Radio} from "@nextui-org/radio";
import {useState} from "react";


const MainChart = ({data,days,isForHistory}) => {
  const [selected, setSelected] = useState("Temperature");

  function distributeObjects(totalLength, numObjects) {
    const step = Math.floor(totalLength / numObjects);
    const positions = [];

    for (let i = 0; i < numObjects; i++) {
      positions.push(i * step);
    }

    positions.push(totalLength); // Add the last position
    return positions;
  }
  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
  const CustomTooltip =({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backdropFilter:"blur(5px)", padding:"15px", borderRadius:"5px", border: "1px white solid"}} >
          <p>{formatDate(payload[0].payload.createdAt)}</p>
          <p style={{color: `${payload[0].stroke}`}}>{`${payload[0].name} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className={`${!isForHistory && "md:ml-[5vw]"} md:w-[90vw] w-[94vw] text-white`}>
        <RadioGroup
          orientation="horizontal"
          onValueChange={setSelected}
          defaultValue={"Temperature"}

        >
          <Radio value="Temperature" color="secondary"><h4 className="text-white">Teplota</h4></Radio>
          <Radio value="Humidity" color={"danger"}><h4 className="text-white">Vlhkost</h4></Radio>
          <Radio value="Pressure" color={"warning"}><h4 className="text-white">Tlak</h4></Radio>
          <Radio value="Rain" color={"success"}><h4 className="text-white">Déšť</h4></Radio>
        </RadioGroup>
        <ResponsiveContainer width="100%" height={300} >
          <LineChart
            data={data}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={!isForHistory}/>
            {!isForHistory && <XAxis stroke="#FFF" dataKey="time"/>}
            <YAxis stroke="#FFF" domain={['auto', 'auto']}></YAxis>
            <Tooltip content={<CustomTooltip/>}/>
            <Legend/>
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
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default MainChart;