/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/*.{html,js}"],
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
        secondary: "#c8e6f4",
        accent: "#4c963c",
      },
    },
  },
  plugins: [],
};
