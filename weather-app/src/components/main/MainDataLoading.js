import {Spinner} from "@nextui-org/spinner";

const MainDataLoading = () => {
  return (
    <>
      <div className="text-white font-thin md:ml-20 flex-col flex gap-10 justify-evenly">
        <div className="flex flex-row h-7 justify-center items-center w-11/12 md:w-1/3">
          <Spinner size="lg" />
        </div>
        <div className="flex flex-row h-7 justify-center items-center w-11/12 md:w-1/3 md:ml-10">
          <Spinner size="lg"/>
        </div>
        <div className="flex flex-row h-7 justify-center items-center w-11/12 md:w-1/3 ml-2 md:ml-20">
          <Spinner size="lg" />

        </div>
      </div>
    </>
  );
};

export default MainDataLoading;