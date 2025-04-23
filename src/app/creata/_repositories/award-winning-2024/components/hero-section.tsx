"use client";
import React, { useRef, useState } from "react";
import "../styles/index.css";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const nextVideoRef = useRef(null);

  const handleMiniVideoClick = () => {
    setHasClicked(true);

    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalVideos);
  };
  return (
    <section className=" relative h-dvh w-screen">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-custom-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute-center z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div onClick={handleMiniVideoClick} className="origin-center">
              <video ref={nextVideoRef} src=""></video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
