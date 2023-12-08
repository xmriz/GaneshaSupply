"use client"
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    AOS.init({
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      delay: 1000,
    });
  });

  return (
    <div className="bg-green min-h-screen flex items-center -mt-28" >
      <div className="container mx-auto items-center justify-center flex flex-col-reverse lg:flex-row">
        <div className="text-white flex flex-col gap-5 justify-center z-10 text-center lg:text-left lg:w-1/2" data-aos="fade=-right">
          <div className="text-5xl lg:text-[80px]">
            <h1 className="font-bold leading-[80px]">Welcome to</h1>
            <h1 className="font-bold">GaneshaSupply!</h1>
          </div>
          <p className="text-[20px] w-[580px] mt-3">
            Get your supply of stationaries and printing goods for your campus
            needs here!
          </p>
        </div>
        <div className="flex justify-center lg:w-1/2 -translate-y-11 w-2/3" data-aos="fade-left">
          <Image
            alt="hero-image "
            src="/images/hero.svg"
            width={500}
            height={500}
            className="translate-y-10 w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
