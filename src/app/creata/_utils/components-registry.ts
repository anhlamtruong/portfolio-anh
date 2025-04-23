// componentsRegistry.ts
import dynamic from "next/dynamic";

// Dynamically import your heavy components.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ComponentsRegistry: Record<string, React.ComponentType<any>> = {
  "doodle-meme-carousel": dynamic(
    () => import("../_repositories/doodle-meme-carousel/doodle-meme-component")
  ),
  "award-winning-2024": dynamic(
    () =>
      import("../_repositories/award-winning-2024/award-winning-2024-component")
  ),
};

export default ComponentsRegistry;
