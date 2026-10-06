/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#14151A',
        paper: '#F5F6F8',
        line: '#E6E8EC',
        muted: '#636877',
        accent: {
          DEFAULT: '#4338FF',
          dark: '#3329D9',
          soft: '#ECEBFF',
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        nav: '0 8px 30px -12px rgba(20, 21, 26, 0.18)',
        drawer: '-24px 0 60px -20px rgba(20, 21, 26, 0.25)',
      },
    },
  },
  plugins: [],
}