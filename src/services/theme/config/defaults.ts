import { ThemeEditorState } from "../types";

// ============================================================================
// Common Styles (shared between light and dark modes)
// ============================================================================

export const COMMON_STYLES = [
  "font-sans",
  "font-serif",
  "font-mono",
  "radius",
  "shadow-opacity",
  "shadow-blur",
  "shadow-spread",
  "shadow-offset-x",
  "shadow-offset-y",
  "letter-spacing",
  "spacing",
];

// ============================================================================
// Default Fonts
// ============================================================================

export const DEFAULT_FONT_SANS =
  "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'";

export const DEFAULT_FONT_SERIF =
  'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif';

export const DEFAULT_FONT_MONO =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

// ============================================================================
// Default Light Theme Styles
// ============================================================================

export const defaultLightThemeStyles = {
  background: "#ffffff",
  foreground: "#171717",
  card: "#ffffff",
  "card-foreground": "#171717",
  popover: "#ffffff",
  "popover-foreground": "#171717",
  primary: "#171717",
  "primary-foreground": "#fafafa",
  secondary: "#f5f5f5",
  "secondary-foreground": "#171717",
  muted: "#f5f5f5",
  "muted-foreground": "#737373",
  accent: "#f5f5f5",
  "accent-foreground": "#171717",
  destructive: "#ef4444",
  "destructive-foreground": "#ffffff",
  border: "#e5e5e5",
  input: "#e5e5e5",
  ring: "#a3a3a3",
  "chart-1": "#8da4ef",
  "chart-2": "#6e56cf",
  "chart-3": "#5b4fc4",
  "chart-4": "#4d41b6",
  "chart-5": "#3a3499",
  radius: "0.625rem",
  sidebar: "#fafafa",
  "sidebar-foreground": "#171717",
  "sidebar-primary": "#171717",
  "sidebar-primary-foreground": "#fafafa",
  "sidebar-accent": "#f5f5f5",
  "sidebar-accent-foreground": "#171717",
  "sidebar-border": "#e5e5e5",
  "sidebar-ring": "#a3a3a3",
  "font-sans": DEFAULT_FONT_SANS,
  "font-serif": DEFAULT_FONT_SERIF,
  "font-mono": DEFAULT_FONT_MONO,

  "shadow-color": "#000000",
  "shadow-opacity": "0.1",
  "shadow-blur": "3px",
  "shadow-spread": "0px",
  "shadow-offset-x": "0",
  "shadow-offset-y": "1px",

  "letter-spacing": "0em",
  spacing: "0.25rem",
};

// ============================================================================
// Default Dark Theme Styles
// ============================================================================

export const defaultDarkThemeStyles = {
  ...defaultLightThemeStyles,
  background: "#171717",
  foreground: "#fafafa",
  card: "#262626",
  "card-foreground": "#fafafa",
  popover: "#333333",
  "popover-foreground": "#fafafa",
  primary: "#e5e5e5",
  "primary-foreground": "#171717",
  secondary: "#333333",
  "secondary-foreground": "#fafafa",
  muted: "#333333",
  "muted-foreground": "#a3a3a3",
  accent: "#474747",
  "accent-foreground": "#fafafa",
  destructive: "#dc2626",
  "destructive-foreground": "#fafafa",
  border: "#363636",
  input: "#404040",
  ring: "#737373",
  "chart-1": "#8da4ef",
  "chart-2": "#6e56cf",
  "chart-3": "#5b4fc4",
  "chart-4": "#4d41b6",
  "chart-5": "#3a3499",
  radius: "0.625rem",
  sidebar: "#262626",
  "sidebar-foreground": "#fafafa",
  "sidebar-primary": "#6e56cf",
  "sidebar-primary-foreground": "#fafafa",
  "sidebar-accent": "#333333",
  "sidebar-accent-foreground": "#fafafa",
  "sidebar-border": "#363636",
  "sidebar-ring": "#525252",

  "shadow-color": "#000000",

  "letter-spacing": "0em",
  spacing: "0.25rem",
};

// ============================================================================
// Default Theme State
// ============================================================================

export const defaultThemeState: ThemeEditorState = {
  styles: {
    light: defaultLightThemeStyles,
    dark: defaultDarkThemeStyles,
  },
  currentMode:
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  layoutMode: "modern",
  hslAdjustments: {
    hueShift: 0,
    saturationScale: 1,
    lightnessScale: 1,
  },
};
