"use client"
import {Spinner} from "@nextui-org/spinner";
import {VercelTable} from "@/components/tables/vercel-table";

export default function App({data, loading}) {
  return (
    <>
      <div className={"grid justify-center"}>
        {loading? (
          <div className="w-[1300px] h-[300px] grid  justify-center ">
            <Spinner size="lg"/>
          </div>
        ) :(
          <div className="overflow-y-hidden mt-2 px-2 w-full" >
            <VercelTable data={data}/>
          </div>)}
      </div>
    </>
  );

}
