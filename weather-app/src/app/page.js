import MyNavbar from "@/components/navbar/MyNavbar";
import Divider from "@/components/Divider";
import dynamic from "next/dynamic";
import LoadingMap from "@/components/map/LoadingMap";
import LoadingSelector from "@/components/charts/LoadingSelector";
import MoonAndSunriseLoading from "@/components/MoonAndSun/MoonAndSunriseLoading";
import {
  getCurrentBackground,
  getHowCloudyCurrentlyIs,
  getHowMuchIsCurrentlyRaining,
  getLastRecord,
  isNight,
} from "@/lib/weatherData";
import MyIcon from "@/components/main/MyIcon";

const Selector = dynamic(() => import('@/components/Selector'), { ssr: false,loading: () => <LoadingSelector />})
const MoonAndSunriseWrapper = dynamic(() => import('@/components/MoonAndSun/MoonAndSunriseWrapper'), { ssr: false,loading: () => <MoonAndSunriseLoading/> })
const WeatherMap = dynamic(() => import('@/components/map/WeatherMap'), { ssr: false, loading: () => <LoadingMap /> })

export default async function Home() {
  const data = await getLastRecord()
  const weatherBackground = await getCurrentBackground(data)

  const cloudiness = await getHowCloudyCurrentlyIs(data)
  const rain = await getHowMuchIsCurrentlyRaining(data)
  const night = await isNight()
  return (
    <>
      <div className={weatherBackground} >
      <MyNavbar page="home"/>
        <div className="w-full h-full ">
          <section id="main" className="pt-1">
            <div className="w-full flex justify-end">
              <div className="flex justify-center items-center">
                <MyIcon cloudyness={cloudiness} rain={rain} night={night}/>
              </div>
            </div>
            <div>
              <h2>{}</h2>
            </div>


          </section>
          <section id="sunrise" className="pt-1">
            <Divider gap><div className=" bg-primary px-4 py-1 rounded-xl text-white border-4 border-white min-w-fit " >Východ a západ</div></Divider>
            <MoonAndSunriseWrapper />
          </section>
          <section id="charts" className="pt-1">
            <Selector />
          </section>
          <section id="radar" className="pt-1">
            <Divider gap><div className="bg-primary px-4 py-1 rounded-xl text-white border-4 border-white" >Radar</div></Divider>
            <WeatherMap />
          </section>
        </div>
      </div>

    </>
  )
}
