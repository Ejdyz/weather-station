import {
  ClearDayIcon,
  CloudyIcon,
  DrizzleIcon,
  PartlyCloudyDayDrizzleIcon,
  PartlyCloudyDayIcon, PartlyCloudyDayRainIcon, PartlyCloudyDaySnowIcon,
  RainingIcon,
  SnowingIcon
} from "@/components/icons/Icons";
import { 
  CLOUDY_BORDER, 
  PARTLY_CLOUDY_BORDER, 
  RAIN_AND_DRIZZLE_BORDER, 
  DRIZZLE_AND_DRY_BORDER
} from "@/lib/config";

const Icon = (data) => {
  const cloudiness = getHowCloudyCurrentlyIs({light: data.data.highestLight})
  const rain = getHowMuchIsCurrentlyRaining({
    rain: data.data.highestRaining, 
    temperature: data.data.highestTemperature, 
    humidity: data.data.highestHumidity + data.data.lowestHumidity, 
    pressure: (data.data.highestPressure + data.data.lowestPressure)/2}
  )

  function getHowCloudyCurrentlyIs(data) {
    if (data?.light === -1) return null
  
    if(data?.light >= CLOUDY_BORDER){
      return "cloudy"
    }
    if(data?.light < CLOUDY_BORDER && data?.light > PARTLY_CLOUDY_BORDER){
      return "clear"
    }
    if(data?.light < PARTLY_CLOUDY_BORDER){
      return "partly cloudy"
    }
    return null
  }

  function getHowMuchIsCurrentlyRaining(data) {
    if (data?.rain === -1 || data?.rain < PARTLY_CLOUDY_BORDER) return null
    if (data?.temperature < 0 && data?.rain > 0) return "snow"
    if (data?.rain > RAIN_AND_DRIZZLE_BORDER) return "rain"
    if (data?.rain < RAIN_AND_DRIZZLE_BORDER && data?.rain > DRIZZLE_AND_DRY_BORDER  ) return "drizzle"
    return null
  }
  
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