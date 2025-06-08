/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  collection,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { timestampToDate } from "./utils";
import { db } from "@/services/firebase/service-provider";

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
  private user_collection_ref = collection(db, "users");
  async getUserById(id: string): Promise<UserProps | null> {
    try {
      // const snapshot = await this.user_collection.doc(id).get();
      const docRef = doc(db, "user", id);
      console.log(docRef);
      const snapshot = await getDoc(docRef);
      if (!snapshot.exists)
        throw new Error("FIREBASE_USER_SERVICE_GET_USER_BY_ID: User not found");

      const data = snapshot.data();
      console.log(data);
      return {
        ...data,
        id: snapshot.id,
        createdAt: timestampToDate(data.createdAt),
        updatedAt: timestampToDate(data.updatedAt),
      };
    } catch (error) {
      console.error(`FIREBASE_USER_SERVICE_GET_USER_BY_ID: ${error}`);
      return null;
    }
  }
  async updateAccountService(
    input: any
  ): Promise<{ status: string; message: string }> {
    try {
      const { id, ...updateData } = input;
      const docRef = doc(db, "user", id);
      const snapshot = await getDoc(docRef);
      if (!snapshot.exists) {
        throw new Error("FIREBASE_USER_SERVICE_UPDATE_USER: User not found");
      }
      await updateDoc(docRef, {
        ...updateData,
        updatedAt: serverTimestamp(),
      });
      return { status: "success", message: "User updated successfully" };
    } catch (error) {
      console.error(`FIREBASE_USER_SERVICE_UPDATE_USER: ${error}`);
      return { status: "error", message: `Server Error: ${error}` };
    }
  }
}
