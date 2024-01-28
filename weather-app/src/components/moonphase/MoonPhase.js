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

const MoonPhase = async () => {
  const moonPhase = await getMoonPhase()
  if (moonPhase === "New Moon"){
    return (
      <NewMoonIcon className="w-32 h-32" />
    );
  }
  if (moonPhase === "Full Moon"){
    return (
      <FullMoonIcon className="w-32 h-32" />
    );
  }
  if (moonPhase === "Waning Gibbous"){
    return (
      <MoonWaningGibbousIcon className="w-32 h-32" />
    );
  }
  if (moonPhase === "Waning Crescent"){
    return (
      <MoonWaningCrescentIcon className="w-32 h-32" />
    );
  }
  if (moonPhase === "1st Quarter"){
    return (
      <MoonFirstQuarterIcon className="w-32 h-32" />
    );
  }
  if (moonPhase === "3rd Quarter"){
    return (
      <MoonLastQuarterIcon className="w-32 h-32" />
    );
  }
  if (moonPhase === "Waxing Gibbous"){
    return (
      <MoonWaxingGibbousIcon className="w-32 h-32" />
    );
  }
  if (moonPhase === "Waxing Crescent"){
    return (
      <MoonWaxingCrescentIcon className="w-32 h-32" />
    );
  }
  return (
    <NewMoonIcon className="w-32 h-32" />
  );
};

export default MoonPhase;