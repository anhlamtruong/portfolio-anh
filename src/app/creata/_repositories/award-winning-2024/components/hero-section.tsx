"use client";

// This component renders the Hero Section of the Award-Winning 2024 page.
// It fetches video data from the server using tRPC and preloads the current and next videos.
// Users can click to transition to the next video, and the component ensures smooth playback.

import React, { useState } from "react";
import { useTRPC } from "@/app/creata/_trpc/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import "../styles/index.css";
import { usePrefetchVideoBlobsOnMount } from "../hooks/use-perfetch-video-blobs-on-mount";
import { fetchVideoBlob } from "../hooks/use-prefetch-video-blob";
import { ComponentLoading } from "@/components/ui/loading";
// import { useVideoPreloader } from "../hooks/use-video-preload";

// Main Hero Section component
const HeroSection = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.award_winning_2024.getHeroVideos.queryOptions()
  ); // Fetch video data from the server
  const totalVideos = data.length;
  const videoUrls = data.map((video) => video.url);
  const [hasClicked, setHasClicked] = useState(false); // Tracks if the user has clicked
  const [isLoading, setIsLoading] = useState(true); // Tracks loading state
  const [loadedVideos, setLoadedVideos] = useState(0); // Tracks the number of loaded videos
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the current video index
  // const { getVideoSource } = useVideoPreloader(videoUrls, currentIndex); // Preloads video URLs
  const { isPrefetchingDone } = usePrefetchVideoBlobsOnMount(videoUrls);

  const upcomingVideoIndex = (currentIndex + 1) % totalVideos;

  const { data: currentBlob } = useQuery({
    queryKey: ["videoBlob", videoUrls[currentIndex]],
    queryFn: () => fetchVideoBlob(videoUrls[currentIndex]),
    enabled: isPrefetchingDone,
    staleTime: Infinity,
  });

  const { data: nextBlob } = useQuery({
    queryKey: ["videoBlob", videoUrls[upcomingVideoIndex]],
    queryFn: () => fetchVideoBlob(videoUrls[upcomingVideoIndex]),
    enabled: isPrefetchingDone,
    staleTime: Infinity,
  });
  // Handles the click event to transition to the next video
  const handleMiniVideoClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalVideos);
  };

  // Handles the video load event
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => (prev + 1) % totalVideos);
  };

  // Renders a fallback message if no videos are available
  if (!data || data.length === 0) {
    return <div>No videos available</div>;
  }

  if (!isPrefetchingDone || !currentBlob || !nextBlob) {
    return <ComponentLoading></ComponentLoading>;
  }

  return (
    <section className=" relative h-dvh w-screen">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-custom-blue-75"
      >
        <div>
          {/* Mini video for transitioning */}
          <div className="mask-clip-path absolute-center absolute-center z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVideoClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                key={nextBlob}
                id="current-video"
                autoPlay
                muted
                loop
                preload="auto"
                className=" size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              >
                <source src={nextBlob} />
              </video>
            </div>
          </div>
          {/* Main video */}
          <video preload="auto" key={currentBlob}>
            <source src={currentBlob} />
          </video>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
