// eslint-disable-next-line no-undef
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundImage: {
        'green-radial': 'radial-gradient(circle, rgb(50 185 222) 0%, #0e7490 100%)',
        'green-green': 'radial-gradient(circle, #f472b6 0%, #ec4899 100%)',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('daisyui'),
    flowbite.plugin(),

  ],
}

