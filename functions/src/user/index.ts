import { onDocumentUpdated } from "firebase-functions/v2/firestore";
import { logger } from "firebase-functions";
import * as admin from "firebase-admin";

/**
 * Handles updating the username mapping in Firestore when a user's username
 * changes.
 * Ensures uniqueness and atomicity using a Firestore transaction.
 * @param {string} accountId The first number.
 * @param {string?} beforeUsername The second number.
 * @param {string?} afterUsername The second number.
 * @returns
 */
async function handleUsernameChange(
  accountId: string,
  beforeUsername?: string,
  afterUsername?: string
) {
  const db = admin.firestore();
  const usernamesCol = db.collection("usernames");

  await db.runTransaction(async (tx) => {
    let newSnap: FirebaseFirestore.DocumentSnapshot | null = null;

    // If there is a new username, check if it already exists
    if (afterUsername) {
      const newRef = usernamesCol.doc(afterUsername);
      newSnap = await tx.get(newRef);
      // Username belongs to another account → abort the whole transaction
      if (newSnap.exists && newSnap.data()?.userId !== accountId) {
        throw new Error(`Username "${afterUsername}" is already in use`);
      }
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
}

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

      // Handle username mapping logic in a separate function for clarity
      await handleUsernameChange(accountId, beforeUsername, afterUsername);

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
