module.exports = {
  purge: [
    "./pages/**/*.js",
    "./pages/**/*.jsx",
    "./pages/**/*.ts",
    "./pages/**/*.tsx",
    "./components/**/*.js",
    "./components/**/*.jsx",
    "./components/**/*.ts",
    "./components/**/*.tsx",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
