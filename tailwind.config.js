/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require('tailwind-scrollbar'),
    // Other plugins
  ],
  theme: {
    extend: {
      fontFamily: {
        // inter: ["Inter", "sans-serif"],
        inter: ["Calibri", "sans-serif"],
        // Rubik
        rubik: ["Rubik", "sans-serif"],
      },
      fontWeight: {
        customweight: '500', // Özel bir font ağırlığı
      },
    },
  },
  plugins: [],
}