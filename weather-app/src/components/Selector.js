"use client"
import {Tab, Tabs} from "@nextui-org/tabs";
import Tables from "@/components/tables/Tables";
import Charts from "@/components/charts/Charts";
import {useState} from "react";
const Selector = () => {
  const [days, setDays] = useState("7");

  return (
    <div className="flex justify-center flex-col items-center">
      <div className="border-b-1 w-full z- translate-y-5" />
      <Tabs aria-label="Options" color="primary" className="z-10">
        <Tab key="tables" title={"Tabulka"}>
          <Tables days={days} setDays={setDays}/>
        </Tab>
        <Tab key="charts" title={"Graf"}>
          <Charts days={days} setDays={setDays}/>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Selector;