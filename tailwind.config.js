/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      Primary: {
        DEFAULT: "#4640DE",
        highlight: "#26A4FF",
        title: "#25324B",
        subtitle: "#7C8493",
      },
      BgColor: {
        DEFAULT: "#F8F8FD",
      },
    },
    fontSize: {
      title: "1.5rem",
      "3xl": "2rem",
    },
    extend: {
      fontFamily: {
        RedHatDisplay: ["Red Hat Display", "sans-serif"],
        ClashDisplay: ["ClashDisplay-Semibold"],
        Epilogue: ["Epilogue", "sans-serif"],
      },
    },
  },
  plugins: [],
};
