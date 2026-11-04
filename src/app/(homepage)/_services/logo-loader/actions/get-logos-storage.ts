import { storage } from "@/services/firebase/service-provider";
import { getDownloadURL, listAll, ref } from "firebase/storage";

export type StorageLogo = { path: string; name: string };

// Always resolves to an array. Returning undefined makes React Query
// treat the query as failed, which crashes the whole homepage.
export const getLogosFromStorage = async (): Promise<StorageLogo[]> => {
  try {
    const logosRef = ref(storage, "logos/");
    const listResult = await listAll(logosRef);

    const logoURLs = await Promise.all(
      listResult.items.map(async (item) => {
        const url = await getDownloadURL(item);

        return {
          path: url,
          name: item.name.split(".")[0],
        };
      })
    );

    return logoURLs;
  } catch (error) {
    console.error("[LOGOS_GET]", error);
    return [];
  }
};
