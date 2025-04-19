import { db } from "@/services/firebase/service-provider";
import { collection, getDocs } from "firebase/firestore";

export const getLogosFromFirestore = async () => {
  try {
    const collectionRef = collection(db, "logos");
    const snapshot = await getDocs(collectionRef);

    // Map Firestore documents to structured array
    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("[FETCH_LOGOS_ERROR]", error);
    return [];
  }
};
