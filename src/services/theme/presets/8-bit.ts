import { ThemePreset } from "../types";

/**
 * 8-Bit / Pixel Art Theme Preset
 *
 * Neo-Retro Cyberpunk aesthetic: NES nostalgia meets modern brutalism.
 * Neon Green, Hot Pink, Deep Purple palette with pixel fonts and hard shadows.
 */
export const eightBitPreset: ThemePreset = {
  label: "8-Bit",
  source: "BUILT_IN",
  layoutMode: "8bit",
  styles: {
    light: {
      // ── Base ──
      background: "#c4cfa1", // CRT phosphor green-beige
      foreground: "#1a1a2e",
      card: "#d4ddb1",
      "card-foreground": "#1a1a2e",
      popover: "#d4ddb1",
      "popover-foreground": "#1a1a2e",

      // ── Primary: Neon Green ──
      primary: "#39ff14",
      "primary-foreground": "#0d0d1a",

      // ── Secondary: Deep Purple ──
      secondary: "#7b2d8e",
      "secondary-foreground": "#ffffff",

      // ── Muted ──
      muted: "#b8c291",
      "muted-foreground": "#3d3d5c",

      // ── Accent: Hot Pink ──
      accent: "#ff6ec7",
      "accent-foreground": "#0d0d1a",

      // ── Destructive ──
      destructive: "#ff0040",
      "destructive-foreground": "#ffffff",

      // ── UI Chrome ──
      border: "#1a1a2e",
      input: "#b8c291",
      ring: "#39ff14",

      // ── Charts ──
      "chart-1": "#39ff14",
      "chart-2": "#ff6ec7",
      "chart-3": "#7b2d8e",
      "chart-4": "#00d4ff",
      "chart-5": "#ffcc00",

      // ── Sidebar ──
      sidebar: "#b8c291",
      "sidebar-foreground": "#1a1a2e",
      "sidebar-primary": "#39ff14",
      "sidebar-primary-foreground": "#0d0d1a",
      "sidebar-accent": "#ff6ec7",
      "sidebar-accent-foreground": "#0d0d1a",
      "sidebar-border": "#1a1a2e",
      "sidebar-ring": "#39ff14",

      // ── Typography ──
      "font-sans":
        "'Press Start 2P', 'VT323', ui-monospace, monospace",
      "font-serif":
        "'Press Start 2P', 'VT323', ui-monospace, monospace",
      "font-mono": "'VT323', 'Press Start 2P', ui-monospace, monospace",

      // ── Shape ──
      radius: "0rem", // Sharp pixel corners

      // ── Shadows: Hard pixel drop-shadows ──
      "shadow-color": "#0d0d1a",
      "shadow-opacity": "1",
      "shadow-blur": "0px",
      "shadow-spread": "0px",
      "shadow-offset-x": "4px",
      "shadow-offset-y": "4px",

      // ── Spacing ──
      "letter-spacing": "0.05em",
      spacing: "0.25rem",
    },
    dark: {
      // ── Base ──
      background: "#0d0d1a", // Deep space black-blue
      foreground: "#e0e0e0",
      card: "#1a1a2e",
      "card-foreground": "#e0e0e0",
      popover: "#1a1a2e",
      "popover-foreground": "#e0e0e0",

      // ── Primary: Neon Green ──
      primary: "#39ff14",
      "primary-foreground": "#0d0d1a",

      // ── Secondary: Deep Purple ──
      secondary: "#2e1a3e",
      "secondary-foreground": "#d4b8e0",

      // ── Muted ──
      muted: "#1e1e36",
      "muted-foreground": "#8888aa",

      // ── Accent: Hot Pink ──
      accent: "#ff6ec7",
      "accent-foreground": "#0d0d1a",

      // ── Destructive ──
      destructive: "#ff0040",
      "destructive-foreground": "#ffffff",

      // ── UI Chrome ──
      border: "#39ff14",
      input: "#1e1e36",
      ring: "#ff6ec7",

      // ── Charts ──
      "chart-1": "#39ff14",
      "chart-2": "#ff6ec7",
      "chart-3": "#7b2d8e",
      "chart-4": "#00d4ff",
      "chart-5": "#ffcc00",

      // ── Sidebar ──
      sidebar: "#0d0d1a",
      "sidebar-foreground": "#e0e0e0",
      "sidebar-primary": "#39ff14",
      "sidebar-primary-foreground": "#0d0d1a",
      "sidebar-accent": "#ff6ec7",
      "sidebar-accent-foreground": "#0d0d1a",
      "sidebar-border": "#39ff14",
      "sidebar-ring": "#ff6ec7",
    },
  },
};
