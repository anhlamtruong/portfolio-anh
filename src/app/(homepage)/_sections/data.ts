import "server-only";
import { unstable_cache } from "next/cache";
import {
  getLogosFromStorage,
  type StorageLogo,
} from "../_services/logo-loader/actions/get-logos-storage";

// The logo list is read from Firebase Storage at build time and refreshed at
// most once a day, instead of listing the bucket on every request.
const getCachedLogos = unstable_cache(
  async (): Promise<StorageLogo[]> => {
    const logos = await getLogosFromStorage();
    // Throwing keeps a failed or empty read out of the cache.
    if (logos.length === 0) throw new Error("No skill logos returned");
    return [...logos].sort((a, b) => a.name.localeCompare(b.name));
  },
  ["skill-logos-v1"],
  { revalidate: 86400, tags: ["skill-logos"] },
);

export async function getSkillLogos(): Promise<StorageLogo[]> {
  try {
    return await getCachedLogos();
  } catch {
    // The skills section hides the logo wall when the list is empty.
    return [];
  }
}
