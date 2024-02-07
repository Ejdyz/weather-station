
import MyNavbar from "@/components/navbar/MyNavbar";
import {
  CleanNightIcon,
  ClearDayIcon,
  CloudyIcon, PartlyCloudyDayDrizzleIcon, PartlyCloudyDayIcon,
  RainingIcon,
  SnowingIcon
} from "@/components/icons/Icons";
import Divider from "@/components/Divider";
import dynamic from "next/dynamic";
import {Spinner} from "@nextui-org/spinner";
import LoadingMap from "@/components/map/LoadingMap";
import LoadingSelector from "@/components/charts/LoadingSelector";
import MoonAndSunriseLoading from "@/components/MoonAndSunriseLoading";

const Selector = dynamic(() => import('@/components/Selector'), { ssr: false,loading: () => <LoadingSelector />})
const MoonAndSunriseWrapper = dynamic(() => import('@/components/MoonAndSunriseWrapper'), { ssr: false,loading: () => <MoonAndSunriseLoading/> })
const WeatherMap = dynamic(() => import('@/components/map/WeatherMap'), { ssr: false, loading: () => <LoadingMap /> })
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
          <section id="main" className="pt-1">
            <div className="w-full flex justify-end">
              <ClearDayIcon className={"w-64"} />
            </div>
          <section id="sunrise" className="pt-1">
            <Divider gap><div className=" bg-primary px-4 py-1 rounded-xl text-white border-4 border-white min-w-fit " >Východ a západ</div></Divider>
            <MoonAndSunriseWrapper />
          </section>
          </section >
          <section id="charts" className="pt-1">
            <Selector />
          </section>
          <section id="radar" className="pt-1">
            <Divider gap><div className="bg-primary px-4 py-1 rounded-xl text-white border-4 border-white" >Radar</div></Divider>
            <WeatherMap />
          </section>
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
