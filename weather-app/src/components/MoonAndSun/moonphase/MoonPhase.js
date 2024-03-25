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

  const translate = (moonPhase) => {
    if (moonPhase === "New Moon") return "Nov";
    if (moonPhase === "Full Moon") return "Úplněk";
    if (moonPhase === "Waning Gibbous") return "Ubývající srpek";
    if (moonPhase === "Waning Crescent") return "Ubývající měsíc";
    if (moonPhase === "1st Quarter") return "První čtvrť";
    if (moonPhase === "3rd Quarter") return "Třetí čtvrť";
    if (moonPhase === "Waxing Gibbous") return "Přibývající srpek";
    if (moonPhase === "Waxing Crescent") return "Přibývající měsíc";
    return "Nov";
  }
  if (moonPhase === "New Moon"){
    return (
      <div>

        <NewMoonIcon className={className} />
        <h3 className="text-white text-center">{translate(moonPhase)}</h3>
      </div>
    );
  }
  if (moonPhase === "Full Moon"){
    return (
      <div>

        <FullMoonIcon className={className} />
        <h3 className="text-white text-center">{translate(moonPhase)}</h3>
      </div>
    );
  }
  if (moonPhase === "Waning Gibbous"){
    return (
      <div>

        <MoonWaningGibbousIcon className={className} />
        <h3 className="text-white text-center">{translate(moonPhase)}</h3>
      </div>
    );
  }
  if (moonPhase === "Waning Crescent"){
    return (
      <div>

        <MoonWaningCrescentIcon className={className} />
        <h3 className="text-white text-center">{translate(moonPhase)}</h3>
      </div>
    );
  }
  if (moonPhase === "1st Quarter"){
    return (
      <div>

        <MoonFirstQuarterIcon className={className} />
        <h3 className="text-white text-center">{translate(moonPhase)}</h3>
      </div>
    );
  }
  if (moonPhase === "3rd Quarter"){
    return (
      <div>

        <MoonLastQuarterIcon className={className} />
        <h3 className="text-white text-center">{translate(moonPhase)}</h3>
      </div>
    );
  }
  if (moonPhase === "Waxing Gibbous"){
    return (
      <div>

        <MoonWaxingGibbousIcon className={className} />
        <h3 className="text-white text-center">{translate(moonPhase)}</h3>
      </div>
    );
  }
  if (moonPhase === "Waxing Crescent"){
    return (
      <div>

        <MoonWaxingCrescentIcon className={className} />
        <h3 className="text-white text-center">{translate(moonPhase)}</h3>
      </div>
    );
  }
  return (
    <div>

      <NewMoonIcon className={className} />
      <h3 className="text-white text-center">{translate(moonPhase)}</h3>
    </div>
  );
};

export default MoonPhase;