"use client"
import {Tab, Tabs} from "@nextui-org/tabs";
import Tables from "@/components/tables/Tables";
import Charts from "@/components/charts/Charts";
const Selector = () => {
  return (
    <div className="flex justify-center flex-col items-center">
      <div className="border-b-1 w-full z- translate-y-5" />
      <Tabs aria-label="Options" color="primary" className="z-10">
        <Tab key="tables" title={"Tabulka"}>
          <Tables/>
        </Tab>
        <Tab key="charts" title={"Graf"}>
          <Charts/>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Selector;