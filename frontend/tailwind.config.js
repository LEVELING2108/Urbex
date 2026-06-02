/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0c",
        card: "rgba(255, 255, 255, 0.05)",
        primary: {
          DEFAULT: "#8b5cf6",
          foreground: "#ffffff",
        },
        accent: {
          cyan: "#22d3ee",
          violet: "#a78bfa",
        }
      },
      backdropBlur: {
        xs: "2px",
      }
    },
  },
  plugins: [],
}
