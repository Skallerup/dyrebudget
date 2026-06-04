import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
        /* "navy" beholder navnet for kompatibilitet, men er nu en varm,
           næsten-sort charcoal (Adoption Pets-stilens mørke bånd/tekst). */
        navy: {
          50: "#f7f6f5",
          100: "#eeecea",
          200: "#dcd8d4",
          300: "#bdb7b1",
          400: "#8f8881",
          500: "#6b645d",
          600: "#4f4944",
          700: "#3a3531",
          800: "#262320",
          900: "#1a1817",
          950: "#0f0e0d",
        },
        /* "mint" beholder navnet, men er nu den varme orange CTA-accent. */
        mint: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f5921e",
          600: "#ea7c0c",
          700: "#c2620a",
          800: "#9a4e0f",
          900: "#7c3f10",
        },
        /* Coral — sekundær accent til hero-gradient og hjerte-detaljer. */
        coral: {
          50: "#fef2f1",
          100: "#fde4e1",
          200: "#fbcac4",
          300: "#f7a59b",
          400: "#f2746a",
          500: "#ef4e45",
          600: "#d83a31",
          700: "#b52d26",
          800: "#952824",
          900: "#7c2522",
        },
        /* Lyseblå info-paneler fra referencen. */
        sky: {
          50: "#f0f9fc",
          100: "#dcf0f7",
          200: "#bce4f0",
          300: "#8fd4e8",
          400: "#5bbcd8",
          500: "#3aa1c4",
          600: "#2d83a5",
        },
        sand: {
          50: "#faf9f7",
          100: "#f5f0e8",
          200: "#ede4d0",
          300: "#ddd0b3",
          400: "#c9b48f",
          500: "#b89a6f",
          600: "#a07c52",
          700: "#876442",
          800: "#6f5138",
          900: "#5c4431",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.4s ease-out",
        "count-up": "count-up 1s ease-out",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
