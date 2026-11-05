// Build-state helpers shared by the effects. The swarm engine
// (src/components/swarm) hides and measures items while html[data-build="on"];
// finished items and sections get [data-built]. Effects only touch an element
// once it and its section are built, or when the engine is off.

export const FINE_POINTER = "(hover: hover) and (pointer: fine)";

/** True while the build engine may still hide or measure content. */
export function buildActive(): boolean {
  return document.documentElement.getAttribute("data-build") === "on";
}

/** The element's own build item and its section are finished (or the engine is off). */
export function isBuilt(el: Element): boolean {
  if (!buildActive()) return true;
  const item = el.closest("[data-build-item]");
  if (item && !item.hasAttribute("data-built")) return false;
  const section = el.closest("[data-build-section]");
  return !section || section.hasAttribute("data-built");
}

/** The swarm HUD's inspect toggle is on (it reads real rects, so no tilting). */
export function inspecting(): boolean {
  return document.querySelector('.swarm-hud__btn[aria-pressed="true"]') !== null;
}

/** Small seeded PRNG (xorshift32), [0, 1). */
export function seeded(seed: number): () => number {
  let s = seed >>> 0 || 0x9e3779b9;
  return () => {
    s ^= s << 13;
    s >>>= 0;
    s ^= s >>> 17;
    s ^= s << 5;
    s >>>= 0;
    return s / 4294967296;
  };
}

/** Removes an empty style attribute left behind after clearing inline styles. */
export function tidyStyle(el: HTMLElement): void {
  if (el.getAttribute("style") === "") el.removeAttribute("style");
}
