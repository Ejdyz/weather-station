"use client"
import MyTable from "@/components/tables/MyTable";

const WeatherTables = ({data, loading}) => {
  return (
    <>
      <MyTable data={data} forWhat="temperature" loading={loading}/>
      <MyTable data={data} forWhat="humidity" loading={loading}/>
      <MyTable data={data} forWhat="pressure" loading={loading}/>
      <MyTable data={data} forWhat="rain" loading={loading}/>
    </>
  );
};

export default WeatherTables;