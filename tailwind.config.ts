import type { Config } from 'tailwindcss';
const { addDynamicIconSelectors } = require("@iconify/tailwind")

export default {
  content: [
    './index.html',
    './src/**/*.{html,ts,md,analog,ag}',
    './node_modules/flyonui/dist/js/*.js',
  ],
  flyonui: {
    themes: [
      {
        alcpayTheme: {
          "primary": "#f0f0f0",
          "primary-content": "#343434",
          "secondary": "#b2ff51",
          "secondary-content": "#080a0a",
          "accent": "#010101",
          "accent-content": "#080a0a",
          "neutral": "#e0e0e0",
          "neutral-content": "#080a0a",
          "base-100": "#ffffff",
          "base-200": "#e8eef0",
          "base-300": "#d7dadc",
          "base-content": "#080a0a",
          "info": "#00ade4",
          "info-content": "#ffffff",
          "success": "#2ecc71",
          "success-content": "#080a0a",
          "warning": "#ffbe00",
          "warning-content": "#080a0a",
          "error": "#ff412e",
          "error-content": "#ffffff",
          "--rounded-box": "1.0rem", // border-radius for large boxes
          "--rounded-btn": "0.75rem", // border-radius for buttons
          "--rounded-tooltip": "2rem", // border-radius for tooltip
          "--animation-btn": "0.27s", // button click animation duration
          "--animation-input": "0.27s", // input animation duration (e.g., checkboxes, switch)
          "--btn-focus-scale": "0.95", // button scale transform on focus
          "--border-btn": "1px", // button border width
          "--tab-border": "1px", // tab border width
          "--tab-radius": "0.75rem" // tab border-radius
        },
        alcpayBright: {
          "primary": "#21bf58",
          "primary-content": "#000000",
          "secondary": "#b2ff51",
          "secondary-content": "#080a0a",
          "accent": "#fff838",
          "accent-content": "#080a0a",
          "neutral": "#e6e6e6",
          "neutral-content": "#080a0a",
          "base-100": "#ffffff",
          "base-200": "#e8e8e8",
          "base-300": "#bdbdbd",
          "base-content": "#080a0a",
          "info": "#59d2f7",
          "info-content": "#080a0a",
          "success": "#25d463",
          "success-content": "#080a0a",
          "warning": "#ffc21a",
          "warning-content": "#080a0a",
          "error": "#ff432e",
          "error-content": "#080a0a",
          "--rounded-box": "1.0rem", // border-radius for large boxes
          "--rounded-btn": "0.75rem", // border-radius for buttons
          "--rounded-tooltip": "2rem", // border-radius for tooltip
          "--animation-btn": "0.27s", // button click animation duration
          "--animation-input": "0.27s", // input animation duration (e.g., checkboxes, switch)
          "--btn-focus-scale": "0.95", // button scale transform on focus
          "--border-btn": "1px", // button border width
          "--tab-border": "1px", // tab border width
          "--tab-radius": "0.75rem" // tab border-radius
        },
        alcpayDark: {
          "primary": "#1b5e20", // Dark green for primary
          "primary-content": "#ffffff", // White for primary content
          "secondary": "#33691e", // Darker green for secondary
          "secondary-content": "#ffffff", // White for secondary content
          "accent": "#ffab00", // Amber for accent
          "accent-content": "#080a0a", // Dark content for accent
          "neutral": "#424242", // Dark grey for neutral
          "neutral-content": "#ffffff", // White for neutral content
          "base-100": "#303030", // Dark base color
          "base-200": "#424242", // Slightly lighter dark base
          "base-300": "#616161", // Even lighter dark base
          "base-content": "#ffffff", // White for base content
          "info": "#0288d1", // Dark blue for info
          "info-content": "#ffffff", // White for info content
          "success": "#388e3c", // Dark green for success
          "success-content": "#ffffff", // White for success content
          "warning": "#f57c00", // Dark orange for warning
          "warning-content": "#ffffff", // White for warning content
          "error": "#d32f2f", // Dark red for error
          "error-content": "#ffffff", // White for error content
          "--rounded-box": "1.0rem", // border-radius for large boxes
          "--rounded-btn": "0.75rem", // border-radius for buttons
          "--rounded-tooltip": "2rem", // border-radius for tooltip
          "--animation-btn": "0.27s", // button click animation duration
          "--animation-input": "0.27s", // input animation duration (e.g., checkboxes, switch)
          "--btn-focus-scale": "0.95", // button scale transform on focus
          "--border-btn": "1px", // button border width
          "--tab-border": "1px", // tab border width
          "--tab-radius": "0.75rem" // tab border-radius
        }
      }
    ]
  },
  plugins: [
    require('flyonui'),
    require('flyonui/plugin'),
    addDynamicIconSelectors()
  ],
  darkMode: ['class', '[data-theme="alcpayDark"]']
} satisfies Config;