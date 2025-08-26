"use client"
import { useState, useEffect } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent, TypesMap } from "@/components/ui/chart"
import { History } from "@/generated/prisma";
import { Line, LineChart, YAxis } from "recharts"
import Spinner from "@/components/ui/spinner";


export default function HistoryRecordsGraph({ data, selectedFilters, availableFilters }:{data: History[]; selectedFilters: string[]; availableFilters: { value: string; label: string }[]}) {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (data) {
      setIsLoaded(true);
    }
  }, [data]);

  if (!isLoaded) {
    return <div className="h-96">
      <Spinner />
    </div>;
  }

  const strokes = [
    "#FFDE21",
    "#ff0000",
    "#ff7f00",
    "#ffff00",
    "#7fff00",
    "#00ff7f",
    "#00ffff",
    "#007fff",
    "#0000ff",
    "#7f00ff",
    "#ff00ff",
    "#2e3192",
  ]

  const typesMap: TypesMap[] = [
    { value: "temperature", label: "temperature" },
    { value: "app_temperature", label: "temperature" },
    { value: "dew_point", label: "temperature" },
    
    { value: "humidity", label: "humidity" },

    { value: "pressure", label: "pressure" },
    { value: "pressure_at_sea_level", label: "pressure" },
    { value: "saturation_vapor_pressure", label: "pressure" },
    { value: "vapor_pressure", label: "pressure" },
    
    { value: "wind_speed", label: "wind_speed_ms" },
    { value: "max_wind_speed", label: "wind_speed_ms" },

    { value: "rain_mm", label: "rain_mm" },
    
    { value: "wind_direction", label: "wind_direction" },
  ] as const

  return (
    <ChartContainer config={{ yAxis: { label: "Value" }, xAxis: { label: "name" } }} className="-ml-7 max-h-96 w-full">
      <LineChart data={data}>
        <YAxis stroke="#ffffff" color="#ffffff"  className="text-white stroke-amber-50 fill-white" />
        {availableFilters.map((filter, index) => (
          <Line
            stroke={strokes[index]}
            display={"C"}
            label={"c"}
            type="monotone"
            key={filter.value}
            dataKey={filter.value}
            hide={!selectedFilters.includes(filter.value)}
            name={filter.label}
            tooltipType="none"
            dot={false}
          />
        ))}
        <ChartTooltip content={<ChartTooltipContent typesMap={typesMap} />} />
      </LineChart>
    </ChartContainer>
  )
}
