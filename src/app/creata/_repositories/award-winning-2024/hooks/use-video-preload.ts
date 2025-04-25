"use client";

import { useEffect, useRef } from "react";

interface VideoCache {
  [key: string]: string;
}

export const useVideoPreload = (videoUrls: string[]) => {
  const videoCache = useRef<VideoCache>({});

  useEffect(() => {
    const preloadVideos = async () => {
      try {
        // Create blob URLs for each video and store in cache
        await Promise.all(
          videoUrls.map(async (url) => {
            if (!videoCache.current[url]) {
              const response = await fetch(url);
              const blob = await response.blob();
              videoCache.current[url] = URL.createObjectURL(blob);
            }
          })
        );
      } catch (error) {
        console.error("Error preloading videos:", error);
      }
    };

    preloadVideos();

    // Cleanup blob URLs on unmount
    return () => {
      Object.values(videoCache.current).forEach((blobUrl) => {
        URL.revokeObjectURL(blobUrl);
      });
    };
  }, [videoUrls]);

  const getVideoBlobUrl = (url: string) => videoCache.current[url] || url;

  return { getVideoBlobUrl };
};
