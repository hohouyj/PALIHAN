import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette taken from the official Kadungganan Sheet
        maroon: {
          DEFAULT: "#6B1414",
          dark: "#4a0d0d",
          light: "#8a2020",
        },
        gold: {
          DEFAULT: "#E08A1E",
          dark: "#b96f13",
          light: "#f0a640",
        },
        parchment: {
          DEFAULT: "#f6efe2",
          dark: "#ece1cb",
        },
        ink: "#2a1a12",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
