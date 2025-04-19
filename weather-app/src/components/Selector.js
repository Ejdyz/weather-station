"use client"
import {useEffect, useState} from "react";
import {Tab, Tabs} from "@nextui-org/tabs";
import {DateRangePicker} from "@nextui-org/date-picker";
import {parseDate} from "@internationalized/date";
import {WeatherTable} from "@/components/tables/WeatherTable";
import MainChart from "@/components/main/MainChart";
import {Spinner} from "@nextui-org/spinner";

const Selector = () => {
  const [data, setData] = useState([]);
  const [selectedTab, setSelectedTab] = useState("charts");
  const [isLoading, setIsLoading] = useState(true);
  const [dates, setDates] = useState({
    start: parseDate(new Date(new Date().setDate(new Date().getDate() - 4)).toISOString().split('T')[0]),
    end: parseDate(new Date().toISOString().split('T')[0]),
  });

  useEffect(() => {
    fetchData(selectedTab);
  }, [selectedTab, dates.start, dates.end]);

  const fetchData = async (key) =>{
    setIsLoading(true)
    const data = await fetch("/api/weather/range", {
      method: "POST",
      body: JSON.stringify({
        type: key,
        startDate: formatDate(true,dates.start),
        endDate: formatDate(false,dates.end)
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!data.ok) {
      console.error("Unable to connect to the database:", data.statusText);
      setData([])
      setIsLoading(false)
      return;
    }

    const result = await data.json()
    if (!result.data){
      setData([])
      setIsLoading(false)
      return;
    }
    
    setData(result.data)
    setIsLoading(false)
  } 

  const formatDate = (starting, date) => {
    let newDate = new Date(date)
    if (!starting){
      newDate.setHours(23,59)
    }
    return newDate
  }

  return (
    <div className="flex justify-center flex-col items-center">
      <div className="border-b-1 w-full z- translate-y-5" />
      <Tabs selectedKey={selectedTab} onSelectionChange={setSelectedTab} aria-label="Options" color="primary" className="z-10">
      <Tab key="charts" title={"Graf"}>
          <div className={"flex flex-col md:w-[calc(100vw-4rem)] w-[calc(100vw-2rem)] gap-2 "}>
            <DateRangePicker
              color="primary"
              className="max-w-96"
              label="Rozsah dní"
              value={dates}
              onChange={setDates}
            />
            <div className={"flex max-w-screen justify-center"}>
              {isLoading ?
                <div className="h-[23rem] w-full flex justify-center items-center">
                  <Spinner size="lg"/>
                </div>
                :
                <MainChart data={data} isForHistory/>
              }
            </div>
          </div>
        </Tab>
        <Tab key="tables" title={"Tabulka"}>
          <div className={"flex flex-col md:w-[calc(100vw-4rem)] w-[calc(100vw-2rem)] gap-2 "}>
            <DateRangePicker
              color="primary"
              className="max-w-96"
              label="Rozsah dní"
              value={dates}
              onChange={setDates}
            />
            {isLoading ?
              <div className="w-full rounded-xl bg-gray-100 flex justify-center items-center h-80">
                <Spinner size="lg"/>
              </div>
              :
              <div className="overflow-y-hidden w-full" >
                <WeatherTable data={data}/>
              </div>
            }
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Selector;