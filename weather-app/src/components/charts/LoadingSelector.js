import {Spinner} from "@nextui-org/spinner";
import Divider from "@/components/Divider";
const LoadingSelector = () => {
  return (
    <div className="flex justify-center flex-col items-center">
      <Divider>
        <div className=" rounded-xl  p-1 bg-[#f4f4f5] flex flex-row max-w-fit">
          <div className="bg-primary py-1.5 px-3 mr-2 text-sm  rounded-lg text-white">Grafy</div>
          <div className="bg-none px-3 text-sm py-1.5 rounded-lg text-gray-500 ">Tabulka</div>
        </div>
      </Divider>
      <div className="p-4">
        <div className="h-[90vh] rounded-2xl w-full grid align-middle">
        <Spinner size="lg"/>
        </div>
      </div>
    </div>
  );
}
export default LoadingSelector;