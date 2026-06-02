/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        parchment: "#e8d7b4",
        wax: "#7a1f1f",
        ink: "#1f140f",
        gold: "#c6a16e",
        shadow: "#120d0b",
      },

      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        body: ["EB Garamond", "serif"],
      },
    },
  },

  plugins: [],
}