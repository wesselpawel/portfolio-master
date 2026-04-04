/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "1920px",
        "4xl": "2560px",
      },
      fontFamily: {
        sans: ["var(--font-cocosharp)"],
        lato: ["var(--font-lato)"],
        anta: ["var(--font-anta)"],
        dosis: ["var(--font-dosis)"],
      },
      backgroundImage: {
        heroImage: "url('/images/heroImage.jpg')",
      },
    },
  },
  plugins: [],
};
