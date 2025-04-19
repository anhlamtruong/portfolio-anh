import { getLogosFromStorage } from "./get-logos-storage";
import { saveLogosToFirestore } from "./post-logos";

export const syncLogosToFirestore = async () => {
  try {
    const logos = await getLogosFromStorage();
    console.log(`LOGGING: Fetching logos from storage`);
    if (logos == undefined) return;
    if (logos.length > 0) {
      await saveLogosToFirestore(logos);
    }
  } catch (error) {
    console.log(error);
  }
};
