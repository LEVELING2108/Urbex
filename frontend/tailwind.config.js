/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "oklch(0.141 0.005 285.823)",
        foreground: "oklch(0.985 0 0)",
        card: {
          DEFAULT: "oklch(0.21 0.006 285.885 / 0.4)",
          foreground: "oklch(0.985 0 0)",
        },
        primary: {
          DEFAULT: "oklch(0.541 0.281 293.009)",
          foreground: "oklch(0.969 0.016 293.756)",
        },
        secondary: {
          DEFAULT: "oklch(0.274 0.006 286.033)",
          foreground: "oklch(0.985 0 0)",
        },
        muted: {
          DEFAULT: "oklch(0.274 0.006 286.033)",
          foreground: "oklch(0.705 0.015 286.067)",
        },
        accent: {
          cyan: "oklch(0.7 0.16 200)",
          violet: "oklch(0.541 0.281 293.009)",
        },
        emerald: {
          500: "oklch(0.696 0.17 162.48)",
        },
        amber: {
          500: "oklch(0.769 0.188 70.08)",
        }
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 4s infinite',
        'noise': 'noise 8s steps(10) infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%) rotate(25deg)' },
          '100%': { transform: 'translateX(100%) rotate(25deg)' },
        },
        noise: {
          '0%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-5%,-5%)' },
          '20%': { transform: 'translate(-10%,5%)' },
          '30%': { transform: 'translate(5%,-10%)' },
          '40%': { transform: 'translate(-5%,15%)' },
          '50%': { transform: 'translate(-10%,5%)' },
          '60%': { transform: 'translate(15%,0)' },
          '70%': { transform: 'translate(0,10%)' },
          '80%': { transform: 'translate(-15%,0)' },
          '90%': { transform: 'translate(10%,5%)' },
          '100%': { transform: 'translate(5%,0)' },
        }
      }
    },
  },
  plugins: [],
}
