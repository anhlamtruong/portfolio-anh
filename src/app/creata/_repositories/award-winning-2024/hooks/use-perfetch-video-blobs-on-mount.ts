"use client";

import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { fetchVideoBlob } from "./use-prefetch-video-blob";

export const usePrefetchVideoBlobsOnMount = (videoUrls: string[]) => {
  const queryClient = useQueryClient();
  const [isPrefetchingDone, setIsPrefetchingDone] = useState(false);

  useEffect(() => {
    if (!videoUrls || videoUrls.length === 0) return;

    const prefetchBlobs = async () => {
      await Promise.all(
        videoUrls.map((url) =>
          queryClient.prefetchQuery({
            queryKey: ["videoBlob", url],
            queryFn: () => fetchVideoBlob(url),
            staleTime: Infinity,
          })
        )
      );
      setIsPrefetchingDone(true);
    };

    prefetchBlobs();
  }, [queryClient, videoUrls]);

  return { isPrefetchingDone };
};
