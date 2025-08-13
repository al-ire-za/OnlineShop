/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "contact.html", "script.js"],

  safelist: [
    "bg-black/90",
    "bg-white/80",
    "bg-bgh"
  ],
  
  theme: {
    extend: {
       fontFamily: {
          vazir: ['Vazir', 'sans-serif'],
       },
       colors: {
        bgh : "#404040",
       }
    },
  },
  plugins: [],
}

