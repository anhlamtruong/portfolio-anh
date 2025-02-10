import { syncLogosToFirestore } from "@/services/image-loader.ts/actions/sync-logos-to-db";

export const SyncLogosButton = () => {
  const handleSync = async () => {
    await syncLogosToFirestore();
    alert("Logos synced to Firestore!");
  };

  return <button onClick={handleSync}>Sync Logos</button>;
};
