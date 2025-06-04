/* eslint-disable @typescript-eslint/no-explicit-any */
import { firestore } from "@/services/firebase/firebase-admin";

import { timestampToDate } from "./utils";

export interface MetadataProps {
  id: string;
  name: string;
  key: string;
  description?: string;
  version: string;
  author?: string;
  createdAt?: Date;
  updatedAt?: Date;
  thumbnails?: string;
  tags?: string[];
  userId: string;
  propsSchema: Record<string, any>;
  config: Record<string, any>;
}

export class FirebasePublicCreataClient {
  async getAllComponentConfigs(): Promise<MetadataProps[]> {
    try {
      const snapshot = await firestore
        .collection("creata-component-metadata")
        .get();

      return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          createdAt: timestampToDate(data.createdAt),
          updatedAt: timestampToDate(data.updatedAt),
        } as MetadataProps;
      });
    } catch (error) {
      console.error(`FIREBASE_SERVICE_COMPONENT_GET_ALL_COMPONENTS: ${error}`);
      return [];
    }
  }

  async getComponentConfigById(id: string): Promise<MetadataProps | null> {
    try {
      const docRef = firestore.collection("creata-component-metadata").doc(id);
      const docSnap = await docRef.get();

      if (!docSnap.exists) {
        console.log("Document not found");
        return null;
      }

      return {
        ...docSnap.data(),
        id: docSnap.id,
        createdAt: timestampToDate(docSnap.data()?.createdAt),
        updatedAt: timestampToDate(docSnap.data()?.updatedAt),
      } as MetadataProps;
    } catch (error) {
      console.error(`FIREBASE_SERVICE_COMPONENT_GET_COMPONENT_BY_ID: ${error}`);
      return null;
    }
  }
}
