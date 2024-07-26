/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: "#a4a7b7",
        dim: "#cdd1d2",
      },
      backdropFilter: {
        none: "none",
        blur: "blur(10px)",
      },
    },
  },
  variants: {
    backdropFilter: ["responsive"],
  },
  plugins: [require("tailwindcss-filters")],
};
