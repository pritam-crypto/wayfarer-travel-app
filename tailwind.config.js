/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#12181B',
        dusk: '#1E2A2F',
        harbor: '#26414A',
        brass: '#C98A4B',
        sand: '#F2ECE1',
        mist: '#8FA8AD',
        signal: '#B4472B',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
}
