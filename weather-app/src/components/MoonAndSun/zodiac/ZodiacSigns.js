import {getZodiacSign} from "@/lib/weatherData";
import {
  AquariusIcon,
  AriesIcon,
  CancerIcon, CapricornIcon,
  GeminiIcon,
  LeoIcon, LibraIcon,
  PiscesIcon, SagittariusIcon, ScorpioIcon,
  TaurusIcon, VirgoIcon
} from "@/components/icons/Icons";

function translate(sign) {
  if (sign === "Aries") return "Beran"
  if (sign === "Taurus") return "Býk"
  if (sign === "Gemini") return "Blíženci"
  if (sign === "Cancer") return "Rak"
  if (sign === "Leo") return "Lev"
  if (sign === "Virgo") return "Panna"
  if (sign === "Libra") return "Váhy"
  if (sign === "Scorpio") return "Štír"
  if (sign === "Sagittarius") return "Střelec"
  if (sign === "Capricorn") return "Kozoroh"
  if (sign === "Aquarius") return "Vodnář"
  if (sign === "Pisces") return "Ryby"
  return "Býk"
}


const ZodiacSigns = async ({className}) => {
  const sign = await getZodiacSign()
  if (sign === "Aries"){
    return (
      <div>
        <AriesIcon className={className} color={"white"} />
        <h3 className="text-white text-center">{translate(sign)}</h3>
      </div>
    );
  }
  if (sign === "Taurus"){
    return (
      <div>
        <TaurusIcon className={className} color={"white"} />
        <h3 className="text-white text-center">{translate(sign)}</h3>
      </div>
    );
  }
  if (sign === "Gemini"){
    return (
      <div>
        <GeminiIcon className={className} color={"white"} />
        <h3 className="text-white text-center">{translate(sign)}</h3>
      </div>
    );
  }
  if (sign === "Cancer"){
    return (
      <div>
        <CancerIcon className={className} color={"white"} />
        <h3 className="text-white text-center">{translate(sign)}</h3>
      </div>
    );
  }
  if (sign === "Leo"){
    return (
      <div>
        <LeoIcon className={className} color={"white"} />
        <h3 className="text-white text-center">{translate(sign)}</h3>
      </div>
    );
  }
  if (sign === "Virgo"){
    return (
      <div>
        <VirgoIcon className={className} color={"white"} />
        <h3 className="text-white text-center">{translate(sign)}</h3>
      </div>
    );
  }
  if (sign === "Libra"){
    return (
      <div>
        <LibraIcon className={className} color={"white"} />
        <h3 className="text-white text-center">{translate(sign)}</h3>
      </div>
    );
  }
  if (sign === "Scorpio"){
    return (
      <div>
        <ScorpioIcon className={className} color={"white"} />
        <h3 className="text-white text-center">{translate(sign)}</h3>
      </div>
    );
  }
  if (sign === "Sagittarius"){
    return (
      <div>
        <SagittariusIcon className={className} color={"white"} />
        <h3 className="text-white text-center">{translate(sign)}</h3>
      </div>
    );
  }
  if (sign === "Capricorn"){
    return (
      <div>
        <CapricornIcon className={className} color={"white"} />
        <h3 className="text-white text-center">{translate(sign)}</h3>
      </div>
    );
  }
  if (sign === "Aquarius"){
    return (
      <div>
        <AquariusIcon className={className} color={"white"} />
        <h3 className="text-white text-center">{translate(sign)}</h3>
      </div>
    );
  }
  if (sign === "Pisces"){
    return (
      <div>
        <PiscesIcon className={className} color={"white"} />
        <h3 className="text-white text-center">{translate(sign)}</h3>
      </div>
    );
  }
  return (
    <div>
      <TaurusIcon className={className} color={"white"} />
      <h3 className="text-white text-center">{translate(sign)}</h3>
    </div>
  );
};
export default ZodiacSigns;