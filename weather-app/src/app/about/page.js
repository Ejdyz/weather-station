"use client"
import {Canvas} from "@react-three/fiber";
import Experience from "@/components/Experience";
import MyNavBar from "@/components/navbar/MyNavbar"
import "./noSlider.css"
export default function App() {

  return (
    <>
      <div className="bg-gradient-to-br from-gray-900 to-gray-800">
        <MyNavBar page="about" />
      </div>
      <div className="w-scren h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-900 to-gray-800">
        <Canvas >
          <Experience />
        </Canvas>
      </div>
    </>
  );
}
