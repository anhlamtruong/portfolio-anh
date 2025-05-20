// e.g. in some service or helper
import { RouterOutputs } from "./trpc";

// the `getLogos` query lives under `homepage`
// type GetLogosInput = RouterInputs["homepage"]["getLogos"]; // usually `undefined` if no input
export type HomePageGetLogosOutput = RouterOutputs["homepage"]["getLogos"];
