/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'primary': '#3296ff',
        'primarydark': '#2758b2',
        'white': '#ffffff',
        'secondary': '#252c39',
        'accent': '#1a202c',
        
      },
    },
  },
  plugins: [],
}
