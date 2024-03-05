"use client"
import { Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";

const Section = (props) => {
  return (
    <section
      className={`h-screen flex flex-col justify-center p-10 ${
        props.right ? "items-end" : "items-start"
      }`}
      style={{
        opacity: props.opacity,
      }}
    >
      <div className="md:w-1/2 w-10/12 flex items-center justify-center">
        <div className=" md:w-9/12 w-full">
          <div className="bg-white  rounded-lg px-8 md:py-12 py-6">
            {props.children}
          </div>
        </div>
      </div>
    </section>
  );
};

export const Overlay = () => {
  const scroll = useScroll();
  const [opacitySecondSection, setOpacitySecondSection] = useState(1);
  const [opacityThirdSection, setOpacityThirdSection] = useState(1);
  const [opacityLastSection, setOpacityLastSection] = useState(1);

  useFrame(() => {
    setOpacitySecondSection(scroll.curve(2 / 10, 1 / 5));
    setOpacityThirdSection(scroll.curve(4 / 10, 1 / 5));
    setOpacityLastSection(scroll.curve(7 / 10, 1 / 5));
  });

  return (
    <>
      <Scroll html>
        <div className="w-screen">
          <section className="h-screen flex flex-col justify-center p-10 items-center"
          >
            <div className=" text-center ">
              <div className="w-full md:text-8xl text-5xl p-1 static md:mt-52 mt-28 text-white font-extrabold">
                Meteorologická stanice
              </div>
            </div>
          </section>
          <Section left opacity={opacitySecondSection}>
            <h1 className="font-semibold text-2xl">
              Proč meteorologickou stanici?
            </h1>
            <p className="mt-6 p-3 bg-slate-200 rounded-lg">
              Vytvořit meteorolickou stanici jako ročníkový projekt jsem se rozhodl,
              protože jsem chtěl vytvořit něco, co bude mít smysl a bude mít reálné využití.
            </p>
            <p className="mt-6 p-3 bg-slate-200 rounded-lg">
              Hodně ročníkových projektů se na konci roku zahodí a dal se jim nikdo nevěnuje a to jsem chtěl změnit.
            </p>
          </Section>
          <Section right opacity={opacityThirdSection}>
            <h1 className="font-semibold text-2xl">
              Co stanice umí?
            </h1>
            <p className="mt-6 p-3 bg-slate-200 rounded-lg">
              Stanice dokáže měřit teplotua a vlhkost vzduchu, tlak, oblačnost a srážky.
            </p>
            <p className="mt-6 p-3 bg-slate-200 rounded-lg">
              Vše následně odesíla na server, kde se data zpracovávají a zobrazují na webu.
            </p>
          </Section>
          <Section right opacity={opacityLastSection}>
            <h1 className="font-semibold text-2xl">
              Kdo za tím stojí?
            </h1>
            <div className="mt-6 flex w-full rounded-lg bg-slate-200 md:flex-row flex-col gap-1 justify-between">
              <p className=" p-3  h-full w-full">
                Jan Adam. 18 let. Student.
              </p>
              <img
                className="w-48 h-48 rounded-r-lg"
                src={"/images/profile.jpg"}
                alt="profile"/>
            </div>
          </Section>
            <section className="h-screen flex flex-col justify-center p-10 items-center"
            >
              <div className=" text-center">
                <div className="w-full  md:text-8xl text-5xl static pb-44 text-white font-extrabold">
                  Meteorologická stanice
                </div>
              </div>
            </section>
          </div>
      </Scroll>
    </>

);
};
