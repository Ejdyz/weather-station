"use client"
import {Spinner} from "@nextui-org/spinner";
import {Table} from "@/components/tables/table";

export default function App({data, loading}) {
  return (
    <>
      <div className={"grid justify-center"}>
        {loading? (
          <div className="md:ml-[5vw] md:w-[90vw] w-[94vw] px-2 h-[300px] grid  justify-center ">
            <Spinner size="lg"/>
          </div>
        ) :(
          <div className="overflow-y-hidden mt-2 px-2 w-full" >
            <Table data={data}/>
          </div>)}
      </div>
    </>
  );

}
