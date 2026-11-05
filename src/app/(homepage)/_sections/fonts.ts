import { Instrument_Serif } from "next/font/google";

// Display serif for accent words. It contrasts with the mono draft the
// agents type first, so the font swap reads clearly. Loaded only on the
// pages that use it (homepage and /links).
export const displaySerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-display",
  display: "swap",
});
