"use client"
import { useState, useEffect } from 'react';
import { getLastTenDays } from '@/lib/weatherData';
import ChartSwitcher from '@/components/charts/ChartSwitcher';
import WeatherCharts from "@/components/charts/WeatherCharts";

export default function Home() {
  const [days, setDays] = useState("7");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getLastTenDays({forCharts: true, days});
      setLoading(false);
      console.log(days)
      setData(result);
    };

    fetchData();
  }, [days]);

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }
  return (
    <div className="m-1ě">
      <ChartSwitcher value={days} setValue={setDays}/>
      <WeatherCharts data={data}/>
    </div>
  );
}