import { onDocumentUpdated } from "firebase-functions/v2/firestore";
import { logger } from "firebase-functions";
import * as admin from "firebase-admin";

// Cloud Function to handle updates to user documents
export const onAccountUpdated = onDocumentUpdated(
  "users/{accountId}",
  async (event) => {
    try {
      // Ensure event data and accountId are present
      if (!event.data) throw new Error("Event data is missing");
      if (!event.params.accountId) throw new Error("Account ID is missing");

      logger.info("Account updated", {
        accountId: event.params.accountId,
        before: event.data.before.data(),
        after: event.data.after.data(),
      });

      const { before, after } = event.data;
      if (!before || !after) {
        logger.error("Missing before/after", { before, after });
        return;
      }

      const accountId = event.params.accountId;
      const beforeUsername = before.data()?.username as string | undefined;
      const afterUsername = after.data()?.username as string | undefined;

      // If username hasn't changed, exit early
      if (beforeUsername === afterUsername) return;

      const db = admin.firestore();
      const usernamesCol = db.collection("usernames");

      await db.runTransaction(async (tx) => {
        let newSnap = null;

        // If there is a new username, check if it already exists
        if (afterUsername) {
          const newRef = usernamesCol.doc(afterUsername);
          newSnap = await tx.get(newRef);
        }

        // Remove the old username mapping if it existed
        if (beforeUsername) {
          tx.delete(usernamesCol.doc(beforeUsername));
        }

        // Only set the new username if it doesn't already exist
        if (afterUsername && newSnap && !newSnap.exists) {
          tx.set(usernamesCol.doc(afterUsername), { userId: accountId });
        }
      });

      logger.info("Usernames collection updated", {
        accountId,
        beforeUsername,
        afterUsername,
      });
    } catch (error) {
      // Log errors for easier debugging
      logger.error(`Cloud Function Error: onDocumentUpdated - ${error}`);
    }
  }
);
