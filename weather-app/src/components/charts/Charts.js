"use client"
import { useState, useEffect } from 'react';
import { getLastDays } from '@/lib/weatherData';
import DaySwitcher from '@/components/DaySwitcher';
import MainChart from "@/components/main/MainChart";
import MainChartLoading from "@/components/main/MainChartLoading";

export default function Home() {
  const [days, setDays] = useState("7");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getLastDays(true, days);
      setLoading(false);
      console.log(days)
      setData(result);
    };

    fetchData();
  }, [days]);

  return (
    <div className="m-1">
      <DaySwitcher value={days} setValue={setDays} />
      <br/>
      {loading?<MainChartLoading /> :<MainChart data={data}/>}
    </div>
  );
}