import {getHowCloudyCurrentlyIs, getHowMuchIsCurrentlyRaining} from "@/lib/weatherData";
import {
  ClearDayIcon,
  CloudyIcon,
  DrizzleIcon,
  PartlyCloudyDayDrizzleIcon,
  PartlyCloudyDayIcon, PartlyCloudyDayRainIcon, PartlyCloudyDaySnowIcon,
  RainingIcon,
  SnowingIcon
} from "@/components/icons/Icons";
import {useEffect, useState} from "react";
import {Spinner} from "@nextui-org/spinner";

const Icon = (data) => {
  const [cloudiness, setCloudiness] = useState();
  const [rain, setRain] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const result1 = await getHowCloudyCurrentlyIs({light: data.data.highestLight});
      const result2 = await  getHowMuchIsCurrentlyRaining({rain: data.data.highestRaining, temperature: data.data.highestTemperature, humidity: data.data.highestHumidity+data.data.lowestHumidity, pressure: (data.data.highestPressure+data.data.lowestPressure)/2})
      setLoading(false)
      setCloudiness(result1);
      setRain(result2);
    };

    fetchData();
  }, []);
  if(loading) return <div className="max-w-20"><Spinner size={"lg"}/></div>
  if (cloudiness === "cloudy") {
    if (rain === "drizzle") return (<DrizzleIcon className={"max-w-20"}/>)
    if (rain === "rain") return (<RainingIcon className={"max-w-20"}/>)
    if (rain === "snow") return (<SnowingIcon className={"max-w-20"}/>)
    return (<CloudyIcon className={"max-w-20"}/>)
  } else {
    if (rain === "drizzle") return (<PartlyCloudyDayDrizzleIcon className={"max-w-20"}/>)
    if (rain === "rain") return (<PartlyCloudyDayRainIcon className={"max-w-20"}/>)
    if (rain === "snow") return (<PartlyCloudyDaySnowIcon className={"max-w-20"}/>)
    if (cloudiness === "partly cloudy") return (<PartlyCloudyDayIcon className={"max-w-20"}/>)
    return (<ClearDayIcon className={"max-w-20"}/>)
  }
}
export default Icon;