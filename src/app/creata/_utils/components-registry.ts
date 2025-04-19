// componentsRegistry.ts
import dynamic from "next/dynamic";

// Dynamically import your heavy components.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ComponentsRegistry: Record<string, React.ComponentType<any>> = {
  "doodle-meme-carousel": dynamic(
    () =>
      import("../(slug)/_component/doodle-meme-carousel/doodle-meme-component")
  ),
};

export default ComponentsRegistry;
