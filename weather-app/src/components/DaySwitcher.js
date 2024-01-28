"use client"
import {Select, SelectItem} from "@nextui-org/react";
const DaySwitcher = ({value, setValue}) => {

  const handleSelectionChange = (e) => {
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
    <div className="flex w-full md:max-w-xs flex-col  pr-4 ml-2">
      <Select
        label="Range of days"
        placeholder="select a range of days"
        defaultSelectedKeys={[value]}
        className="w-full"
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

export default DaySwitcher;