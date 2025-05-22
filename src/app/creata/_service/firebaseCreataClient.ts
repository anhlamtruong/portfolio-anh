/* eslint-disable @typescript-eslint/no-explicit-any */
import { firestore } from "@/services/firebase/firebase-admin";

export interface MetadataProps {
  id: string;
  name: string;
  key: string;
  description?: string;
  version: string | "0.1.0";
  author?: string;
  thumbnails?: string;
  propsSchema: Record<string, any>;
  config: Record<string, any>;
}

export class FirebaseCreataClient {
  async getAllComponentConfigs(): Promise<MetadataProps[]> {
    try {
      const snapshot = await firestore
        .collection("creata-component-metadata")
        .get();

      return snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as MetadataProps;
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
