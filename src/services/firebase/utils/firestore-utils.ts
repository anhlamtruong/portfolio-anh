import "server-only";
import { UserRole } from "@/services/authenticate-service/generated/authenticate/@prisma-authenticate";
import { getFirestoreAdmin } from "../firebase-admin";

export interface FirestoreUserPayload {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: UserRole;
}

/**
 * Ensures a Firestore user document exists for the given user.
 *
 * Uses the Admin SDK: Firestore rules deny the `users` collection to
 * client SDKs, so this must run on the server with admin credentials.
 */
export async function ensureFirestoreUserDoc(user: FirestoreUserPayload) {
  const db = await getFirestoreAdmin();
  const ref = db.collection("users").doc(user.id);
  const snap = await ref.get();
  const now = new Date();
  if (!snap.exists) {
    await ref.set({
      name: user.name ?? null,
      email: user.email ?? null,
      avatarURL: user.image ?? null,
      role: user.role,
      username: null,
      createdAt: now,
      updatedAt: now,
    });
  } else {
    await ref.set(
      {
        name: user.name ?? null,
        avatarURL: user.image ?? null,
        updatedAt: now,
      },
      { merge: true }
    );
  }
}
