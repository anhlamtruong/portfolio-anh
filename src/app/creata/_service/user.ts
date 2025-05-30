/* eslint-disable @typescript-eslint/no-explicit-any */
import { firestore } from "@/services/firebase/firebase-admin";
import { timestampToDate } from "./utils";

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

export class FirebaseCreataUserClientService {
  private user_collection = firestore.collection("users");
  userId: string;
  constructor(userId: string) {
    this.userId = userId;
  }
  async getUserById(id: string): Promise<UserProps | undefined> {
    try {
      const snapshot = await this.user_collection.doc(id).get();
      if (!snapshot.exists)
        throw new Error("FIREBASE_USER_SERVICE_GET_USER_BY_ID: User not found");

      const data = snapshot.data() as UserProps;
      return {
        ...data,
        id: snapshot.id,
        createdAt: timestampToDate(data.createdAt),
        updatedAt: timestampToDate(data.updatedAt),
      };
    } catch (error) {
      console.error(`FIREBASE_USER_SERVICE_GET_USER_BY_ID: ${error}`);
    }
  }
}
