import { db } from "@/services/firebase/service-provider";
import { collection, addDoc } from "firebase/firestore";

export const saveLogosToFirestore = async (
  logos: { path: string; name: string }[]
) => {
  try {
    const collectionRef = collection(db, "companies_logos");

    // Add each logo to the Firestore collection
    const results = await Promise.all(
      logos.map(async (logo) => {
        await addDoc(collectionRef, logo);
      })
    );

    console.log("[LOGOS_SAVED]", results);
  } catch (error) {
    console.error("[SAVE_LOGOS_ERROR]", error);
  }
};
