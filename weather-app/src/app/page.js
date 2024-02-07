import MyNavbar from "@/components/navbar/MyNavbar";
import {
  CleanNightIcon,
  ClearDayIcon,
  CloudyIcon, PartlyCloudyDayDrizzleIcon, PartlyCloudyDayIcon,
  RainingIcon,
  SnowingIcon
} from "@/components/icons/Icons";
import Selector from "@/components/Selector";
import MoonAndSunriseWrapper from "@/components/MoonAndSunriseWrapper";
import WeatherMap from "@/components/map/WeatherMap";


export default async function Home() {

  const clearWeatherDay = "from-gray-300 via-cyan-500 to-blue-600"
  const partlyCloudyDay = "from-sky-400 to-gray-400"

  const clearWeatherNight = "from-gray-700 via-gray-800 to-gray-900"

  const cloudyWeather = "from-sky-300 to-gray-500"

  const drizzleWeather = "from-sky-700 to-gray-400"
  const rainyWeather = "from-sky-800  to-gray-500"
  const snowyWeather = "from-sky-300  to-cyan-600"

  return (
    <>

      <div className={"h-full w-full bg-gradient-to-tr " + clearWeatherDay} >
      <MyNavbar page="home"/>
        <div className="w-full h-full ">
          <ClearDayIcon className={"w-64"} />
          <MoonAndSunriseWrapper />
          <Selector/>
          <WeatherMap />
        </div>
      </div>
      <div className={"h-screen w-full flex flex-row items-start justify-end bg-gradient-to-tr "+partlyCloudyDay} >
        <PartlyCloudyDayIcon className={"w-64"} />
      </div>
      <div className={"h-screen w-full flex flex-row items-start justify-end bg-gradient-to-tr " + clearWeatherNight} >
        <CleanNightIcon className={"w-64"}/>
      </div>
      <div className={"h-screen w-full flex flex-row items-start justify-end bg-gradient-to-tr " +cloudyWeather} >
        <CloudyIcon className={"w-64"}/>
      </div>
      <div className={"h-screen w-full flex flex-row items-start justify-end bg-gradient-to-tr "+ drizzleWeather} >
        <PartlyCloudyDayDrizzleIcon className={"w-64"}/>
      </div>
      <div className={"h-screen w-full flex flex-row items-start justify-end bg-gradient-to-tr " +rainyWeather } >
        <RainingIcon className={"w-64"}/>
      </div>
      <div className={"h-screen w-full flex flex-row items-start justify-end bg-gradient-to-tr " + snowyWeather} >
        <SnowingIcon className={"w-64"}/>
      </div>
    </>
  )
}
