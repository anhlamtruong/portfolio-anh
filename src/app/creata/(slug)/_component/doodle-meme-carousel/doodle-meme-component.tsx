/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { defaultCarouselConfig } from "./doodle-meme-carousel-config";
import DoodleMemeCarousal from "./doodle-meme-carousel";
import ErrorFallback from "../../../_component/error-fall-back";
import { VideoDisplay } from "../../../_component/videos-display";
import Loading from "../../../(homepage)/loading";
import { useDoddleMemeVideos } from "./hooks/use-doodle-meme-videos";

interface DoodleMemeComponentProps {
  component_id: string;
  description: string;
  link: string;
  thumbnails: string;
  title: string;
  config: Record<string, any>;
}

const DoodleMemeComponent: React.FC<DoodleMemeComponentProps> = ({
  title,
  config,
}) => {
  const mergedConfig = {
    ...defaultCarouselConfig,
    ...config,
  };
  const [allLoaded, setAllLoaded] = useState(false);
  const { data: videos, isLoading, isError } = useDoddleMemeVideos();

  useEffect(() => {
    if (!isLoading && videos && videos.length) {
      const loadVideo = (src: string) =>
        new Promise((resolve, reject) => {
          const video = document.createElement("video");
          video.src = src;
          video.onloadeddata = () => resolve(src);
          video.onerror = () => reject(new Error(`Failed to load ${src}`));
        });

      Promise.all(videos.map((video) => loadVideo(video.path)))
        .then(() => {
          setAllLoaded(true);
        })
        .catch((err) => {
          console.error(err);
          // Handle errors or set an error state here.
        });
    }
  }, [isLoading, videos]);

  if (isLoading || !allLoaded) {
    return <Loading />;
  }

  if (isError || !videos) {
    return (
      <ErrorFallback
        error="Could not load videos"
        resetErrorBoundary={() => {}}
      />
    );
  }

  return (
    <main className="p-5 w-screen h-screen">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="container p-8 aspect-video mx-auto">
        <DoodleMemeCarousal config={mergedConfig}>
          {React.Children.toArray(
            videos.length === 0 ? (
              <div className="text-center">No videos found.</div>
            ) : (
              videos.map((video) => (
                <VideoDisplay
                  key={video.name}
                  title={video.name}
                  src={video.path}
                  loop={true}
                  autoPlay={true}
                  muted={true}
                />
              ))
            )
          )}
        </DoodleMemeCarousal>
      </div>
    </main>
  );
};

export default DoodleMemeComponent;
