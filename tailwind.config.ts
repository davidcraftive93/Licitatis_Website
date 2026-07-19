import type { Config } from "tailwindcss";

/**
 * Sistema de diseño de LICITATIS — tokens REALES de la app (brand kit).
 * La web debe sentirse hermana del producto: cabina de control moderna, no folleto.
 *  - brand:  violeta eléctrico #6A25F5 (primario: acciones, focos, acentos).
 *  - purple/magenta/coral/iris: acentos del degradado de marca y métricas.
 *  - ink:    grafito/casi-negro (shell oscuro, texto).
 *  - paper:  blanco frío #F7F6FD (fondo operativo).
 * El color de marca es ACENTO, no relleno. Máximo un gradiente protagonista por pantalla.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        paper: { DEFAULT: "#F7F6FD", muted: "#EEEDF8", contrast: "#FFFFFF" },
        ink: {
          50: "#F1F2F8",
          100: "#E2E4F0",
          200: "#C6CADD",
          300: "#9CA3C0",
          400: "#6E7699",
          500: "#4A5478",
          600: "#333B5C",
          700: "#232A45",
          800: "#171C33",
          900: "#11162A",
          950: "#090817",
        },
        brand: {
          50: "#F4EFFE",
          100: "#E9D8FF",
          200: "#D5BAFC",
          300: "#BB93F8",
          400: "#9A5EF6",
          500: "#6A25F5",
          600: "#5A1FD6",
          700: "#4C1CAF",
          800: "#3E1585",
          900: "#2C0F5C",
          950: "#1B0940",
        },
        purple: "#6326AB",
        magenta: "#F12C78",
        coral: "#F87046",
        iris: "#2835E8",
        lavender: "#E9D8FF",
        amber: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        display: ["var(--font-poppins)", "var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: { "2xs": ["0.6875rem", { lineHeight: "1rem" }] },
      letterSpacing: { tightest: "-0.04em" },
      maxWidth: { content: "1200px", prose: "68ch" },
      borderRadius: { "4xl": "2rem", "5xl": "2.5rem" },
      boxShadow: {
        soft: "0 1px 2px rgba(9, 8, 23, 0.04), 0 4px 16px rgba(9, 8, 23, 0.06)",
        card: "0 2px 4px rgba(9, 8, 23, 0.04), 0 12px 32px -8px rgba(9, 8, 23, 0.12)",
        lift: "0 18px 48px -12px rgba(9, 8, 23, 0.22)",
        float: "0 30px 60px -20px rgba(9, 8, 23, 0.32)",
        "brand-glow": "0 12px 32px -10px rgba(106, 37, 245, 0.45)",
        "brand-glow-lg": "0 24px 60px -18px rgba(106, 37, 245, 0.55)",
        "inset-hairline": "inset 0 0 0 1px rgba(9, 8, 23, 0.08)",
        "inset-hairline-light": "inset 0 0 0 1px rgba(255, 255, 255, 0.10)",
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(100deg, #6A25F5 0%, #F12C78 58%, #F87046 100%)",
        "gradient-ink": "linear-gradient(155deg, #090817 0%, #11162A 55%, #241056 100%)",
        "gradient-soft": "linear-gradient(180deg, #E9D8FF 0%, #F7F6FD 72%)",
        "grid-ink":
          "linear-gradient(to right, rgba(9,8,23,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(9,8,23,0.045) 1px, transparent 1px)",
        "grid-light":
          "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
      },
      backgroundSize: { grid: "32px 32px" },
      transitionTimingFunction: { "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)" },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 7s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.16,1,0.3,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
