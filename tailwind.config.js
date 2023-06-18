/** @type {import('./types/content').ThemeStyle} */
/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const theme = require('./content/data/theme.json');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Google Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        main: theme.main,
        copy: theme.copy,
        'copy-faded': theme.copyFaded,
        primary: theme.primary,
        'primary-int': theme.primaryInt,
        'primary-faded': theme.primaryFaded,
        'on-primary': theme.onPrimary,
        complementary: theme.complementary,
        'complementary-int': theme.complementaryInt,
        'complementary-faded': theme.complementaryFaded,
        'on-complementary': theme.onComplementary,
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
