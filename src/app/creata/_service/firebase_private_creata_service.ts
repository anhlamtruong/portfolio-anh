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
