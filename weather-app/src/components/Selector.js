"use client"
import {Tab, Tabs} from "@nextui-org/tabs";
import Charts from "@/components/charts/Charts";
import Tables from "@/components/tables/Tables";

const Selector = () => {
  return (
    <div className="flex justify-center flex-col items-center">
      <div className="border-b-1 w-full z- translate-y-5" />
      <Tabs aria-label="Options" color="primary" className="z-10">
        <Tab key="charts" title={"Grafy"}>
          <Charts/>
        </Tab>
        <Tab key="tables" title={"Tabulka"}>
          <Tables/>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Selector;