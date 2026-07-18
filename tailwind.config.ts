import type { Config } from "tailwindcss";

/**
 * Sistema de diseño de LICITATIS.
 * Concepto: "Del expediente disperso al proceso bajo control".
 *  - ink:   navy sobrio -> seriedad, control, "expediente".
 *  - brand: verde esmeralda -> "en plazo / conforme / adjudicado". Diferencia del SaaS morado.
 *  - amber: acento puntual -> plazos y alertas.
 *  - paper: papel cálido de fondo.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        paper: {
          DEFAULT: "#FBFAF9",
          muted: "#F3F4F2",
          contrast: "#FFFFFF",
        },
        ink: {
          50: "#F1F4F9",
          100: "#DCE3EE",
          200: "#B9C5D9",
          300: "#8A9CBB",
          400: "#5E749A",
          500: "#3B5074",
          600: "#27395B",
          700: "#1A2740",
          800: "#101A2E",
          900: "#0B1220",
          950: "#070B14",
        },
        brand: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
          950: "#022C22",
        },
        amber: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        display: ["var(--font-space-grotesk)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],
      },
      maxWidth: {
        content: "1200px",
        prose: "68ch",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(11, 18, 32, 0.04), 0 4px 16px rgba(11, 18, 32, 0.06)",
        card: "0 2px 4px rgba(11, 18, 32, 0.04), 0 12px 32px -8px rgba(11, 18, 32, 0.12)",
        lift: "0 18px 48px -12px rgba(11, 18, 32, 0.22)",
        "brand-glow": "0 12px 32px -10px rgba(5, 150, 105, 0.45)",
        "inset-hairline": "inset 0 0 0 1px rgba(11, 18, 32, 0.08)",
      },
      backgroundImage: {
        "grid-ink":
          "linear-gradient(to right, rgba(11,18,32,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,18,32,0.045) 1px, transparent 1px)",
        "grid-light":
          "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "32px 32px",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.16,1,0.3,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
