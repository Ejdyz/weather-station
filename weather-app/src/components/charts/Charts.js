"use client"
import { useState, useEffect } from 'react';
import { getLastRecords} from '@/lib/weatherData';
import DaySwitcher from '@/components/DaySwitcher';
import MainChart from "@/components/main/MainChart";
import MainChartLoading from "@/components/main/MainChartLoading";

export default function Home({days,setDays}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getLastRecords( days*288);
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
      {loading?<MainChartLoading isForHistory/> :<MainChart data={data} isForHistory/>}
    </div>
  );
}