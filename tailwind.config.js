module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        customblue: "#0D1C28",
        custompurple: "#6B5CA5",
        customwhite: "#F4F4F6",
      }
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
}
