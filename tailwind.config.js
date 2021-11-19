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
          600: "#0C1924",
          700: "#0A151E",
          800: "#081118",
          900: "#060D12",
        },
        custompurple: {
          100: "#AEA5CE",
          200: "#978DC0",
          300: "#897DB7",
          400: "#7A6CAE",
          500: "#6B5CA5",
          600: "#605395",
          700: "#564A84",
          800: "#463C6B",
          900: "#362E53",
        },
        customwhite: {
          100: "#FAFAFB",
          200: "#F8F8FA",
          300: "#F7F7F8",
          400: "#F5F5F7",
          500: "#F4F4F6",
          600: "#DCDCDD",
          700: "#CFCFD1",
          800: "#C3C3C5",
          900: "#B7B7B9",
        },
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
