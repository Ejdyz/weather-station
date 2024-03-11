"use client"
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Checkbox} from "@nextui-org/react";
import {useState} from "react";

const MainChart = ({data}) => {
  const [isTempActive, setIsTempActive] = useState(true)
  const [isHumidityActive, setIsHumidityActive] = useState(true)
  const [isPressureActive, setIsPressureActive] = useState(true)
  const [isRainActive, setIsRainActive] = useState(true)


  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backdropFilter:"blur(5px)", padding:"15px", borderRadius:"5px", border: "1px white solid"}} >
          <p className="label text-white">{label}</p>
          {
            payload.map((item, index) => (
              <p key={index} style={{color: `${item.stroke}`}}>{`${item.name} : ${item.value} `}</p>
            ))
          }

        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="md:ml-[5vw] md:w-[90vw] w-[94vw] ">
        <div className="flex gap-x-4 md:w-full md:justify-start justify-evenly">
          <Checkbox className="text-white" color={"secondary"} isSelected={isTempActive} onChange={() => setIsTempActive(!isTempActive)}><span className="text-white">Teplota</span></Checkbox>
          <Checkbox className="text-white" color={"warning"} isSelected={isPressureActive} onChange={()=>setIsPressureActive(!isPressureActive)}><span className="text-white">Tlak</span></Checkbox>
          <Checkbox className="text-white" color={"danger"} isSelected={isHumidityActive} onChange={()=>setIsHumidityActive(!isHumidityActive)}><span className="text-white">Vlhkost</span></Checkbox>
          <Checkbox className="text-white" color="success" isSelected={isRainActive} onChange={()=>setIsRainActive(!isRainActive)}><span className="text-white">Déšť</span></Checkbox>
        </div>
        <ResponsiveContainer width="100%" height={300} >
          <LineChart
            data={data}
          >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis  stroke="#FFF" dataKey="time"/>
            <YAxis stroke="#FFF" domain={['auto', 'auto']}></YAxis>
            <Tooltip content={<CustomTooltip/>}/>
            <Legend/>
            {isTempActive?(<Line type="monotone" name={"Teplota"} dataKey={"temperature"} stroke={"#ffcd25"}/>):(<> </>)}
            {isHumidityActive?(<Line type="monotone" name={"Vlhkost"} dataKey={"humidity"} stroke={"#99e513"}/>):(<> </>)}
            {isPressureActive?(<Line type="monotone" name={"Tlak"} dataKey={"pressure"} stroke={"#ff5757"}/>):(<> </>)}
            {isRainActive?(<Line type="monotone" name={"Déšť"} dataKey={"rain"} stroke={"#87d5ff"}/>):(<> </>)}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default MainChart;