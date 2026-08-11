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
        background: 'rgb(var(--bg-main) / <alpha-value>)',
        card: 'var(--bg-card)',
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        accent: 'var(--accent)',
        'accent-cyan': 'rgb(var(--accent-cyan) / <alpha-value>)',
        glow: 'var(--glow)',
      },
      fontFamily: {
        english: ['Inter', 'sans-serif'],
        arabic: ['Cairo', 'sans-serif'],
      },
      fontWeight: {
        bold: '500',
      },
    },
  },
  plugins: [],
}
