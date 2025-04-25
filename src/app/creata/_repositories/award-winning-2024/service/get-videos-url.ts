import { storage } from "@/services/firebase/service-provider";
import { getDownloadURL, ref } from "firebase/storage";
import { award_winning_2024_config } from "../config";

export const getVideoUrls = async () => {
  try {
    const storage_path = award_winning_2024_config.storagePath;
    const videoUrls = await Promise.all(
      award_winning_2024_config.heroSectionVideo.map(async (video) => {
        const videoRef = ref(storage, `${storage_path}/${video.path}`);
        const url = await getDownloadURL(videoRef);
        return { id: video.id, url, title: video.title };
      })
    );

    return videoUrls;
  } catch (error) {
    console.error("GET ERROR: Error fetching video URLs:", error);
    return [];
  }
};
