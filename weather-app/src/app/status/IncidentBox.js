"use client"
import {ExclamationTriangle} from "@/components/icons/Icons";
import React, {useState} from "react";
import {ChevronDown, ChevronUp} from "lucide-react";
import {Button} from "@nextui-org/button";

const IncidentBox = ({data, index}) => {
  const [open, setOpen] = useState(false);
  const start = new Date(data.attributes.started_at);
  const end = !data.attributes.resolved_at ? new Date():new Date(data.attributes.resolved_at);

  const startTime = start.getDate() + "." + (start.getMonth() + 1) + "  " + ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(start.getHours()) ? "0" + start.getHours() : "" + start.getHours()) + ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(start.getMinutes()) ? ":0" + start.getMinutes() : ":" + start.getMinutes()) + ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(start.getSeconds()) ? ":0" + start.getSeconds() : ":" + start.getSeconds())
  const endTime = end.getDate() + "." + (end.getMonth() + 1) + "  " + ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(start.getHours()) ? "0" + start.getHours() : "" + start.getHours()) + ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(end.getMinutes()) ? ":0" + end.getMinutes() : ":" + end.getMinutes()) + ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(end.getSeconds()) ? ":0" + end.getSeconds() : ":" + end.getSeconds())

  const timeDifference = Math.abs(end - start);

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  return (
    <div key={index} onClick={()=>setOpen(!open)} className="bg-slate-700 w-[calc(100%-4rem)] h-full ml-8 rounded-2xl p-6 mt-5">
      <div className="flex justify-between">
        <div className={"flex gap-2"}>
          <ExclamationTriangle color={"#ec635d"} className={"w-8 h-8"}/>
          {!data.attributes.resolved_at?
            (<h3 className={"text-xl font-bold"}>Down for {(days !== 0 ? days + " days " : "") + (hours !== 0 ? hours + "h " : "") + (minutes !== 0 ? minutes + "min " : "") + seconds + "s"}</h3>)
            :
            (<h3 className={"text-xl font-bold"}>Down for {(days !== 0 ? days + " days " : "") + (hours !== 0 ? hours + "h " : "") + (minutes !== 0 ? minutes + "min " : "") + seconds + "s"}</h3>)}
        </div>
        <Button variant="light" className={"bg-slate-600 text-white"} onPress={() =>setOpen(!open)} isIconOnly>
          {
            open ? (<ChevronUp size={16} />):(<ChevronDown size={16} />)
          }
        </Button>
      </div>
      <div className={"pl-10 mt-2 " + (open?"visible":"hidden")}>
        <p>Start: <span className="font-bold">{startTime}</span></p>
        <p>End: <span className="font-bold">{!data.attributes.resolved_at?"Pořád probíhá" :endTime}</span></p>
      </div>
    </div>
  )
};

export default IncidentBox;