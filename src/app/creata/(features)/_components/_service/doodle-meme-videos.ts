import { storage } from "@/services/firebase/service-provider";
import { getDownloadURL, listAll, ref } from "firebase/storage";

export const getDoddleMemeVideosFromStorage = async () => {
  try {
    const doddleMemeVideosRef = ref(storage, "creata/doodle-meme-videos");
    const listResult = await listAll(doddleMemeVideosRef);

    const doddleMemeVideoURLs = await Promise.all(
      listResult.items.map(async (item) => {
        const url = await getDownloadURL(item);

        return {
          path: url,
          name: item.name.split(".")[0],
        };
      })
    );

    return doddleMemeVideoURLs;
  } catch (error) {
    console.error("[DODDLE_MEME_VIDEOS_GET]", error);
  }
};
