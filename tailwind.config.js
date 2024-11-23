/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js}"
  ],
  theme: {
    screens: {
      'sm': '576px',
      'lg': '992px',
      'xl': '1160px',
    },
    extend: {
      fontFamily: {
        'clash' : ['ClashDisplay', 'sans-serif'],
        'corinthia' : ['Corinthia', 'sans-serif']
      },
      colors: {
        'main': '#5DBE8C',
        'second': '#CB75BD',
        'third': '#FFEB5C',
        'fourth':'#5D6CBE'
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '10px',
        md: '15px',
        lg: '20px'
      },
    }
  },
  plugins: [],
}

