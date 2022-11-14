/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {   
      height: {
        '768px': '48rem',
      }
    },
  },
  plugins: [],
}
