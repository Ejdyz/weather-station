import {getMoonPhase} from "@/lib/weatherData";
import {
  FullMoonIcon,
  MoonFirstQuarterIcon,
  MoonLastQuarterIcon,
  MoonWaningCrescentIcon,
  MoonWaningGibbousIcon,
  MoonWaxingCrescentIcon,
  MoonWaxingGibbousIcon,
  NewMoonIcon
} from "@/components/icons/Icons";

const MoonPhase = async ({className}) => {
  const moonPhase = await getMoonPhase()
  if (moonPhase === "New Moon"){
    return (
      <NewMoonIcon className={className} />
    );
  }
  if (moonPhase === "Full Moon"){
    return (
      <FullMoonIcon className={className} />
    );
  }
  if (moonPhase === "Waning Gibbous"){
    return (
      <MoonWaningGibbousIcon className={className} />
    );
  }
  if (moonPhase === "Waning Crescent"){
    return (
      <MoonWaningCrescentIcon className={className} />
    );
  }
  if (moonPhase === "1st Quarter"){
    return (
      <MoonFirstQuarterIcon className={className} />
    );
  }
  if (moonPhase === "3rd Quarter"){
    return (
      <MoonLastQuarterIcon className={className} />
    );
  }
  if (moonPhase === "Waxing Gibbous"){
    return (
      <MoonWaxingGibbousIcon className={className} />
    );
  }
  if (moonPhase === "Waxing Crescent"){
    return (
      <MoonWaxingCrescentIcon className={className} />
    );
  }
  return (
    <NewMoonIcon className={className} />
  );
};

export default MoonPhase;