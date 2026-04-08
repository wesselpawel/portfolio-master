/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./components/quixyComponents/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ctaStart: "#22c55e", // classic green-500
        ctaEnd: "#15803d", // classic green-800
        primaryStart: "#2563eb", // blue-600 (already good)
        primaryEnd: "#1e40af", // blue-800 (already good)
        primaryHoverStart: "#1d4ed8", // blue-700 (already good)
        primaryHoverEnd: "#2563eb", // blue-600 (already good)
        bgStart: "#f8fafc", // slate-50 (very light, clean)
        bgEnd: "#e2e8f0", // slate-200 (soft, subtle)
        accentStart: "#0ea5e9", // sky-500 (modern, not too bright)
        accentEnd: "#0369a1", // sky-800 (deep, for contrast)

        // Zaprojektowani design-system semantic tokens
        // (subset used by the landing components we add)
        primary: "#ffe397",
        "primary-container": "#ecc54c",
        "on-primary": "#3c2f00",
        outline: "#9c8f78",
        "outline-variant": "#504532",
        background: "#131313",
        "surface-tint": "#e9c349",
        surface: "#131313",
        "surface-bright": "#3a3939",
        "surface-variant": "#353534",
        "surface-container-lowest": "#0e0e0e",
        "surface-container-low": "#1c1b1b",
        "surface-container": "#201f1f",
        "surface-container-high": "#2a2a2a",
        "surface-container-highest": "#353534",
        "on-surface": "#e5e2e1",
        "on-surface-variant": "#d4c5ab",
      },
      backgroundImage: {
        courses: "url('/bg-courses.jpg')",
        "woman-pc": "url('/assets/woman-pc.webp')",
        "guitar-man": "url('/assets/guitar-man.webp')",
        login: "url('/assets/login.webp')",
        register: "url('/happy.webp')",
      },
      fontFamily: {
        sans: ["var(--font-cocosharp)"],
        gotham: ["var(--font-gotham)"],
        // semantic design-system font families
        headline: ["var(--font-gotham)"],
        body: ["var(--font-cocosharp)"],
        label: ["var(--font-cocosharp)"],
      },
      animation: {
        "gradient-x": "gradient-x 1.75s ease infinite",
        "gradient-y": "gradient-y 1.75s ease infinite",
        "gradient-xy": "gradient-xy 1.75s ease infinite",
        "-translate-x-100": "-translate-x-100 15s ease infinite",
      },
      keyframes: {
        "-translate-x-100": {
          "0%, 100%": {
            transform: "translateX(0%)",
          },
          "50%": {
            transform: "translateX(-100%)",
          },
        },
        "gradient-y": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "center top",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "center center",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
