import { db } from "@/services/firebase/service-provider";
import { doc, getDoc, runTransaction } from "firebase/firestore";

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
