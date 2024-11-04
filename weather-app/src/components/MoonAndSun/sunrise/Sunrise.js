import {SunriseIcon, SunRiseLine, SunsetIcon} from "@/components/icons/Icons";

const Sunrise = ({sunrise, sunset}) => {

  return (
    <div className="flex flex-row ">
        <div className="flex-col flex text-center gap-0 text-white">
          <SunriseIcon className="w-16 h-16" />
          {sunrise}
        </div>
      <SunRiseLine className="translate-y-[-1rem] w-full" />
      <div className="flex-col flex text-center gap-0 text-white">
          <SunsetIcon className="w-16 h-16" />
          {sunset}
      </div>
    </div>
  );
};

export default Sunrise;