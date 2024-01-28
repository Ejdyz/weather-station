import {
  BarometerIcon,
  CelsiusIcon,
  CleanNightIcon,
  ClearDayIcon,
  CloudyIcon, CloudyIconStatic, DrizzleIcon, DrizzleIconStatic,
  FullMoonIcon,
  HumidityIcon,
  MoonFirstQuarterIcon,
  MoonLastQuarterIcon,
  MoonriseIcon,
  MoonsetIcon,
  MoonWaningCrescentIcon,
  MoonWaningGibbousIcon,
  MoonWaxingCrescentIcon,
  MoonWaxingGibbousIcon,
  NewMoonIcon,
  NotAvailableIcon,
  PartlyCloudyDayDrizzleIcon, PartlyCloudyDayDrizzleIconStatic, PartlyCloudyDayIcon, PartlyCloudyDayIconStatic,
  PartlyCloudyDayRainIcon, PartlyCloudyDayRainIconStatic,
  PartlyCloudyDaySnowIcon, PartlyCloudyDaySnowIconStatic,
  PartlyCloudyIcon,
  PartlyCloudyNightDrizzleIcon,
  PartlyCloudyNightIcon,
  PartlyCloudyNightRainIcon,
  PartlyCloudyNightSnowIcon,
  RaindropsIcon,
  RainingIcon, RainingIconStatic,
  SnowingIcon, SnowingIconStatic,
  SunriseIcon,
  SunsetIcon,
  ThermometerIcon
} from "@/components/icons/Icons";

const Page = () => {
  return (
    <>

      <div className="flex h-32 bg-white">
        <SunriseIcon/>
        <SunsetIcon/>
        <MoonriseIcon/>
        <MoonsetIcon/>
      </div>
      <div className="flex h-32 bg-white">
        <NewMoonIcon/>
        <FullMoonIcon/>
        <MoonFirstQuarterIcon/>
        <MoonLastQuarterIcon/>
        <MoonWaningCrescentIcon/>
        <MoonWaxingCrescentIcon/>
        <MoonWaningGibbousIcon/>
        <MoonWaxingGibbousIcon/>
      </div>
      <div className="flex h-32 bg-white">
        <ClearDayIcon/>
        <CleanNightIcon/>
      </div>
      <div className="flex h-32 bg-white">
        <RaindropsIcon/>
        <ThermometerIcon/>
        <BarometerIcon/>
        <CelsiusIcon/>
        <HumidityIcon/>
        <NotAvailableIcon/>
      </div>
      <div className="flex h-32 bg-white">
        <CloudyIcon/>
        <DrizzleIcon/>
        <RainingIcon/>
        <SnowingIcon/>
      </div>
      <div className="flex h-32 bg-white">
        <PartlyCloudyDayIcon/>
        <PartlyCloudyDayDrizzleIcon/>
        <PartlyCloudyDayRainIcon/>
        <PartlyCloudyDaySnowIcon/>
      </div>
      <div className="flex h-32 bg-white">
        <PartlyCloudyNightIcon/>
        <PartlyCloudyNightDrizzleIcon/>
        <PartlyCloudyNightRainIcon/>
        <PartlyCloudyNightSnowIcon/>
      </div>
      static icons for table
      <div className="flex h-32 bg-white">
        <CloudyIconStatic/>
        <DrizzleIconStatic/>
        <RainingIconStatic/>
        <SnowingIconStatic/>
      </div>
      <div className="flex h-32 bg-white">
        <PartlyCloudyDayIconStatic/>
        <PartlyCloudyDayDrizzleIconStatic/>
        <PartlyCloudyDayRainIconStatic/>
        <PartlyCloudyDaySnowIconStatic/>
      </div>
    </>
  );
};

export default Page;