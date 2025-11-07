import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EBFBFF",
          100: "#D5F5FF",
          200: "#AAE7FF",
          300: "#6FD3FF",
          400: "#2EB8FF",
          500: "#0092E6",
          600: "#0072C4",
          700: "#0056A0",
          800: "#003F7A",
          900: "#002651"
        },
        success: "#22C55E",
        warning: "#FABB05",
        danger: "#EF4444"
      },
      boxShadow: {
        soft: "0 20px 45px -20px rgba(15, 23, 42, 0.25)"
      },
      fontFamily: {
        sans: ["var(--font-sans)"]
      },
      maxWidth: {
        content: "110rem"
      }
    }
  },
  plugins: []
} satisfies Config;

export default config;
