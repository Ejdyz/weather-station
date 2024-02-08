import {
  CleanNightIcon,
  ClearDayIcon,
  CloudyIcon,
  DrizzleIcon,
  PartlyCloudyDayDrizzleIcon,
  PartlyCloudyDayIcon,
  PartlyCloudyDayRainIcon,
  PartlyCloudyDaySnowIcon,
  PartlyCloudyNightDrizzleIcon,
  PartlyCloudyNightRainIcon,
  PartlyCloudyNightSnowIcon,
  RainingIcon,
  SnowingIcon
} from "@/components/icons/Icons";

const MyIcon = async ({cloudiness ,rain,night}) => {
  if (night) {
    if (rain === "drizzle") return (<PartlyCloudyNightDrizzleIcon className={"w-64 md:mr-28"}/>)
    if (rain === "rain") return (<PartlyCloudyNightRainIcon className={"w-64 md:mr-28"}/>)
    if (rain === "snow") return (<PartlyCloudyNightSnowIcon className={"w-64 md:mr-28"}/>)
    return (<CleanNightIcon className={"w-64 md:mr-28"}/>)
  }
  if (cloudiness === "cloudy") {
    if (rain === "drizzle") return (<DrizzleIcon className={"w-64 md:mr-28"}/>)
    if (rain === "rain") return (<RainingIcon className={"w-64 md:mr-28"}/>)
    if (rain === "snow") return (<SnowingIcon className={"w-64 md:mr-28"}/>)
    return (<CloudyIcon className={"w-64 md:mr-28"}/>)
  } else {
    if (cloudiness === "partly cloudy") return (<PartlyCloudyDayIcon className={"w-64 md:mr-28"}/>)
    if (rain === "drizzle") return (<PartlyCloudyDayDrizzleIcon className={"w-64 md:mr-28"}/>)
    if (rain === "rain") return (<PartlyCloudyDayRainIcon className={"w-64 md:mr-28"}/>)
    if (rain === "snow") return (<PartlyCloudyDaySnowIcon className={"w-64 md:mr-28"}/>)
    return (<ClearDayIcon className={"w-64 md:mr-28"}/>)
  }
}

export default MyIcon