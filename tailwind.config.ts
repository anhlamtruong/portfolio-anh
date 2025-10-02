import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/services/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Keep your sans-serif font if you want, or define it here
        sans: ["var(--font-inter)", "sans-serif"],
        // Add Roboto Serif as the 'serif' font
        // We use `font-serif` to apply Roboto Serif.
        //We use `font-black` to apply the 900 weight we loaded.
        serif: ["var(--font-roboto-serif)", "serif"],
      },
      keyframes: {
        animStar: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-2000px)" },
        },
        loaderPathCircle: {
          "25%": { strokeDashoffset: "125" },
          "50%": { strokeDashoffset: "175" },
          "75%": { strokeDashoffset: "225" },
          "100%": { strokeDashoffset: "275" },
        },
        loaderPathTriangle: {
          "33%": { strokeDashoffset: "74" },
          "66%": { strokeDashoffset: "147" },
          "100%": { strokeDashoffset: "221" },
        },
        loaderPathRect: {
          "25%": { strokeDashoffset: "64" },
          "50%": { strokeDashoffset: "128" },
          "75%": { strokeDashoffset: "192" },
          "100%": { strokeDashoffset: "256" },
        },
        loaderDotCircle: {
          "0%": { transform: "translate(-18px, -18px)" },
          "25%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(18px, -18px)" },
          "75%": { transform: "translate(0, -36px)" },
          "100%": { transform: "translate(-18px, -18px)" },
        },
        loaderDotTriangle: {
          "0%": { transform: "translate(-10px, -18px)" },
          "33%": { transform: "translate(0, 0)" },
          "66%": { transform: "translate(10px, -18px)" },
          "100%": { transform: "translate(-10px, -18px)" },
        },
        loaderDotRect: {
          "0%": { transform: "translate(-18px, -18px)" },
          "25%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(18px, -18px)" },
          "75%": { transform: "translate(0, -36px)" },
          "100%": { transform: "translate(-18px, -18px)" },
        },
      },
      animation: {
        loaderPathCircle:
          "loaderPathCircle 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite",
        loaderPathTriangle:
          "loaderPathTriangle 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite",
        loaderPathRect:
          "loaderPathRect 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite",
        loaderDotCircle:
          "loaderDotCircle 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite",
        loaderDotTriangle:
          "loaderDotTriangle 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite",
        loaderDotRect:
          "loaderDotRect 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite",
        "star-sm": "animStar 50s linear infinite",
        "star-md": "animStar 100s linear infinite",
        "star-lg": "animStar 150s linear infinite",
      },

      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
