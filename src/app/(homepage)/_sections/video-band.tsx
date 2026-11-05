import { LoopVideo } from "./loop-video";

// A decorative full-width clip between two sections, with blueprint readouts.
export function VideoBand({
  name,
  reel,
  caption,
}: {
  name: string;
  reel: string;
  caption: string;
}) {
  return (
    <div aria-hidden="true" className="bp-vband">
      <div className="bp-container bp-vband__meta">
        <span>{reel}</span>
        <span className="hidden sm:inline">{caption}</span>
        <span>1920 × 320 · 30 fps · loop</span>
      </div>
      <LoopVideo name={name} width={1920} height={320} className="bp-vband__clip" />
    </div>
  );
}
