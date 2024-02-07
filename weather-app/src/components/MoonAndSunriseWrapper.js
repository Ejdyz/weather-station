import {getSunriseAndSunset} from "@/lib/weatherData";
import Sunrise from "@/components/sunrise/Sunrise";
import Moonrise from "@/components/moonrise/Moonrise";
import MoonPhase from "@/components/moonphase/MoonPhase";
import ZodiacSigns from "@/components/zodiac/ZodiacSigns";

const MoonAndSunriseWrapper = async () => {
  const data = await getSunriseAndSunset()
  return (
    <div className="flex md:flex-row flex-col w-full justify-evenly mb-12  items-center">
      <ZodiacSigns className="w-28 md:block hidden"/>
      <Sunrise sunrise={data.sunrise} sunset={data.sunset}/>
      <Moonrise moonrise={data.moonrise} moonset={data.moonset}/>
      <MoonPhase className="w-28 md:block hidden" />
      <div className="md:hidden  flex w-full justify-evenly items-center">
        <MoonPhase className="w-28"/>
        <ZodiacSigns className="w-28"/>
      </div>
    </div>
  );
};

export default MoonAndSunriseWrapper;