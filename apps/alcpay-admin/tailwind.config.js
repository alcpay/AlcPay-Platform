const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

const flowbite = require('flowbite/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('../../libs/theme/tailwind.config.js')],
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html,css}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite],
};

console.log('alcpay-admin/tailwind.config.js', module.exports);
