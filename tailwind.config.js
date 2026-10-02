/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        peao: {
          50: '#fbf7f0',
          100: '#f5ecdc',
          200: '#ebd7b8',
          300: '#dfbc8d',
          400: '#d39e62',
          500: '#c88340',
          600: '#ba6e34',
          700: '#9b542c',
          800: '#7d442a',
          900: '#663925',
          950: '#381c12',
        },
        firma: {
          navy: '#0f172a',
          card: '#1e293b',
          border: '#334155',
          gold: '#f59e0b',
          coffee: '#854d0e',
        }
      },
      fontFamily: {
        serif: ['Merriweather', 'Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Fira Code', 'Courier New', 'monospace'],
      }
    },
  },
  plugins: [],
}
