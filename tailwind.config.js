/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        hack: ["Hack", "monospace"],
      },
      animation: {
        changeColor: "changeColor 0.8s steps(1, end) infinite",
      },
      keyframes: {
        changeColor: {
          "0%": { backgroundColor: "#D9D9D9" },
          "12.5%": { backgroundColor: "#2D2D2D" },
          "25%": { backgroundColor: "#D9D9D9" },
          "100%": { backgroundColor: "#D9D9D9" },
        },
      },
    },
  },
  plugins: [],
};
