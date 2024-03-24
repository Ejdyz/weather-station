import Sunrise from "@/components/MoonAndSun/sunrise/Sunrise";
import Moonrise from "@/components/MoonAndSun/moonrise/Moonrise";
import MoonPhase from "@/components/MoonAndSun/moonphase/MoonPhase";
import ZodiacSigns from "@/components/MoonAndSun/zodiac/ZodiacSigns";

const MoonAndSunriseWrapper = async ({data}) => {
  return (
    <>
      {/*mobile*/}
      <div className="md:hidden">
        <div className="mt-8 max-w-screen flex flex-col justify-center items-center">
          <Sunrise sunrise={data.sunrise} sunset={data.sunset}/>
          <Moonrise moonrise={data.moonrise} moonset={data.moonset}/>
        </div>
        <div className="  flex w-full justify-evenly items-center">
          <MoonPhase className="w-28"/>
          <ZodiacSigns className="w-28"/>
        </div>
      </div>
      {/*tablet*/}
      <div className="lg:hidden md:block hidden">
        <div className="  flex w-full justify-evenly items-center">
          <MoonPhase className="w-28"/>
          <div className="mt-8 max-w-screen flex flex-col justify-center items-center">
            <Sunrise sunrise={data.sunrise} sunset={data.sunset}/>
            <Moonrise moonrise={data.moonrise} moonset={data.moonset}/>
          </div>
          <ZodiacSigns className="w-28"/>
        </div>
      </div>
      {/*desktop*/}
      <div className="lg:block hidden ">
        <div className="mt-8 flex md:flex-row flex-col w-full justify-evenly mb-12  items-center">
          <ZodiacSigns className="w-28"/>
          <Sunrise sunrise={data.sunrise} sunset={data.sunset}/>
          <Moonrise moonrise={data.moonrise} moonset={data.moonset}/>
          <MoonPhase className="w-28"/>
        </div>
      </div>
    </>
  );
};

export default MoonAndSunriseWrapper;