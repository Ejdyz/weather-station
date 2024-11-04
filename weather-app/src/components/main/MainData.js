import {BarometerIcon, HumidityIcon, ThermometerIcon} from "@/components/icons/Icons";

const MainData = ({data}) => {
  return (
    <>
      <div className="text-white md:text-5xl text-3xl  font-thin md:ml-20">
        <div className="flex flex-row justify-between items-center w-11/12 md:w-1/3">
          <div className="flex items-center  ">
            <ThermometerIcon className="w-16 "/>
            <h2>{"Teplota: "}</h2>
          </div>
          <div className="flex">
            <h2 className={"font-bold mr-1"}> {data?.temperature}</h2><h2>°C</h2>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center w-11/12 md:w-1/3 md:ml-10">
          <div className="flex items-center ">
            <HumidityIcon className="w-16 "/>
            <h2>{"Vlhkost: "}</h2>
          </div>
          <div className="flex">
            <h2 className={"font-bold mr-1"}> {data?.humidity}</h2><h2>%</h2>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center w-11/12 md:w-1/3 ml-2 md:ml-20">
          <div className="flex items-center ">
            <BarometerIcon className="md:w-16 w-14"/>
            <h2>{"Tlak: "}</h2>
          </div>
          <div className="flex">
            <h2 className={"font-bold mr-1"}> {data?.pressure}</h2><h2>hPa</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainData;