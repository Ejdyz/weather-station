"use client"
import {Environment, ScrollControls} from "@react-three/drei";
import {Station} from "@/components/Models/Station";
import {Overlay} from "@/components/Overlay";
const Experience = () => {
  return (
    <>
      {/* Use DirectionalLight instead osf ambientLight */}
      <Environment preset={"city"} />
      <ScrollControls pages={5} damping={0.25} >
        <Overlay />
        <Station />
      </ScrollControls>
    </>
  );
};

export default Experience;