module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        customblue: {
          100: "#336d9c",
          200: "#234c6c",
          300: "#142a3c",
          400: "#0c1924",
          500: "#0D1C28",
        },
        custompurple: "#6B5CA5",
        customwhite: "#F4F4F6",
      },
      keyframes: {
        'spin-reverse': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(-360deg)' }
        }
      },
      animation: {
        'spin-reverse': 'spin-reverse 1.2s linear infinite'
      },
    },
  },
  variants: {
    extend: {
      textColor: ['active', "disabled"],
      backgroundColor: ['active', 'disabled'],
      borderColor: ['active', "disabled"],
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [],
}
