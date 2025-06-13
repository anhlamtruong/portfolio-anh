/* eslint-disable @typescript-eslint/no-explicit-any */

import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { timestampToDate } from "./utils";
import { db } from "@/services/firebase/service-provider";
import { CreataAccountUpdateInput } from "../_types";

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
      if (!id) {
        throw new Error("FIREBASE_USER_SERVICE_GET_USER_BY_ID: ID is required");
      }
      const docRef = doc(db, "users", id);

      const snapshot = await getDoc(docRef);

      if (!snapshot.exists())
        throw new Error(
          "FIREBASE_USER_SERVICE_GET_USER_BY_ID: Document not found"
        );
      const data = snapshot.data();
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

  async checkUsername(username: string) {
    try {
      if (!username) {
        throw new Error(
          "FIREBASE_USER_SERVICE_CHECK_USERNAME: Username is required"
        );
      }
      const docRef = doc(db, "usernames", username);
      const snapshot = await getDoc(docRef);
      return snapshot.exists();
    } catch (error) {
      console.error(
        `FIREBASE_USER_SERVICE_CHECK_USERNAME: An unexpected error occurred: ${error}`
      );
      throw new Error(
        "FIREBASE_USER_SERVICE_CHECK_USERNAME: An unexpected error occurred"
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
      const docRef = doc(db, "users", id);

      const snapshot = await getDoc(docRef);
      if (!snapshot.exists()) {
        throw new Error(
          "FIREBASE_USER_SERVICE_UPDATE_ACCOUNT: Document not found"
        );
      }
      const data = snapshot.data() as UserProps;

      if (!data) {
        throw new Error(
          "FIREBASE_USER_SERVICE_UPDATE_ACCOUNT: No data found for the provided ID"
        );
      }
      if (snapshot.id !== id) {
        throw new Error("FIREBASE_USER_SERVICE_UPDATE_ACCOUNT: ID mismatch");
      }

      if (updateData?.username) {
        const updateUsernameUserIDRef = doc(
          db,
          "username",
          updateData.username
        );
        const updateUsernameUserIDSnapshot = await getDoc(
          updateUsernameUserIDRef
        );
        const data = updateUsernameUserIDSnapshot.data();
        //TODO: Check if the username is already taken
        const isExisted = await this.checkUsername(updateData.username);
        if (isExisted) {
          throw new Error(
            `FIREBASE_USER_SERVICE_UPDATE_ACCOUNT: Username ${updateData.username} is already taken`
          );
        }
      }

      return await updateDoc(docRef, {
        ...updateData,
        updatedAt: serverTimestamp(),
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
