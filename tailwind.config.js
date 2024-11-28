/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      screens: {
        'lg': '992px',
        'xl': '1160px',
        '2xl': '1367px',
        // => @media (min-width: 1536px) { ... }
      },
      fontFamily: {
        'clash' : ['ClashDisplay', 'sans-serif'],
        'corinthia' : ['Corinthia', 'sans-serif']
      },
      fontSize: {
        'hero-name': 'clamp(4.0625rem, -0.3125rem + 21.875vw, 8.4375rem)',
        'hero-name-cursive': 'clamp(4.0625rem, 1.875rem + 10.9375vw, 6.25rem)',
        'hero-text': 'clamp(1.4375rem, 0.8125rem + 3.125vw, 2.0625rem)',
        'prof-title': 'clamp(2.1875rem, 1.25rem + 4.6875vw, 3.125rem)',
        'family-title':'clamp(2.8125rem, 2.25rem + 2.8125vw, 3.375rem)',
        'form-title':'clamp(1.5625rem, 1.125rem + 2.1875vw, 2rem)',
        'discuss-title':'clamp(2rem, 0.625rem + 6.875vw, 3.375rem)',
        'client-title':'clamp(2.1875rem, 1rem + 5.9375vw, 3.375rem)',
      },
      height: {
        'header': 'calc(100vh - 60px)',
        'hero-height-green':'clamp(23.75rem, 16.25rem + 37.5vw, 31.25rem)',
      },
      colors: {
        'main': '#5DBE8C',
        'second': '#CB75BD',
        'third': '#FFEB5C',
        'fourth':'#5D6CBE'
      },
      animation: {
        'spin-slow': 'spin 7s linear infinite',
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '15px',
        lg: '20px'
      },
      // screens: {
      //   // 'lg': '992px',
      //   // 'xl': '1160px'
      // },
    }
  },
  plugins: [],
}

