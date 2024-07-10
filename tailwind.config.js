/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "dm-sans": ['"DM Sans"'],
      },
      colors: {
        primary: "#7C74D4",
        secondary: "#FF1919",
        background: "#FAF8F8",
        "font-light": "#7C7C8D",
        "font-bold": "#242731",
        "font-normal": "#5F6165",
        line: "#E9EAEC",
      },
    },
  },
  plugins: [],
};
