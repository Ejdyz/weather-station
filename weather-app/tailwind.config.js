/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [nextui({
    themes: {
      light: {
        colors: {

          secondary: { //temp
            DEFAULT: "#ffcd25",
            foreground: "#fff",
          },
          danger: { //humidity
            DEFAULT: "#99e513",
            foreground: "#fff",
          },
          warning: { //pressure
            DEFAULT: "#ff5757",
            foreground: "#fff",
          },
          success: { //rain
            DEFAULT: "#87d5ff",
            foreground: "#fff",
          }
        ,
        },
      },
    },
  }), require("tailwindcss-animate")],
}
