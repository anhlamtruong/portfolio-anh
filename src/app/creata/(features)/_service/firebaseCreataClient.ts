/* eslint-disable @typescript-eslint/no-explicit-any */
import { firestore } from "@/services/firebase/firebase-admin";

export interface ComponentMetadata {
  id: string;
  name: string;
  slug?: string;
  props: Record<string, any>;
}

export class FirebaseCreataClient {
  async getAllComponentConfigs(): Promise<ComponentMetadata[]> {
    try {
      const snapshot = await firestore
        .collection("creata-component-metadata")
        .get();

      return snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as ComponentMetadata;
      });
    } catch (error) {
      console.error(`FIREBASE_SERVICE_COMPONENT_GET_ALL_COMPONENTS: ${error}`);
      return [];
    }
  }

  async getComponentConfigBySlug(
    slug: string
  ): Promise<ComponentMetadata | null> {
    try {
      const docRef = firestore
        .collection("creata-component-metadata")
        .doc(slug);
      const docSnap = await docRef.get();

      if (!docSnap.exists) {
        console.log("Document not found");
        return null;
      }

      return { id: docSnap.id, ...docSnap.data() } as ComponentMetadata;
    } catch (error) {
      console.error(
        `FIREBASE_SERVICE_COMPONENT_GET_COMPONENT_BY_SLUG: ${error}`
      );
      return null;
    }
  }
}
