"use client";

import { useEffect, useState } from "react";
// Custom hook for preloading video URLs
// Ensures smooth transitions between videos by preloading them in advance
export const useVideoPreloader = (
  videoUrls: string[],
  currentIndex: number
) => {
  const [videoCache, setVideoCache] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    if (!videoUrls || videoUrls.length === 0) return;

    const preloadVideo = async (index: number) => {
      if (!videoCache[index] && videoUrls[index]) {
        const res = await fetch(videoUrls[index]);
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        setVideoCache((prev) => ({ ...prev, [index]: blobUrl }));
      }
    };

    preloadVideo(currentIndex);
    preloadVideo((currentIndex + 1) % videoUrls.length);
    preloadVideo((currentIndex + 2) % videoUrls.length);

    return () => {
      const unusedIndex =
        (currentIndex - 1 + videoUrls.length) % videoUrls.length;
      if (videoCache[unusedIndex]) {
        URL.revokeObjectURL(videoCache[unusedIndex]);
        setVideoCache((prev) => {
          const updated = { ...prev };
          delete updated[unusedIndex];
          return updated;
        });
      }
    };
  }, [currentIndex, videoUrls, videoCache]);

  const getVideoSource = (index: number) => {
    return videoCache[index] || undefined;
  };

  return { getVideoSource };
};
