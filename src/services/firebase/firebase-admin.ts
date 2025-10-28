// import admin from "firebase-admin";

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert({
//       projectId: process.env.FIREBASE_PROJECT_ID,
//       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//       // Replace escaped newline characters with actual newlines
//       privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//     }),
//   });
// }

// const firestore_admin = admin.firestore();
// export { firestore_admin };

import "server-only";
import admin from "firebase-admin";
import { getSecrets } from "@/services/secrets-management/secrets-fetching";

// Use an in-memory cache for the initialized app
let firestoreAdminInstance: admin.firestore.Firestore | null = null;

// This async function initializes and returns the admin app
async function initializeFirebaseAdmin() {
  const secrets = await getSecrets();

  // Check if secrets are loaded
  if (
    !secrets.firebaseProjectId ||
    !secrets.firebaseClientEmail ||
    !secrets.firebasePrivateKey
  ) {
    throw new Error(
      "Firebase Admin SDK secrets are not configured in Secret Manager!"
    );
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: secrets.firebaseProjectId,
        clientEmail: secrets.firebaseClientEmail,
        privateKey: secrets.firebasePrivateKey, // The getSecrets() function already handles \n
      }),
    });
  }
  return admin.firestore();
}

/**
 * Gets a cached instance of the Firebase Admin Firestore client.
 * Automatically fetches secrets and initializes the app on the first call.
 */
export async function getFirestoreAdmin() {
  if (firestoreAdminInstance) {
    return firestoreAdminInstance;
  }

  firestoreAdminInstance = await initializeFirebaseAdmin();
  return firestoreAdminInstance;
}
