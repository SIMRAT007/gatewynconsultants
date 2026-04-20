/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#142845',
          50: '#e8edf4',
          100: '#c5d1e3',
          200: '#9eb2cf',
          300: '#7793bb',
          400: '#587bac',
          500: '#3963a0',
          600: '#2e5491',
          700: '#204278',
          800: '#142845',
          900: '#0c1c30',
        },
        gold: {
          DEFAULT: '#E7CD87',
          50: '#fdf9ed',
          100: '#f9f0d0',
          200: '#f4e4a8',
          300: '#E7CD87',
          400: '#d4b05c',
          500: '#c19438',
          600: '#a67c2e',
          700: '#846125',
          800: '#644a1c',
          900: '#4a3513',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Outfit"', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'slide-up': 'slideUp 0.7s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
