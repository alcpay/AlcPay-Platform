// Nx Angular Tailwind Config
const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

// Flowbite & Flowbite Angular Tailwind Config
const flowbite = require('flowbite/plugin');
const flowbiteAngularTailwindConfig = require('flowbite-angular/tailwind.config');
// Tailwind Config
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [flowbiteAngularTailwindConfig],
  content: [
    join(__dirname, '../../apps/**/*.{html,ts,css}'),
    join(__dirname, '../../libs/components/**/*.{html,ts,css}'),
    join(__dirname, 'node_modules/flowbite/**/*.js'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite],
};

console.log('libs/theme/tailwind.config.js', module.exports);