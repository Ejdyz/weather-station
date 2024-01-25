import {
  BarometerIcon,
  CelsiusIcon,
  CleanNightIcon,
  ClearDayIcon,
  CloudyIcon,
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
  PartlyCloudyDayDrizzleIcon,
  PartlyCloudyDayRainIcon,
  PartlyCloudyDaySnowIcon,
  PartlyCloudyIcon,
  PartlyCloudyNightDrizzleIcon,
  PartlyCloudyNightIcon,
  PartlyCloudyNightRainIcon,
  PartlyCloudyNightSnowIcon,
  RaindropsIcon,
  RainingIcon,
  SnowingIcon,
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
        <RainingIcon/>
        <SnowingIcon/>
      </div>
      <div className="flex h-32 bg-white">
        <PartlyCloudyIcon/>
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
    </>
  );
};

export default Page;