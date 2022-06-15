module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      noto: ['"Noto Sans Mono"', 'monospace'],
      poppin: ['Poppins', 'sans-serif'],
      opensans: ['"Open Sans"', 'sans-serif'],
      montserrat: ['Montserrat', 'sans-serif'],
    },
    extend: {
      colors: {
        'dark-blue': '#000577',
        'light-blue': '#a8abff',
        green: '#21e09a',
        orange: '#f4876e',
        'dark-black': '#17181a',
      },
    },
  },
  plugins: [],
};
