/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: { colors: {
      customDark: 'rgb(20, 20, 32)',
    },
  },
  },
  plugins: [],
}

