import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#F2F6FB",
          100: "#E2EBF5",
          200: "#C2D5E9",
          300: "#93B3D5",
          400: "#5C88BA",
          500: "#36659C",
          600: "#1F4E81",
          700: "#173E69",
          800: "#123253",
          900: "#0E2740",
          950: "#081827",
        },
        gold: {
          50: "#FDF9EF",
          100: "#FAF0D8",
          200: "#F3DFAC",
          300: "#E8C878",
          400: "#D9AC48",
          500: "#C9952A",
          600: "#A87720",
          700: "#85591C",
          800: "#6B471D",
          900: "#5A3C1C",
        },
        sand: {
          50: "#FBFAF7",
          100: "#F5F3ED",
          200: "#EBE7DE",
          300: "#DDD8CB",
        },
        ink: {
          DEFAULT: "#15202E",
          soft: "#46556A",
          faint: "#7C8798",
        },
        line: "#E7E3D9",
        emerald2: "#0F7B5A",
      },
      fontFamily: {
        sans: ["var(--font-arabic)", "Tajawal", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,32,52,.04), 0 8px 24px -12px rgba(16,32,52,.12)",
        lift: "0 2px 4px rgba(16,32,52,.05), 0 18px 40px -20px rgba(16,32,52,.22)",
        inset1: "inset 0 0 0 1px rgba(231,227,217,.9)",
      },
      maxWidth: {
        shell: "1240px",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        growX: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        fadeUp: "fadeUp .5s cubic-bezier(.22,.61,.36,1) both",
        growX: "growX .9s cubic-bezier(.22,.61,.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
