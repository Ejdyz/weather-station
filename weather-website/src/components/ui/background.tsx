export default function Background({ children, type } : { children: React.ReactNode, type: "overcast" | "clear" | "partly cloudy" | "cloudy" | "fog" | "rain" | "night" | "unknown"}) {
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
      backgroundClass = "bg-partly-cloudy";
  }

  return (
    <div className={`flex flex-col gap-2 h-screen fixed top-0 overflow-auto w-full p-4 max-w-screen  ${backgroundClass}`}>
      {children}
    </div>
  )
}
