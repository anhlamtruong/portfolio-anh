"use client";

import React, { useRef, useState } from "react";
import "../styles/index.css";
import { useTRPC } from "@/app/creata/_trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

const HeroSection = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.award_winning_2024.getHeroVideos.queryOptions()
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = data.length;
  const nextVideoRef = useRef(null);

  const upcomingVideoIndex = (currentIndex + 1) % totalVideos;

  const handleMiniVideoClick = () => {
    setHasClicked(true);

    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalVideos);
  };

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => (prev + 1) % totalVideos);
    // if (loadedVideos === totalVideos - 1) {
    //   setIsLoading(false);
    // }
  };

  const getVideoSource = (index: number) => {
    const video = data[index];
    return video ? video.url : undefined;
  };

  if (!data || data.length === 0) {
    return <div>No videos available</div>;
  }

  return (
    <section className=" relative h-dvh w-screen">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-custom-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute-center z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVideoClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                key={upcomingVideoIndex}
                id="current-video"
                autoPlay
                muted
                loop
                className=" size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              >
                <source
                  src={getVideoSource(upcomingVideoIndex)}
                  ref={nextVideoRef}
                />
              </video>
              {/* Preload Next Video */}
              <video
                ref={nextVideoRef}
                style={{ display: "none" }} // Hidden video for preloading
              >
                <source src={getVideoSource(upcomingVideoIndex)} />
              </video>
              <video
                ref={nextVideoRef}
                style={{ display: "none" }} // Hidden video for preloading
              >
                <source
                  src={getVideoSource((upcomingVideoIndex + 1) % totalVideos)}
                />
              </video>
            </div>
          </div>
          <video key={currentIndex}>
            <source ref={nextVideoRef} src={getVideoSource(currentIndex)} />
          </video>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
