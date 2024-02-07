"use client"
import {Select, SelectItem} from "@nextui-org/react";
const DaySwitcher = ({value, setValue}) => {

  const handleSelectionChange = (e) => {
    setValue(e.target.value);
  };
  const days = [
    {label: "7 Dní", value: 7, },
    {label: "10 Dní", value: 10, },
    {label: "14 Dní", value: 14, },
    {label: "30 Dní", value: 30, },
    {label: "60 Dní", value: 60, },
    {label: "100 Dní", value: 100, },
    ];
  return (
    <div className="flex w-full md:max-w-xs flex-col px-2 ">
      <Select
        label="Rozmezí dní"
        placeholder="vyberte rozmezí dní"
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