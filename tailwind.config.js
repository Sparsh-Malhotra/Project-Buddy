/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
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
        subtitle2: "#202430",
      },
      BgColor: {
        DEFAULT: "#F8F8FD",
      },
      boxCard: {
        DEFAULT: "#D6DDEB",
      },
    },

    extend: {
      fontFamily: {
        RedHatDisplay: ["Red Hat Display", "sans-serif"],
        ClashDisplay: ["ClashDisplay-Semibold"],
        Epilogue: ["Epilogue", "sans-serif"],
        Inter: ["Inter, sans-serif"],
      },
      fontSize: {
        title: "1.5rem",
        double: "2rem",
      },
    },
  },
  plugins: [],
};
