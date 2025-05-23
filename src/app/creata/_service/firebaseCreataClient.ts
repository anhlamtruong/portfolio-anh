/* eslint-disable @typescript-eslint/no-explicit-any */
import { firestore } from "@/services/firebase/firebase-admin";

export interface MetadataProps {
  id: string;
  name: string;
  key: string;
  description?: string;
  version: string;
  author?: string;
  //!ERROR: Timestamp type is not supported with TRPC
  createdAt?: string;
  updatedAt?: string;
  thumbnails?: string;
  tags?: string[];
  userId: string;
  propsSchema: Record<string, any>;
  config: Record<string, any>;
}

function timestampToString(ts: any): string | undefined {
  if (!ts) return undefined;
  // Firestore admin Timestamp
  if (typeof ts.toDate === "function") {
    return ts.toDate().toISOString();
  }
  // already a Date
  if (ts instanceof Date) {
    return ts.toISOString();
  }
  // already a number
  if (typeof ts === "number") {
    return new Date(ts).toISOString();
  }
  return undefined;
}

export class FirebaseCreataClient {
  async getAllComponentConfigs(): Promise<MetadataProps[]> {
    try {
      const snapshot = await firestore
        .collection("creata-component-metadata")
        .get();

      return snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          createdAt: timestampToString(doc.data().createdAt),
          updatedAt: timestampToString(doc.data().updatedAt),
          ...doc.data(),
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

      return { id: docSnap.id, ...docSnap.data() } as MetadataProps;
    } catch (error) {
      console.error(`FIREBASE_SERVICE_COMPONENT_GET_COMPONENT_BY_ID: ${error}`);
      return null;
    }
  }
}
