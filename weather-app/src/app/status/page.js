"use client"
import {useEffect, useState} from "react";

export const fetchCache = 'force-no-store';

const Page = () => {
  let [data,setData] = useState({
    isActive: false,
    data: {
      temperature: 0,
      humidity: 0,
      pressure: 0,
      sunlight: 0,
      rain: 0,
      isRaining: false,
      time: ""
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/status',{ cache: 'no-store' });
        setData(await response.json());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run effect only once during component mount

  console.log(data)
  return (
    <>
      <h1>Status</h1>
      <p>Temperature: {data.data.temperature}</p>
      <p>Humidity: {data.data.humidity}</p>
      <p>Pressure: {data.data.pressure}</p>
      <p>Sunlight: {data.data.sunlight}</p>
      <p>Rain: {data.data.rain}</p>
      <p>Is raining: {data.data.isRaining ? "Yes" : "No"}</p>
      <p>Time: {data.data.time}</p>
      <p>Is active: {data.isActive ? "Yes" : "No"}</p>

    </>
  );
};

export default Page;