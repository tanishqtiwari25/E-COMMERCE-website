/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Isse dark mode seamlessly toggle hoga
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Saare components ka path
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Premium modern typography ke liye
      },
    },
  },
  plugins: [],
}