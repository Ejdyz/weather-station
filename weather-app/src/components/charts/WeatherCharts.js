"use client"
import MyChart from "@/components/charts/MyChart";
import MainChart from "@/components/main/MainChart";
const WeatherCharts = ( {data, loading}) => {

  return (
    <>
      <MainChart data={data} forWhat="temperature" loading={loading}/>
      <MainChart data={data} forWhat="humidity" loading={loading}/>
      <MainChart data={data} forWhat="pressure" loading={loading}/>
      <MainChart data={data} forWhat="rain" loading={loading}/>
    </>
  );
};

export default WeatherCharts;