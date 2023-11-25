/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        gold: "#ffd700",
        text: "#000000",
        background: "#f2f9fc",
        primary: "#0ea5e9",
        accent: "#10b981",
      },
    },
  },
  plugins: [],
};
