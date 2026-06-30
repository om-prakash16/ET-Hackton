import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090B", // zinc-950
        foreground: "#FAFAFA", // zinc-50
        brand: {
          cyan: "#06B6D4",     // cyan-500
          purple: "#6366F1",   // indigo-500
          magenta: "#E11D48",  // rose-600
          dark: "#18181B",     // zinc-900
          glass: "rgba(24, 24, 27, 0.4)", // Muted glass background
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
