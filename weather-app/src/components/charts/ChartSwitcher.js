"use client"
import React,{useState} from "react";
import {Select, SelectSection, SelectItem} from "@nextui-org/react";
import WeatherCharts from "@/components/charts/WeatherCharts";
const ChartSwitcher = ({value, setValue}) => {

  const handleSelectionChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };
  const days = [
    {label: "7 Days", value: 7, },
    {label: "10 Days", value: 10, },
    {label: "14 Days", value: 14, },
    {label: "30 Days", value: 30, },
    {label: "60 Days", value: 60, },
    {label: "100 Days", value: 100, },
    ];
  return (
    <div className="flex w-full max-w-xs flex-col gap-2 m-2">
      <Select
        label="Range of days"
        placeholder="select a range of days"
        defaultSelectedKeys={[value]}
        className="max-w-xs"
        selectionMode="single"
        color="primary"
        disallowEmptySelection
        onChange={handleSelectionChange}
      >
        {days.map((day) => (
          <SelectItem key={day.value} value={day.value} color="primary" className="text-black">
            {day.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default ChartSwitcher;