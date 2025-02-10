import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { firebaseConfig } from "./config";
import { getApp, getApps, initializeApp } from "firebase/app";

// Initialize Firebase only once to prevent duplicate apps
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
