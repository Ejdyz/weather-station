import "./mapcrop.css"
import {Spinner} from "@nextui-org/spinner";
const LoadingMap = () => {
  return (
    <div className="p-4">
      <div className="h-[90vh] rounded-2xl w-full grid align-middle">
        <Spinner size="lg"/>
      </div>
    </div>
  );
};

export default LoadingMap;