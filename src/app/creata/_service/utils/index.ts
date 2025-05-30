/* eslint-disable @typescript-eslint/no-explicit-any */
import { Timestamp } from "firebase/firestore";

export function timestampToDate(
  ts?: Timestamp | Date | number
): Date | undefined {
  if (!ts) return undefined;
  if (typeof (ts as any).toDate === "function") {
    // Firestore Timestamp
    return (ts as Timestamp).toDate();
  }
  if (ts instanceof Date) {
    return ts;
  }
  // numeric milliseconds since epoch
  return new Date(ts as number);
}
