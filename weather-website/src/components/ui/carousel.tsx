"use client"
import { JSX, useEffect, useState } from 'react';
import { useKeenSlider } from "keen-slider/react";


export function Carousel({ slides, className, dotsClassName }:{slides: JSX.Element[], className?: string, dotsClassName?: string}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(prev => prev + 1);
    },
  });

  useEffect(() => {
    setLoaded(prev => prev + 1);
  }, []); 

  if (!slides || slides.length === 0) {
    return null;
  }

  if (loaded === 0) {
    return <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white' />;
  }

  return (
    <>
      <div className={"keen-slider " + (className?? "h-full")}  ref={sliderRef}>
        {slides.map((slide, index) => (
          <div key={index} className="keen-slider__slide flex justify-center items-center">{slide}</div>
        ))}
      </div>
      {loaded > 0 && instanceRef.current && (
        <div className={"flex justify-center gap-2 " + (dotsClassName ?? " ")}>
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={"rounded-full border-1 border-white size-2 cursor-pointer" + (currentSlide === idx ? " bg-white " : "")}
              ></button>
            );
          })}
        </div>
      )}
    </>
  )
}
