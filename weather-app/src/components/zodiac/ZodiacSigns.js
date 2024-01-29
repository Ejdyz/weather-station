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

const ZodiacSigns = async ({className}) => {
  const sign = await getZodiacSign()
  if (sign === "Aries"){
    return (
      <AriesIcon className={className} color={"white"} />
    );
  }
  if (sign === "Taurus"){
    return (
      <TaurusIcon className={className} color={"white"} />
    );
  }
  if (sign === "Gemini"){
    return (
      <GeminiIcon className={className} color={"white"} />
    );
  }
  if (sign === "Cancer"){
    return (
      <CancerIcon className={className} color={"white"} />
    );
  }
  if (sign === "Leo"){
    return (
      <LeoIcon className={className} color={"white"} />
    );
  }
  if (sign === "Virgo"){
    return (
      <VirgoIcon className={className} color={"white"} />
    );
  }
  if (sign === "Libra"){
    return (
      <LibraIcon className={className} color={"white"} />
    );
  }
  if (sign === "Scorpio"){
    return (
      <ScorpioIcon className={className} color={"white"} />
    );
  }
  if (sign === "Sagittarius"){
    return (
      <SagittariusIcon className={className} color={"white"} />
    );
  }
  if (sign === "Capricorn"){
    return (
      <CapricornIcon className={className} color={"white"} />
    );
  }
  if (sign === "Aquarius"){
    return (
      <AquariusIcon className={className} color={"white"} />
    );
  }
  if (sign === "Pisces"){
    return (
      <PiscesIcon className={className} color={"white"} />
    );
  }
  return (
    <TaurusIcon className={className} color={"white"} />
  );
};
export default ZodiacSigns;