import {getTranslator} from "@/lib/server-dictionary";
import Image from "next/image";

export default async function GoldenHour({date}:{date: string}) {
  const { t } = await getTranslator();  

  return (
    <div className="flex flex-col items-center justify-between gap-2 p-0 h-full">
      <Image width={100}  height={100}  src={`/icons/golden-hour.svg`} alt="Golden Hour" className="h-[calc(100%-1rem)] -mt-5" />
      <div className="lg:bottom-5 bottom-7 relative">
        <p className="text-center font-bold mt-1 text-white">{date}</p>
        <p className="text-center text-sm -mt-1 text-white">{t(`golden_hour`)}</p>
      </div>
    </div>
  )
}
