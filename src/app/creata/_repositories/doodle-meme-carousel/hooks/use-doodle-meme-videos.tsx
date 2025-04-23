"use client";

import { useQuery } from "@tanstack/react-query";
import { getDoddleMemeVideosFromStorage } from "../service/doodle-meme-videos";

export const useDoddleMemeVideos = () => {
  return useQuery({
    queryKey: ["doddle-meme-videos"],
    queryFn: () => getDoddleMemeVideosFromStorage(),
  });
};
