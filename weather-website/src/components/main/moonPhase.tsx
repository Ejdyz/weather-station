import {getMoonPhaseFraction, getMoonPhaseName} from "@/lib/utils";
import {getTranslator} from "@/lib/server-dictionary";

export default async function MoonPhase({date}:{date: Date}) {
  const { t } = await getTranslator();
  
  const moonPhaseFraction = getMoonPhaseFraction(date);
  const moonPhaseName = getMoonPhaseName(moonPhaseFraction);

  return (
    <div className="flex flex-col items-center justify-between gap-2 p-0 h-full">
      <img src={`/icons/moon-${moonPhaseName}.svg`} alt="Moon Phase" className="h-full -mt-5" />
      <p className="text-center font-semibold text-white lg:bottom-5 bottom-7 relative">{t(`moon_phases.${moonPhaseName.replace(/-/g,"_")}`)}</p>
    </div>
  )
}
