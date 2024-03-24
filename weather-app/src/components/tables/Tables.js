"use client"
import { useState, useEffect } from 'react';
import { getLastDays } from '@/lib/weatherData';
import DaySwitcher from '@/components/DaySwitcher';
import MyTable from "@/components/tables/MyTable";

export default function Home({days,setDays}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getLastDays(false, days);
      setLoading(false);
      console.log(days)
      setData(result);
    };

    fetchData();
  }, [days]);

  return (
    <div>
      <DaySwitcher value={days} setValue={setDays} />
      <MyTable data={data} loading={loading}/>
    </div>
  );
}