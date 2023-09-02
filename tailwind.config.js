/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        hack: ["Hack", "Gothic A1"],
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
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".multi-line-ellipsis": {
          height: "4.5rem",
          display: "-webkit-box",
          overflow: "hidden",
          "-webkit-line-clamp": "3", // 3줄로 설정. 필요에 따라 이 값을 변경할 수 있습니다.
          "-webkit-box-orient": "vertical",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
