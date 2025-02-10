// componentsMapping.ts
import dynamic from "next/dynamic";

// Dynamically import your heavy components.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ComponentsMapping: Record<string, React.ComponentType<any>> = {
  "doodle-meme-carousel": dynamic(
    () => import("../_components/doodle-meme-carousel")
  ),
};

export default ComponentsMapping;
