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

const ZodiacSigns = async () => {
  const sign = await getZodiacSign()
  console.log(sign)
  if (sign === "Aries"){
    return (
      <AriesIcon className="w-20 h-20" color={"white"} />
    );
  }
  if (sign === "Taurus"){
    return (
      <TaurusIcon className="w-20 h-20" color={"white"} />
    );
  }
  if (sign === "Gemini"){
    return (
      <GeminiIcon className="w-20 h-20" color={"white"} />
    );
  }
  if (sign === "Cancer"){
    return (
      <CancerIcon className="w-20 h-20" color={"white"} />
    );
  }
  if (sign === "Leo"){
    return (
      <LeoIcon className="w-20 h-20" color={"white"} />
    );
  }
  if (sign === "Virgo"){
    return (
      <VirgoIcon className="w-20 h-20" color={"white"} />
    );
  }
  if (sign === "Libra"){
    return (
      <LibraIcon className="w-20 h-20" color={"white"} />
    );
  }
  if (sign === "Scorpio"){
    return (
      <ScorpioIcon className="w-20 h-20" color={"white"} />
    );
  }
  if (sign === "Sagittarius"){
    return (
      <SagittariusIcon className="w-20 h-20" color={"white"} />
    );
  }
  if (sign === "Capricorn"){
    return (
      <CapricornIcon className="w-20 h-20" color={"white"} />
    );
  }
  if (sign === "Aquarius"){
    return (
      <AquariusIcon className="w-20 h-20" color={"white"} />
    );
  }
  if (sign === "Pisces"){
    return (
      <PiscesIcon className="w-20 h-20" color={"white"} />
    );
  }
  return (
    <TaurusIcon className="w-20 h-20" color={"white"} />
  );
};
export default ZodiacSigns;