"use client"
import { useState } from "react";

export default function Background({ children/*, type */} : { children: React.ReactNode /*, type: "overcast" | "clear" | "partly cloudy" | "cloudy" | "fog" | "rain" | "night" */}) {
  const [type, setType] = useState("clear");

  const availableTypes = [ "clear", "partly cloudy", "cloudy","overcast", "rain", "fog", "night"];
  let backgroundClass = "";
  switch(type) {
    case "overcast":
      backgroundClass = "bg-overcast";
      break;
    case "clear":
      backgroundClass = "bg-clear";
      break;
    case "partly cloudy":
      backgroundClass = "bg-partly-cloudy";
      break;
    case "cloudy":
      backgroundClass = "bg-cloudy";
      break;
    case "fog":
      backgroundClass = "bg-fog";
      break;
    case "rain":
      backgroundClass = "bg-rain";
      break;
    case "night":
      backgroundClass = "bg-night";
      break;
    default:
      backgroundClass = "";
  }

  return (
    <div className={`flex flex-col gap-2 h-screen fixed top-0 overflow-auto w-full p-4 mb-8 max-w-screen ${backgroundClass}`}>
      <div className="flex gap-2">
        {availableTypes.map((availableType) => (
          <button
            key={availableType}
            onClick={() => setType(availableType)}
            className={`px-4 py-2 rounded ${type === availableType ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}`}
          >
            {availableType}
          </button>
        ))}
      </div>
      {children}
    </div>
  )
}
