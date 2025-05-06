"use client";

// =======================
// Imports
// =======================

// React & Hooks
import React, { useRef, useState } from "react";

// Data fetching & State
import { useTRPC } from "@/app/creata/_trpc/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

// Animation
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Custom hooks & utils
import { usePrefetchVideoBlobsOnMount } from "../hooks/use-prefetch-video-blobs-on-mount";
import { fetchVideoBlob } from "../hooks/use-prefetch-video-blob";

// UI Components
import { ComponentLoading } from "@/components/ui/loading";
import { GlitchText } from "./glitch-text";
import FadeInOutWrapper from "./fade-in-out-wrapper";

// Styles
import "../styles/index.css";

// =======================
// Main Hero Section Component
// =======================
const HeroSection = () => {
  // ====== Data Fetching ======
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.award_winning_2024.getHeroVideos.queryOptions()
  ); // Fetch video data from the server

  // ====== State & Refs ======
  const totalVideos = data.length;
  const videoUrls = data.map((video) => video.url);
  const [hasClicked, setHasClicked] = useState(false); // Tracks if the user has clicked
  const [isLoading, setIsLoading] = useState(true); // Tracks loading state
  const [loadedVideos, setLoadedVideos] = useState(0); // Tracks the number of loaded videos
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the current video index
  const { isPrefetchingDone } = usePrefetchVideoBlobsOnMount(videoUrls);
  const nextVideoRef = useRef<HTMLVideoElement>(null); // Ref for the next video
  const videoFrameRef = useRef<HTMLDivElement | null>(null); // Ref for the video frame

  // Calculate indices for next and previous videos
  const upcomingVideoIndex = (currentIndex + 1) % totalVideos;
  const previousVideoIndex = (currentIndex - 1 + totalVideos) % totalVideos;

  // ====== Video Blob Prefetching ======
  // Loading the video blobs for the current, next, and previous videos
  const { data: previousBlob } = useQuery({
    queryKey: ["videoBlob", videoUrls[previousVideoIndex]],
    queryFn: () => fetchVideoBlob(videoUrls[previousVideoIndex]),
    enabled: isPrefetchingDone,
    staleTime: Infinity,
  });

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

  // ====== GSAP Animations ======
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.defaults({
    markers: true,
  });

  // Animation for video frame entrance
  useGSAP(
    () => {
      if (
        !isPrefetchingDone ||
        !currentBlob ||
        !nextBlob ||
        !videoFrameRef.current
      ) {
        return;
      }
      const el = videoFrameRef.current;

      gsap.set(el, {
        clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
        borderRadius: "0% 0% 40% 10%",
      });
      gsap.from(el, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        borderRadius: "0% 0% 0% 0%",
        ease: "power1.inOut",
        // scrollTrigger: {
        //   trigger: el,
        //   start: "center center",
        //   end: "bottom center",
        //   scrub: true,
        // },
      });
    },
    {
      dependencies: [
        videoFrameRef.current,
        isPrefetchingDone,
        currentBlob,
        nextBlob,
      ],
    }
  );

  // Animation for transitioning to next video
  useGSAP(
    () => {
      if (hasClicked && nextVideoRef.current) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {
            if (nextVideoRef.current) {
              nextVideoRef.current.play();
            }
          },
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  // ====== Handlers ======
  // Handles the click event to transition to the next video
  const handleMiniVideoClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalVideos);
  };

  // Handles the video load event
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => (prev + 1) % totalVideos);
  };

  // ====== Render Logic ======
  // Renders a fallback message if no videos are available
  if (!data || data.length === 0) {
    return <div>No videos available</div>;
  }

  // Show loading spinner while prefetching
  if (!isPrefetchingDone || !currentBlob || !nextBlob) {
    return (
      <div className=" w-screen h-screen inset-0 flex items-center pointer-events-auto justify-center invert z-20">
        <ComponentLoading className="invert" loading={true}></ComponentLoading>
      </div>
    );
  }

  // ====== Main Render ======
  return (
    <section className=" relative h-dvh w-screen">
      <div
        ref={videoFrameRef}
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
                ref={nextVideoRef}
                id="current-video"
                autoPlay
                muted
                preload="auto"
                loop
                className=" size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              >
                <source src={nextBlob} />
              </video>
            </div>
          </div>
          {/* Main video */}
          <video
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            ref={nextVideoRef}
            key={currentBlob}
            id="next-video"
            preload="auto"
            autoPlay
            muted
            loop
            onLoadedData={handleVideoLoad}
          >
            <source src={currentBlob} />
          </video>
          {/* Background previous video */}
          <video
            className="absolute left-0 top-0 size-full object-cover object-center"
            preload="auto"
            key={previousBlob}
            id="next-video"
            autoPlay
            muted
            loop
            onLoadedData={handleVideoLoad}
          >
            <source src={previousBlob} />
          </video>
        </div>
        {/* Text Overlay for the video */}

        <div className=" absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="hero-heading special-font ">
              <FadeInOutWrapper show key={currentIndex}>
                {data[currentIndex].second_title.slice(0, 1)}
                <b>{data[currentIndex].second_title.slice(1, 2)}</b>
                {data[currentIndex].second_title.slice(2)}
              </FadeInOutWrapper>
            </h1>
            <div className="flex flex-col gap-2">
              {data[currentIndex].description.map((desc, index) => (
                <FadeInOutWrapper show key={`${currentIndex}-${index}`}>
                  <p className="text-xl text-white max-w-72 font-robert-regular">
                    {desc}
                  </p>
                </FadeInOutWrapper>
              ))}
            </div>
          </div>
        </div>
      </div>
      <h1 className="flex hero-heading special-font absolute bottom-5 right-5 z-50 pointer-events-none">
        <GlitchText
          text={data[currentIndex].title.slice(0, 1)}
          duration={100}
        />
        <b>
          <GlitchText
            text={data[currentIndex].title.slice(1, 2)}
            duration={200}
          />
        </b>
        <GlitchText text={data[currentIndex].title.slice(2)} duration={300} />
      </h1>
      {/* Spacer divs for scroll testing */}
      <div className=" h-96"></div>
      <div className=" h-96"></div>
      <div className=" h-96"></div>
      <div className=" h-96"></div>
      <div className=" h-96"></div>
    </section>
  );
};

export default HeroSection;
