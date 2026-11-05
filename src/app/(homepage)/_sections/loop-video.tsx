"use client";

import { useEffect, useRef, useState } from "react";
import "./video.css";

// A muted, looping clip rendered with HyperFrames (sources in /video, files in
// public/videos). The poster paints first; the clip itself loads once the page
// is idle (one at a time, in page order) or when it nears the viewport, and it
// only plays while it is on screen.

// Bump when the files in public/videos are re-rendered (they are cached long).
const VERSION = "1";

type Props = {
  /** public/videos/<name>.{webm,mp4,webp} */
  name: string;
  /** Accessible description. Leave out for purely decorative clips. */
  label?: string;
  width: number;
  height: number;
  className?: string;
  /** Show the small pause / play toggle. */
  toggle?: boolean;
};

// ---- idle warm-up queue: fetch clips in page order after the page settles ----

const queue = new Set<HTMLVideoElement>();
let warming = false;

function canWarm() {
  const c = (navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  }).connection;
  return !(c?.saveData || c?.effectiveType === "2g" || c?.effectiveType === "slow-2g");
}

function onIdle(fn: () => void) {
  const ric = (window as Window & {
    requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
  }).requestIdleCallback;
  if (ric) ric(fn, { timeout: 3000 });
  else window.setTimeout(fn, 1200);
}

function warmNext() {
  const next = [...queue]
    .filter((v) => v.isConnected && v.readyState === 0 && v.preload === "none")
    .sort((a, b) =>
      a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
    )[0];
  if (!next) {
    warming = false;
    return;
  }
  let done = false;
  const go = () => {
    if (done) return;
    done = true;
    next.removeEventListener("loadeddata", go);
    next.removeEventListener("error", go);
    onIdle(warmNext);
  };
  next.addEventListener("loadeddata", go);
  next.addEventListener("error", go);
  window.setTimeout(go, 6000);
  next.preload = "auto";
  next.load();
}

function startWarmUp() {
  if (warming || !canWarm()) return;
  warming = true;
  const begin = () => onIdle(warmNext);
  if (document.readyState === "complete") begin();
  else window.addEventListener("load", begin, { once: true });
}

// -----------------------------------------------------------------------------

export function LoopVideo({ name, label, width, height, className = "", toggle = false }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // React does not always write the muted attribute; autoplay needs it.
    v.muted = true;
    v.defaultMuted = true;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused.current) {
          if (v.preload === "none") v.preload = "auto";
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(v);
    queue.add(v);
    startWarmUp();

    return () => {
      io.disconnect();
      queue.delete(v);
    };
  }, []);

  const onToggle = () => {
    const v = ref.current;
    if (!v) return;
    userPaused.current = !userPaused.current;
    setPaused(userPaused.current);
    if (userPaused.current) v.pause();
    else v.play().catch(() => {});
  };

  const src = `/videos/${name}`;
  return (
    <div className={`bp-video ${className}`}>
      <video
        ref={ref}
        className="bp-video__media"
        width={width}
        height={height}
        poster={`${src}.webp?v=${VERSION}`}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        disableRemotePlayback
        tabIndex={-1}
        {...(label ? { "aria-label": label } : { "aria-hidden": true })}
      >
        <source src={`${src}.webm?v=${VERSION}`} type="video/webm" />
        <source src={`${src}.mp4?v=${VERSION}`} type="video/mp4" />
      </video>
      {toggle ? (
        <button
          type="button"
          className="bp-video__toggle"
          onClick={onToggle}
          aria-pressed={paused}
          aria-label={paused ? `Play ${label ?? "video"}` : `Pause ${label ?? "video"}`}
        >
          <span aria-hidden="true">{paused ? "▶ play" : "❚❚ pause"}</span>
        </button>
      ) : null}
    </div>
  );
}
