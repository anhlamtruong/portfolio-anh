import { NextResponse } from "next/server";
import {
  getViews,
  incrementAndGetViews,
} from "@/app/(homepage)/_services/website-views-count/actions/viewer-count-firestore";

// Homepage view counter. The page itself is static; the count is loaded
// after paint so it never delays the first render.
export const dynamic = "force-dynamic";

const noStore = { "Cache-Control": "no-store" };

export async function GET() {
  const count = await getViews();
  return NextResponse.json({ count }, { headers: noStore });
}

// Counts one visit and returns the new total.
export async function POST() {
  const count = (await incrementAndGetViews()) ?? (await getViews());
  return NextResponse.json({ count }, { headers: noStore });
}
