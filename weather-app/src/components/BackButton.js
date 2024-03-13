"use client"
import {Button} from "@nextui-org/button";
import {useRouter} from "next/navigation";
import {ArrowLeft} from "lucide-react";
const BackButton = ({className}) => {
  const router = useRouter();
  return (
    <>
      <Button className={className? className : "absolute md:m-16 m-5 mt-14"} variant="light" isIconOnly onClick={()=>{router.back()}}>
        <ArrowLeft size={24} color={"white"}/>
      </Button>
    </>
  );
};

export default BackButton;