/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#5c7f67",
          "primary-focus": "#4a6652",
          "primary-content": "#ffffff",
          neutral: "#5d5656",
          "neutral-focus": "#4a4545",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#e9e7e7",
          "base-300": "#d3cfcf",
          "base-content": "#100f0f",
        },
      },
    ],
  },
};
