"use client"
import MyChart from "@/components/charts/MyChart";
const WeatherCharts = ( {data, loading}) => {

  return (
    <>
      <MyChart data={data} forWhat="temperature" loading={loading}/>
      <MyChart data={data} forWhat="humidity" loading={loading}/>
      <MyChart data={data} forWhat="pressure" loading={loading}/>
      <MyChart data={data} forWhat="rain" loading={loading}/>
    </>
  );
};

export default WeatherCharts;