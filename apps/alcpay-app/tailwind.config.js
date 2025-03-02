const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');


/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require(join(__dirname, '../../libs/theme/tailwind.config.js'))],
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html,css,js,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};