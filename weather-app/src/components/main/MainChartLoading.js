import {Spinner} from "@nextui-org/spinner";

const MainChartLoading = () => {
  return (
    <div className="md:ml-[5vw] md:w-[90vw] w-[94vw] h-[300px] flex justify-center">
      <Spinner size="lg" />
    </div>
  );
};

export default MainChartLoading;