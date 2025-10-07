import { db } from "@/services/firebase/service-provider";
import {
  doc,
  getDoc,
  increment,
  runTransaction,
  setDoc,
} from "firebase/firestore";

export async function incrementAndGetViews() {
  const viewsRef = doc(db, "views", "portfolio-homepage");
  try {
    // Run a transaction to atomically update and get the new count.
    const newCount = await runTransaction(db, async (transaction) => {
      const viewDoc = await transaction.get(viewsRef);

      // If the document doesn't exist, create it with a count of 1.
      if (!viewDoc.exists()) {
        transaction.set(viewsRef, { count: 1 });
        return 1;
      }

      // If the document exists, increment its count.
      const currentCount = viewDoc.data().count;
      const newCount = currentCount + 1;
      transaction.update(viewsRef, { count: newCount });

      // Return the new count so it becomes the result of the runTransaction promise.
      return newCount;
    });

    console.log(`Portfolio views updated to: ${newCount}`);
    return newCount;
  } catch (error) {
    console.error("Error incrementing views:", error);
  }
}

/**
 * Retrieves the current view count from Firestore.
 * @returns {Promise<number>} The current view count, or 0 if it doesn't exist.
 */
export async function getViews() {
  const viewsRef = doc(db, "views", "portfolio-homepage");
  try {
    const docSnap = await getDoc(viewsRef);

    // If the document exists, return its count. Otherwise, return 0.
    if (docSnap.exists()) {
      return docSnap.data().count as number;
    } else {
      return 0;
    }
  } catch (error) {
    console.error("Error getting views:", error);
    return 0; // Return a fallback value on error
  }
}

/**
 * Atomically increments the view count on Firestore by 1.
 * This is a "fire-and-forget" operation.
 */
export async function incrementView() {
  const viewsRef = doc(db, "views", "portfolio-homepage");
  try {
    // Atomically increment the count by 1.
    // If the document doesn't exist, it will be created with a count of 1.
    await setDoc(viewsRef, { count: increment(1) }, { merge: true });
    console.log("View count incremented by 1.");
  } catch (error) {
    console.error("Error incrementing view:", error);
  }
}
