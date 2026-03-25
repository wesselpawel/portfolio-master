/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
