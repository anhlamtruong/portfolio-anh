/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldValue } from "firebase-admin/firestore";
import { timestampToDate } from "./utils";
import { getFirestoreAdmin } from "@/services/firebase/firebase-admin";
import { CreataAccountUpdateInput } from "../_types";

// `users` and `usernames` are denied to client SDKs by firestore.rules,
// so everything here goes through the Admin SDK on the server.

export interface UserProps {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarURL?: string;
  username?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class FirebasePrivateCreataClient {
  async getUserById(id: string): Promise<UserProps> {
    try {
      console.log(`Fetching user by ID: ${id}`);
      if (!id) {
        throw new Error("FIREBASE_USER_SERVICE_GET_USER_BY_ID: ID is required");
      }
      const db = await getFirestoreAdmin();
      const snapshot = await db.collection("users").doc(id).get();

      if (!snapshot.exists)
        throw new Error(
          "FIREBASE_USER_SERVICE_GET_USER_BY_ID: Document not found"
        );

      const data = snapshot.data() ?? {};
      return {
        ...(data as UserProps),
        id: snapshot.id,
        createdAt: timestampToDate(data.createdAt),
        updatedAt: timestampToDate(data.updatedAt),
      };
    } catch (error) {
      console.error(
        `FIREBASE_USER_SERVICE_GET_USER_BY_ID: An unexpected error occurred: ${error}`
      );
      throw new Error(
        "FIREBASE_USER_SERVICE_GET_USER_BY_ID: An unexpected error occurred"
      );
    }
  }

  async updateAccountService(
    input: CreataAccountUpdateInput & { id: string }
  ): Promise<void> {
    try {
      const { id, ...updateData } = input;
      if (!id) {
        throw new Error("FIREBASE_USER_SERVICE_UPDATE_ACCOUNT: ID not found");
      }
      const db = await getFirestoreAdmin();
      const docRef = db.collection("users").doc(id);

      const snapshot = await docRef.get();
      if (!snapshot.exists) {
        throw new Error(
          "FIREBASE_USER_SERVICE_UPDATE_ACCOUNT: Document not found"
        );
      }
      const data = snapshot.data() as UserProps | undefined;

      if (!data) {
        throw new Error(
          "FIREBASE_USER_SERVICE_UPDATE_ACCOUNT: No data found for the provided ID"
        );
      }
      if (snapshot.id !== id) {
        throw new Error("FIREBASE_USER_SERVICE_UPDATE_ACCOUNT: ID mismatch");
      }
      console.log(`Updating username: ${updateData?.username}`);

      if (updateData?.username) {
        const usernameSnapshot = await db
          .collection("usernames")
          .doc(updateData.username)
          .get();
        const usernameData = usernameSnapshot.data();

        const isExisted = usernameData && usernameData.userId !== id;

        if (isExisted) {
          throw new Error(
            `FIREBASE_USER_SERVICE_UPDATE_ACCOUNT: Username ${updateData.username} is already taken`
          );
        }
      }

      await docRef.update({
        ...updateData,
        updatedAt: FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error(
        `FIREBASE_USER_SERVICE_UPDATE_ACCOUNT: An unexpected error occurred: ${error}`
      );
      throw new Error(
        `FIREBASE_USER_SERVICE_UPDATE_ACCOUNT: An unexpected error occurred: ${error}`
      );
    }
  }
}
