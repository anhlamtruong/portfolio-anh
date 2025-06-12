import { onDocumentUpdated } from "firebase-functions/v2/firestore";
import { logger } from "firebase-functions";

exports.onAccountUpdated = onDocumentUpdated(
  "users/{accountId}",
  async (event) => {
    try {
      if (!event.data) throw new Error("Event data is missing");
      if (!event.params.accountId) throw new Error("Account ID is missing");
      logger.info("Account updated", {
        accountId: event.params.accountId,
        before: event.data.before.data(),
        after: event.data.after.data(),
      });
      const snapshot = event.data;
    } catch (error) {
      logger.error("Cloud Function Error: onDocumentUpdated", {
        error: error,
      });
    }

    // You can add additional logic here, such as updating related documents
    // or triggering other processes based on the account update.
  }
);
