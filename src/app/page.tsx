import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-green min-h-screen flex items-center">
      <div className=" mx-auto flex items-center">
        <div className="px-16 text-white flex flex-col gap-5 ">
          <div className="">
            <h1 className="text-[80px] font-bold leading-[80px]">Welcome to</h1>
            <h1 className="text-[80px] font-bold">GaneshaSupply!</h1>
          </div>
          <p className="text-[20px]">
            Get your supply of stationaries and printing goods for your campus
            needs here!
          </p>
        </div>
        <div>
          <Image
            alt="hero-image "
            src="/images/hero-image.png"
            width={500}
            height={500}
            className="w-[850px] translate-y-10"
          />
        </div>
      </div>
    </div>
  );
}
