"use client";
import AnimatedWrapper from "./animation/animation-wrapper";
import CountingOdometer from "./components/counting-odometer";

export const AboutMeSection = () => {
  return (
    <div className="font-serif h-screen w-full flex flex-col items-center md:justify-start md:items-start  text-center lg:items-start lg:text-left p-4 md:p-8">
      <AnimatedWrapper>
        <h1 className=" text-white text-5xl sm:text-7xl md:text-8xl">
          Welcome!
        </h1>
      </AnimatedWrapper>
      <div className="text-pretty flex flex-wrap items-baseline justify-center lg:justify-end text-center mt-3 text-white gap-2 text-lg sm:text-xl md:text-2xl">
        <h2 className="-mr-1 mt-1">You are the</h2>
        <div className="transform scale-80 sm:scale-100 md:scale-100 lg:scale-120 origin-center md:translate-y-1">
          <CountingOdometer
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl "
            amount={20000}
          />
        </div>
        <span className="text-sm mb-3">th</span>
        <h2 className="-ml-1 mt-1">person who visit my page 🙌</h2>
      </div>
    </div>
  );
};
