/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          bg: '#0B0B0B',
          surface: '#111111',
          gold: '#D4AF37',
          goldDim: 'rgba(212, 175, 55, 0.05)',
          red: '#8B0000',
          redDim: 'rgba(139, 0, 0, 0.05)',
          border: '#222222',
          textMuted: '#555555',
          textPrimary: '#EEEEEE'
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
