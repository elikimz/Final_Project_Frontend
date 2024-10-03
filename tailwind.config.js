/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Blue for the main brand color
        secondary: "#16A34A", // Green for secondary buttons and accents
        accent: "#EF4444", // Red for attention areas like login/register
        background: "#F3F4F6", // Light background
        text: "#374151", // Dark text
      },
    },
  },
  plugins: [
    daisyui,
  ],
}
