"use client"
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const MainChart = ({data}) => {

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backdropFilter:"blur(5px)", padding:"15px", borderRadius:"5px", border: "1px white solid"}} >
          <p className="label text-white">{label}</p>
          <p style={{color: `${payload[0].stroke}`}}>{`${payload[0].name} : ${payload[0].value} `}</p>
          <p style={{color: `${payload[1].stroke}`}}>{`${payload[1].name} : ${payload[1].value} `}</p>
          <p style={{color: `${payload[2].stroke}`}}>{`${payload[2].name} : ${payload[2].value} `}</p>
          <p style={{color: `${payload[3].stroke}`}}>{`${payload[3].name} : ${payload[3].value} `}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
        <div className="md:ml-[5vw] md:w-[90vw] w-[94vw]">
          <ResponsiveContainer width="100%" height={300} >
            <LineChart
              data={data}
            >
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis  stroke="#FFF" dataKey="time"/>
              <YAxis stroke="#FFF"></YAxis>
              <Tooltip content={<CustomTooltip/>}/>
              <Legend/>
              <Line type="monotone" name={"Teplota"} dataKey={"temperature"} stroke={"#F5FF20FF"}/>
              <Line type="monotone" name={"Vlhkost"} dataKey={"humidity"} stroke={"#00FF00"}/>
              <Line type="monotone" name={"Tlak"} dataKey={"pressure"} stroke={"#ff5757"}/>
              <Line type="monotone" name={"Déšť"} dataKey={"rain"} stroke={"#87d5ff"}/>
            </LineChart>
            </ResponsiveContainer>
          </div>

    </>
  );
};

export default MainChart;