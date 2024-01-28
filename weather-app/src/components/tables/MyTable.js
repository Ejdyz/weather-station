"use client"
import {Spinner} from "@nextui-org/spinner";
import {VercelTable} from "@/components/component/vercel-table";

export default function App({data,forWhat, loading}) {
  return (
    <>
      <div className={"grid justify-center"}>
        {loading? (
          <div className="w-[1300px] h-[300px] grid  justify-center ">
            <Spinner size="lg"/>
          </div>
        ) :(
          <div className="overflow-y-hidden" style={{marginTop:"10px",width: "100%",}}>
            <VercelTable data={data}/>
          </div>)}
      </div>
    </>
  );

}
