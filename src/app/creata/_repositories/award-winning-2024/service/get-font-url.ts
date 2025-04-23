import { storage } from "@/services/firebase/service-provider";
import { getDownloadURL, ref } from "firebase/storage";
import { award_winning_2024_config } from "../config";

export const getFontUrls = async (fontPaths: string[], fontNames: string[]) => {
  try {
    const storage_path = award_winning_2024_config.storagePath;
    const fontUrls = await Promise.all(
      fontPaths.map(async (fontPath) => {
        const fontRef = ref(storage, `${storage_path}/${fontPath}`);
        return await getDownloadURL(fontRef);
      })
    );

    // Create a dictionary with font names as keys and URLs as values
    const fontDictionary: Record<string, string> = {};
    fontNames.forEach((name, index) => {
      fontDictionary[name] = fontUrls[index];
    });

    return fontDictionary;
  } catch (error) {
    console.error("GET ERROR: Error fetching font URLs:", error);
    return {};
  }
};
