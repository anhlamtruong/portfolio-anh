# Theme Service

Centralized theme system for this project with:
- Light/Dark mode state
- CSS variable application to `document.documentElement`
- Built-in presets + runtime preset registration
- Undo/redo + checkpoint support in editor state
- URL preset support via `?theme=<preset-name>`

Entry point: `@/services/theme`

---

## 1) Dependencies to add

### Required (missing in current `package.json`)
```bash
npm install zustand nuqs culori @ngard/tiny-isequal
```

### Already present in this repo
- `react`, `next`
- `zod`
- `lucide-react` (used by `ThemeLoader` and `ThemeEditor`)

### Optional (only if using `ThemeEditor` UI)
`ThemeEditor` depends on your app UI layer (`@/components/ui/*`, `@/lib/utils`, `next/link`).

---

## 2) How to use

## A. Wrap your app with provider

Create a client wrapper (recommended for App Router):

```tsx
// src/app/theme-client-provider.tsx
"use client";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ThemeProvider, ThemeLoader } from "@/services/theme";

export function ThemeClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      <ThemeProvider>
        <ThemeLoader>{children}</ThemeLoader>
      </ThemeProvider>
    </NuqsAdapter>
  );
}
```

Then use it in `src/app/layout.tsx`:

```tsx
import { ThemeClientProvider } from "./theme-client-provider";

// inside <body>
<ThemeClientProvider>{children}</ThemeClientProvider>
```

> Why `NuqsAdapter`? `ThemeProvider` uses `useThemePresetFromUrl()` internally, which uses `nuqs` query state.

---

## B. Toggle theme in components

```tsx
"use client";
import { useTheme } from "@/services/theme";

export function ThemeSwitchButton() {
  const { theme, setTheme, toggleTheme } = useTheme();

  return (
    <div className="flex gap-2">
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <button onClick={() => toggleTheme()}>
        Toggle (current: {theme})
      </button>
    </div>
  );
}
```

---

## C. Apply presets

### By store action
```tsx
"use client";
import { useEditorStore } from "@/services/theme";

export function PresetButton() {
  const applyThemePreset = useEditorStore((s) => s.applyThemePreset);
  return <button onClick={() => applyThemePreset("violet-bloom")}>Use Violet Bloom</button>;
}
```

### By URL
Open:
```text
/?theme=violet-bloom
```
The provider will apply the preset and remove the query param.

---

## D. Register custom presets at runtime

```tsx
"use client";
import { useThemePresetStore } from "@/services/theme";

export function RegisterPreset() {
  const registerPreset = useThemePresetStore((s) => s.registerPreset);

  const addPreset = () => {
    registerPreset("my-brand", {
      source: "SAVED",
      label: "My Brand",
      styles: {
        light: { primary: "#2563eb", background: "#ffffff" },
        dark: { primary: "#60a5fa", background: "#0b1220" },
      },
    });
  };

  return <button onClick={addPreset}>Add My Preset</button>;
}
```

---

## 3) API surface (from `@/services/theme`)

- Types: `ThemeStyleProps`, `ThemeStyles`, `ThemePreset`, `ThemeEditorState`, `ThemeMode`, ...
- Config: `defaultThemeState`, `defaultLightThemeStyles`, `defaultDarkThemeStyles`, `COMMON_STYLES`
- Stores: `useEditorStore`, `useThemePresetStore`
- Presets: `defaultPresets`, `getBuiltInThemeStyles`, `getPresetThemeStyles`
- Apply utils: `applyStyleToElement`, `applyThemeToElement`, `getShadowMap`, `setShadowVariables`
- Hooks: `useThemePresetFromUrl`
- Provider/components: `ThemeProvider`, `useTheme`, `ThemeLoader`

---

## 4) Notes

- This service sets CSS custom properties on the root element (`document.documentElement`) and toggles the `dark` class.
- It is designed to work with token-based styling (e.g. Tailwind + CSS vars like `hsl(var(--primary))`).
- If you already use `next-themes`, avoid running two theme providers in parallel for the same UI tree.
