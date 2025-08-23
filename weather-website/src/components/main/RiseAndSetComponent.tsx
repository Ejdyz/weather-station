"use client"
import CircularSlider from "react-circular-slider-svg";
import Image from "next/image";

interface RiseAndSetProps {
  riseTime: Date; // local time of rise
  setTime: Date;  // local time of set
  currentTime: Date; // current local time
  type: "sun" | "moon"; // future usage (styling / icon)
  className?: string; // optional className for styling
}

export default function RiseAndSetComponent({
  riseTime,
  setTime,
  currentTime,
  type,
  className
}: RiseAndSetProps) {

  const icons = {
    rise: type === "sun" ? "/icons/sunrise.svg" : "/icons/moonrise.svg",
    set: type === "sun" ? "/icons/sunset.svg" : "/icons/moonset.svg",
    thumb: type === "sun" ? "/icons/clear-day.svg" : "/icons/moon-full.svg",
  }

  function getHoursAndMinutes(Date: Date): string {
    return `${Date.getHours()}:${Date.getMinutes().toString().padStart(2, "0")}`;
  }

  function calculatePercentage(current: Date, start: Date, end: Date): number {
    const total = end.getTime() - start.getTime();
    const progress = current.getTime() - start.getTime();
    return Math.max(0, Math.min(100, (progress / total) * 100));
  }

  const value = calculatePercentage(currentTime, riseTime, setTime);

  const isThumbHidden = value < 20 || value > 80;

  const size = 200;
  const radius = (size / 2) - 22;
  const startAngle = 90;
  const endAngle = 270;
  const angle = (startAngle + (value / 100) * (endAngle - startAngle)) + 90;
  const rad = (angle * Math.PI) / 180;

  const cx = (size) / 2 + radius * Math.cos(rad);
  const cy = (size) / 2 + radius * Math.sin(rad);

  return (
    <div className={className ?? "relative"} style={{ width: size, height: size }}>
      <CircularSlider
        size={size}
        startAngle={startAngle}
        endAngle={endAngle}
        handle1={{ value: value, onChange: () => {} }}
        handleSize={0} // or style handle transparent
        arcColor="#fff"
        disabled
      />
      <div className="w-full flex flex-row justify-between -mt-[130px]">
        <div className="text-center">
          <Image width={100}  height={100}  src={icons.rise} alt="Rise Icon" className="size-16 -left-2.5 relative"/>
          <p className="font-semibold text-white -mt-5 relative -left-2.5">{getHoursAndMinutes(riseTime)}</p>
        </div>
        <div className="text-center">
          <Image width={100}  height={100}  src={icons.set} alt="Set Icon" className="size-16 -right-2.5 relative"/>
          <p className="font-semibold text-white -mt-5 relative -right-2.5">{getHoursAndMinutes(setTime)}</p>
        </div>
      </div>
      <Image width={100}  height={100} 
        alt="Thumb Icon"
        src={icons.thumb}
        className={"pointer-events-none absolute w-12 h-12 " + (isThumbHidden ? "hidden" : "")}
        style={{ left: cx, top: cy, transform: "translate(-50%, -50%)" }}
      />
    </div>
  );
}
