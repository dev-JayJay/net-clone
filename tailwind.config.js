/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      // Customize / new external style
      backgroundColor: {
        bgred: '#8b0000'
      },
      colors:{
        Ared: '#FF2400',
        subRed : '#F20000',
        main : '#080A1A'
      },
      fontFamily: {
        Croissant: ['Croissant One','cursive'],
        Kenio: ['Kenio', 'cursive'],
        segoe: ['Segoe UI', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'size': '20px'
      },
      width: {
        'width':'1160px',
         width1:'600px'
      },
      height: {
        'height':'380px',
        height1:'25rem',
        height2:'50px'
      }
    },
  },
  plugins: [],
}