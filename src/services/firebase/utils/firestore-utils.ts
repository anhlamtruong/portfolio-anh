import { doc, getDoc, setDoc } from "firebase/firestore";
import { UserRole } from "@/services/authenticate-service/generated/authenticate/@prisma-authenticate";
import { db } from "../service-provider";

export interface FirestoreUserPayload {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: UserRole;
}

/**
 * Ensures a Firestore user document exists for the given user.
 */
export async function ensureFirestoreUserDoc(user: FirestoreUserPayload) {
  const ref = doc(db, "users", user.id);
  const snap = await getDoc(ref);
  const now = new Date();
  if (!snap.exists()) {
    await setDoc(ref, {
      name: user.name,
      email: user.email,
      avatarURL: user.image,
      role: user.role,
      username: null,
      createdAt: now,
      updatedAt: now,
    });
  } else {
    await setDoc(
      ref,
      {
        name: user.name,
        avatarURL: user.image,
        updatedAt: now,
      },
      { merge: true }
    );
  }
}
