import {
  AquariusIcon, AriesIcon,
  BarometerIcon, CancerIcon, CapricornIcon,
  CelsiusIcon,
  CleanNightIcon,
  ClearDayIcon,
  CloudyIcon, CloudyIconStatic, DrizzleIcon, DrizzleIconStatic,
  FullMoonIcon, GeminiIcon,
  HumidityIcon, LeoIcon, LibraIcon,
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
  PartlyCloudyNightSnowIcon, PiscesIcon,
  RaindropsIcon,
  RainingIcon, RainingIconStatic, SagittariusIcon, ScorpioIcon,
  SnowingIcon, SnowingIconStatic,
  SunriseIcon,
  SunsetIcon, TaurusIcon,
  ThermometerIcon, VirgoIcon
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
        <>
          <NewMoonIcon/>
          new moon
        </>
        <>
          <FullMoonIcon/>
          full moon
        </>
        <>
          <MoonFirstQuarterIcon/>
          1st quarter
        </>
        <>
          <MoonLastQuarterIcon/>
          3rd quarter
        </>
        <>
        <MoonWaningCrescentIcon/>
         waning crescent
        </>
        <>
        <MoonWaxingCrescentIcon/>
         waxing crescent
        </>
        <>
        <MoonWaningGibbousIcon/>
          waning gibbous
        </>
        <>
        <MoonWaxingGibbousIcon/>
          waxing gibbous
        </>
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
      Zodiac signs
      <div className="flex h-32 bg-white">
        <AquariusIcon className={"h-32 "} color={"red"}  />
        <AriesIcon className={"h-32 "} color={"red"} />
        <CancerIcon className={"h-32 "} color={"red"} />
        <CapricornIcon className={"h-32 "} color={"red"} />
        <GeminiIcon className={"h-32 "} color={"red"} />
        <LeoIcon className={"h-32 "} color={"red"} />
      </div>
      <div className="flex h-32 bg-white">
        <LibraIcon className={"h-32 "} color={"red"} />
        <PiscesIcon className={"h-32 "} color={"red"} />
        <ScorpioIcon className={"h-32 "} color={"red"} />
        <SagittariusIcon className={"h-32 "} color={"red"} />
        <TaurusIcon className={"h-32 "} color={"red"} />
        <VirgoIcon className={"h-32 "} color={"red"} />
      </div>
    </>
  );
};

export default Page;