/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {      
      boxShadow: {
      't': '0 10px 15px 4px rgb(0 0 0 / 0.3), 0 4px 8px -4px rgb(0 0 0 / 0.3)',
    }},
  },
  plugins: [],
}
