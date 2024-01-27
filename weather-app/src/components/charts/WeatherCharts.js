"use client"
import MyChart from "@/components/charts/MyChart";
const WeatherCharts = ( {data}) => {

  return (
    <>
      <MyChart data={data} forWhat="temperature"/>
      <MyChart data={data} forWhat="humidity"/>
      <MyChart data={data} forWhat="pressure"/>
      <MyChart data={data} forWhat="rain"/>
    </>
  );
};

export default WeatherCharts;