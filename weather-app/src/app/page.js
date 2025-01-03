import MyNavbar from "@/components/navbar/MyNavbar";
import Divider from "@/components/Divider";
import dynamic from "next/dynamic";
import LoadingMap from "@/components/map/LoadingMap";
import MoonAndSunriseLoading from "@/components/MoonAndSun/MoonAndSunriseLoading";
import {
  getHowCloudyCurrentlyIs,
  getHowMuchIsCurrentlyRaining,
  getLastRecord, getLastRecords, getSunriseAndSunset,
  isNight,
} from "@/lib/weatherData";
import MyIcon from "@/components/main/MyIcon";
import Footer from "@/components/Footer";
import MainDataLoading from "@/components/main/MainDataLoading";
import MainChartLoading from "@/components/main/MainChartLoading";
import Selector from "@/components/Selector";
export const metadata = {
  title: 'Počasí',
  description: 'Hlavní stránka aplikace',
};
export const fetchCache = 'force-no-store';

const MoonAndSunriseWrapper = dynamic(() => import('@/components/MoonAndSun/MoonAndSunriseWrapper'), { ssr: false,loading: () => <MoonAndSunriseLoading/> })
const WeatherMap = dynamic(() => import('@/components/map/WeatherMap'), { ssr: false, loading: () => <LoadingMap /> })
const MainData = dynamic(() => import('@/components/main/MainData'), { ssr: false, loading: () => <MainDataLoading /> })
const MainChart = dynamic(() => import('@/components/main/MainChart'), { ssr: false, loading: () => <MainChartLoading /> })

//function for getting current background
const getWeatherBackground = async (cloudiness,rain,night) => {
  //define background colors for different weather
  const clearWeatherNight = "h-full w-full bg-gradient-to-tr from-gray-700 via-gray-800 to-gray-900"

  const clearWeatherDay = "h-full w-full bg-gradient-to-tr from-gray-300 via-cyan-500 to-blue-600"

  const partlyCloudyDay = "h-full w-full bg-gradient-to-tr from-sky-400 to-gray-400"
  const cloudyWeather = "h-full w-full bg-gradient-to-tr from-sky-300 to-gray-500"

  const drizzleWeather = "h-full w-full bg-gradient-to-tr from-sky-700 to-gray-400"
  const rainyWeather = "h-full w-full bg-gradient-to-tr from-sky-800  to-gray-500"
  const snowyWeather = "h-full w-full bg-gradient-to-tr from-sky-300  to-cyan-600"

  let weatherBackground = snowyWeather//await getCurrentBackground(cloudiness, rain, night)

  if (cloudiness === "clear" && rain == null) weatherBackground = clearWeatherDay

  if (cloudiness === "partly cloudy") weatherBackground = partlyCloudyDay

  if (cloudiness === "cloudy") weatherBackground = cloudyWeather

  if (rain === "drizzle") weatherBackground = drizzleWeather

  if (rain === "rain") weatherBackground = rainyWeather

  if (rain === "snow") weatherBackground = snowyWeather

  if (night) weatherBackground = clearWeatherNight
  return weatherBackground;
}

export default async function Home() {
  const sunriseData = await getSunriseAndSunset()
  const data = await getLastRecord()
  let lastRecords = await getLastRecords(49)
  const lastData = lastRecords.map(item => {
    let newDate = new Date(item.time)
    if ([0,1,2,3,4,5,6,7,8,9].includes(new Date(item.time).getMinutes())){
      newDate = (newDate.getHours() + ":0" + newDate.getMinutes()).toString()
    }else{
      newDate = (newDate.getHours() + ":" + newDate.getMinutes()).toString()
    }
    return{
      ...item,
      formatedTime : newDate
    }
  })

  const cloudiness = await getHowCloudyCurrentlyIs(data)
  const rain = await getHowMuchIsCurrentlyRaining(data)
  const night = await isNight(sunriseData.sunset, sunriseData.sunrise)
  return (
    <>
      <div className={await getWeatherBackground(cloudiness,rain,night)} >
        <MyNavbar page="home"/>
        <div className="w-full h-full ">
          <section id="main" className="pt-1">
            <div className="w-full flex justify-end">
                <MyIcon cloudiness={cloudiness} rain={rain} night={night}/>
            </div>
            <div className="md:translate-y-[-60px]">
              <MainData data={data}/>
            </div>
            <div className=" flex flex-col justify-center items-center">
              <MainChart data={lastData}/>
            </div>
          </section>
          <section id="sunrise" className="pt-1">
            <Divider gap><div className=" bg-primary px-4 py-1 rounded-xl text-white border-4 border-white min-w-fit " >Východ a západ</div></Divider>
            <MoonAndSunriseWrapper data={sunriseData}/>
          </section>
          <section id="charts" className="pt-1">
            <Selector />
          </section>
          <section id="radar" className="pt-1">
            <Divider gap><div className="bg-primary px-4 py-1 rounded-xl text-white border-4 border-white" >Radar</div></Divider>
            <WeatherMap />
          </section>
        </div>
        <Footer data={data} />
      </div>

    </>
  )
}


