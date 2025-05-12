"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { LucideIcon, Moon, Sun, TowerControl, Waves } from "lucide-react";
export type Theme = "light" | "dark" | "ocean-blue" | "tokyo-night";
export interface ThemeContextProps {
  themeColors: ThemeColors;
  theme: Theme;
}
type ThemeIconMapping = {
  [key in Theme]: React.ReactNode;
};
export const themeIcons: ThemeIconMapping = {
  light: <Sun />,
  dark: <Moon />,
  "ocean-blue": <Waves />,
  "tokyo-night": <TowerControl />,
};
export interface ThemeObjectsProps {
  backgroundPrimary: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  backgroundPrimaryOpacity: string;
  backgroundSecondaryOpacity: string;
  backgroundTertiaryOpacity: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textTint: string;
  textShade: string;
  borderPrimary: string;
  borderSecondary: string;
  hoverText: string;
  hoverBorder: string;
  hoverBackground: string;
}

export type ThemeColors = {
  [key in Theme]: {
    backgroundPrimary: string;
    backgroundSecondary: string;
    backgroundTertiary: string;
    backgroundPrimaryOpacity: string;
    backgroundSecondaryOpacity: string;
    backgroundTertiaryOpacity: string;
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;
    textTint: string;
    textShade: string;
    borderPrimary: string;
    borderSecondary: string;
    hoverText: string;
    hoverBorder: string;
    hoverBackground: string;
  };
};

const themeColors: ThemeColors = {
  light: {
    backgroundPrimary: "#ffffff",
    backgroundSecondary: "#e0e0e0",
    backgroundTertiary: "#bdbdbd",
    backgroundPrimaryOpacity: "rgba(255, 255, 255, 0.9)",
    backgroundSecondaryOpacity: "rgba(224, 224, 224, 0.9)",
    backgroundTertiaryOpacity: "rgba(189, 189, 189, 0.9)",
    textPrimary: "#212121",
    textSecondary: "#757575",
    textTertiary: "#9e9e9e",
    textTint: "#e0e0e0",
    textShade: "#616161",
    borderPrimary: "#e0e0e0",
    borderSecondary: "#bdbdbd",
    hoverText: "#3b82f6",
    hoverBorder: "#010408",
    hoverBackground: "#3b82f6",
  },
  dark: {
    backgroundPrimary: "#212121",
    backgroundSecondary: "#424242",
    backgroundTertiary: "#616161",
    backgroundPrimaryOpacity: "rgba(33, 33, 33, 0.9)",
    backgroundSecondaryOpacity: "rgba(66, 66, 66, 0.9)",
    backgroundTertiaryOpacity: "rgba(97, 97, 97, 0.9)",
    textPrimary: "#ffffff",
    textSecondary: "#bdbdbd",
    textTertiary: "#9e9e9e",
    textTint: "#757575",
    textShade: "#424242",
    borderPrimary: "#616161",
    borderSecondary: "#424242",
    hoverText: "#ec4899",
    hoverBorder: "#424242",
    hoverBackground: "#8b5cf6",
  },
  "ocean-blue": {
    backgroundPrimary: "#0288d1",
    backgroundSecondary: "#03a9f4",
    backgroundTertiary: "#4fc3f7",
    backgroundPrimaryOpacity: "rgba(2, 136, 209, 0.9)",
    backgroundSecondaryOpacity: "rgba(3, 169, 244, 0.9)",
    backgroundTertiaryOpacity: "rgba(79, 195, 247, 0.9)",
    textPrimary: "#01579b",
    textSecondary: "#0277bd",
    textTertiary: "#0288d1",
    textTint: "#4fc3f7",
    textShade: "#03a9f4",
    borderPrimary: "#0277bd",
    borderSecondary: "#0288d1",
    hoverText: "#f48c06",
    hoverBorder: "#4fc3f7",
    hoverBackground: "#0288d1",
  },
  "tokyo-night": {
    backgroundPrimary: "#1a202c",
    backgroundSecondary: "#2d3748",
    backgroundTertiary: "#4a5568",
    backgroundPrimaryOpacity: "rgba(26, 32, 44, 0.9)",
    backgroundSecondaryOpacity: "rgba(45, 55, 72, 0.9)",
    backgroundTertiaryOpacity: "rgba(74, 85, 104, 0.9)",
    textPrimary: "#edf2f7",

    textSecondary: "#a0aec0",
    textTertiary: "#718096",
    textTint: "#e2e8f0",
    textShade: "#a0aec0",
    borderPrimary: "#4a5568",
    borderSecondary: "#2d3748",
    hoverText: "#f56565",
    hoverBorder: "#2d3748",
    hoverBackground: "#f56565",
  },
};

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themeColors: ThemeColors;
}
interface ThemeProviderProps {
  children: React.ReactNode;
}

export const getLinearGradient = (currentTheme: Theme) => {
  switch (currentTheme) {
    case "tokyo-night":
      return "linear-gradient(305deg,rgba(245, 101, 101, 0.3) 45%,  rgba(22, 27, 37, 0.3)50%)";
    case "dark":
      return "linear-gradient(305deg,rgba(96, 50, 203, 0.3) 30%,  rgba(49, 69, 98, 0.3)70%)";
    case "ocean-blue":
      return "linear-gradient(305deg,rgba(0, 31, 41, 0.3)  45%, rgba(0, 140, 169, 0.3) 50%)";
    default:
      return "linear-gradient(305deg,rgba(153, 153, 153, 0.3) 45%,  rgba(121, 246, 202, 0.271)50%)";
  }
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  setTheme: () => {},
  themeColors,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    document.documentElement.classList.remove(
      "dark",
      "ocean-blue",
      "tokyo-night"
    );
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};
