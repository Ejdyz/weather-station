"use client"
import React, { useEffect, useRef } from 'react';
import "./style.css";
import MyNavBar from "@/components/navbar/MyNavbar";

const MyComponent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const currentFrame = index => (
      `/images/${index.toString().padStart(4,"0")}.png`
    );

    const frameCount = 204;
    canvas.height = 1080;
    canvas.width = 1920;

    // Preload the initial image
    const initialImg = new Image();
    initialImg.src = currentFrame(1);
    initialImg.onload = function() {
      context.drawImage(initialImg, 0, 0);
    };

    const updateImage = index => {
      const src = currentFrame(index);
      const cachedImage = localStorage.getItem(src);
      if (cachedImage) {
        const img = new Image();
        img.src = cachedImage;
        img.onload = function() {
          context.drawImage(img, 0, 0);
        };
      } else {
        const img = new Image();
        img.onload = function() {
          context.drawImage(img, 0, 0);
          localStorage.setItem(src, img.src); // Cache the image
        };
        img.src = src;
      }
    };

    let lastKnownScrollPosition = 0;
    let ticking = false;

    const handleScroll = () => {
      lastKnownScrollPosition = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = lastKnownScrollPosition;
          const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
          const scrollFraction = scrollTop / maxScrollTop;
          const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(scrollFraction * frameCount)
          );

          updateImage(frameIndex + 1);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <MyNavBar page={"about"} />
      <div className="body text-white ">
        <div className="p-20 px-30 w-full z-20 absolute text-left h-[1600px]">
          <div className="sticky top-2">
            <h1 className=" text-6xl  font-extrabold">Moje meteorologická stanice</h1>
            <p className= "text-2xl font-thin max-w-[40vw]">Jako svůj ročníkový projekt do 3. ročníku střední školy jsem si vymyslel vytvoření meteorologické stanice společně s grafickým rozhraním</p>
          </div>
        </div>
        <div className=" px-20 w-full z-20 absolute top-[1500px]  h-[960px]">
          <div className="sticky top-32 flex flex-col justify-end items-end">
            <h1 className=" text-6xl  font-extrabold">Kulaté tělo</h1>
            <h2 className="text-2xl text-right w-96 font-thin">Meteorologická stanice, která je vytvořena na 3D tiskárně disponuje kulatým tělem. <br/> Je to jednodušší z jak pro 3d tisk tak i pro stékající kapky vody.</h2>
          </div>
        </div>
        <div className=" px-20 w-full z-20 absolute top-[3940px] h-full ">
          <div className="sticky top-4 flex flex-col items-center">
            <h1 className=" text-6xl  font-extrabold">Modulární části</h1>
            <h2 className="text-2xl text-right font-thin">Celou stanici jsem rozdělil na modulární části, které do sebe jednoduše zapadnou a je jednoduché s nimi pracovat</h2>
          </div>
        </div>

        <canvas className="canvas " ref={canvasRef}></canvas>
      </div>
    </>
  );
}

export default MyComponent;