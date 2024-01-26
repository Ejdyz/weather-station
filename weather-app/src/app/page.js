import MyNavbar from "@/components/navbar/MyNavbar";
import Icon, {CloudyIcon} from "@/components/icons/Icons";


export default function Home() {
  const clearWeather = "from-gray-300 via-cyan-500 to-blue-500"
  const cloudyWeather = "from-gray-100 to-blue-700"
  return (
    <div className={"flex min-h-screen flex-col items-center justify-between bg-gradient-to-tr " + clearWeather}>
      <MyNavbar page="home"/>
      <div>

      </div>
    </div>
  )
}
