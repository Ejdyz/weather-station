"use client"
import {Tab, Tabs} from "@nextui-org/tabs";
import Charts from "@/components/charts/Charts";
import Tables from "@/components/tables/Tables";

const Selector = () => {
  return (
    <div className="flex justify-center flex-col items-center">
      <Tabs  aria-label="Options" color="primary" >
        <Tab key="charts" title={"Charts"}>
          <Charts/>
        </Tab>
        <Tab key="tables" title={"Tables"}>
          <Tables/>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Selector;