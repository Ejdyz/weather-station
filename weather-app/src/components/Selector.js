"use client"
import {Tab, Tabs} from "@nextui-org/tabs";
import Charts from "@/components/charts/Charts";
import {Divider} from "@nextui-org/react";

const Selector = () => {
  return (
    <div className="flex justify-center flex-col items-center">
      <Tabs  aria-label="Options" color="primary" >
        <Tab key="charts" title={"Charts"}>
          <Charts/>
        </Tab>
        <Tab key="tables" title={"Tables"}>
          <Charts/>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Selector;