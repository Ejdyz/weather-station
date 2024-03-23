import {Spinner} from "@nextui-org/spinner";

const MainChartLoading = ({isForHistory}) => {
  return (
    <div className={`${!isForHistory && "md:ml-[5vw]"} md:w-[90vw] w-[94vw]  h-[356px]  text-white flex justify-center`}>
      <Spinner size="lg" />
    </div>
  );
};

export default MainChartLoading;