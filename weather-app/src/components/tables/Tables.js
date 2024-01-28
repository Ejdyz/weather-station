"use client"
import { useState, useEffect } from 'react';
import { getLastTenDays } from '@/lib/weatherData';
import DaySwitcher from '@/components/DaySwitcher';
import WeatherTables from "@/components/tables/WeatherTables";

export default function Home() {
  const [days, setDays] = useState("7");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getLastTenDays({forCharts: false, days});
      setLoading(false);
      console.log(days)
      setData(result);
    };

    fetchData();
  }, [days]);

  return (
    <div className="m-1">
      <DaySwitcher value={days} setValue={setDays} />
      <WeatherTables data={data} loading={loading}/>
    </div>
  );
}