/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#070B14",
        foreground: "#FFFFFF",
        card: "#111827",
        "card-hover": "#182234",
        sidebar: "#0B1120",
        border: "#273449",
        primary: "#3B82F6",
        "primary-hover": "#2563EB",
        accent: "#8B5CF6",
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
        info: "#06B6D4",
        muted: "#182234",
        "muted-foreground": "#94A3B8"
      }
    },
  },
  plugins: [],
}
