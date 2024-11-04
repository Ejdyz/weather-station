import {MoonriseIcon, MoonsetIcon, SunRiseLine} from "@/components/icons/Icons";

const Moonrise = ({moonrise, moonset}) => {
  return (
    <div className="flex flex-row ">
      <div className="flex-col flex text-center gap-0 text-white">
        <MoonriseIcon  className="w-16 h-16" />
        {moonrise}
      </div>
      <SunRiseLine className="translate-y-[-1rem] w-full" />
      <div className="flex-col flex text-center gap-0 text-white">
        <MoonsetIcon className="w-16 h-16" />
        {moonset}
      </div>
    </div>
  );
};

export default Moonrise;