import {getSunriseAndSunset} from "@/lib/weatherData";
import Sunrise from "@/components/sunrise/Sunrise";
import Moonrise from "@/components/moonrise/Moonrise";
import MoonPhase from "@/components/moonphase/MoonPhase";
import ZodiacSigns from "@/components/zodiac/ZodiacSigns";

const MoonAndSunriseWrapper = async () => {
  const data = await getSunriseAndSunset()
  return (
    <div className="flex md:flex-row flex-col w-full justify-evenly mb-12 ">
      <ZodiacSigns />
      <Sunrise sunrise={data.sunrise} sunset={data.sunset}/>
      <Moonrise moonrise={data.moonrise} moonset={data.moonset}/>
      <MoonPhase />
    </div>
  );
};

export default MoonAndSunriseWrapper;