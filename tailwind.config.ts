import type { Config } from 'tailwindcss';
import { addDynamicIconSelectors } from '@iconify/tailwind';

/**
 * MyComponentName
 *
 * My component does this and that. For this user it does these things.
 * Other users can not access this component.
 *
 * import: @alcpay/tailwind
 * path: themes/switcher.component.ts
 */

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{html,ts,md,analog,ag}',
    './node_modules/flyonui/dist/js/*.js',
  ],
  theme: {
    extend: {
      // Define font size for sidebar navigation links
      fontSize: {
        'sidebar-nav-link': 'var(--sidebar-nav-link-font-size)',
      },
      // Define font weight for sidebar navigation links
      fontWeight: {
        'sidebar-nav-link': 'var(--sidebar-nav-link-font-weight)',
      },
      // Define color variables for the sidebar and brand
      colors: {
        'sidebar-bg': 'var(--sidebar-bg)',
        'sidebar-content': 'var(--sidebar-content)',
        'sidebar-nav-link-bg': 'var(--sidebar-nav-link-bg)',
        'sidebar-nav-link-bg-hover': 'var(--sidebar-nav-link-bg-hover)',
        'sidebar-nav-link-bg-active': 'var(--sidebar-nav-link-bg-active)',
        'sidebar-nav-link-content': 'var(--sidebar-nav-link-content)',
        'sidebar-nav-link-content-hover':
          'var(--sidebar-nav-link-content-hover)',
        'sidebar-nav-link-content-active':
          'var(--sidebar-nav-link-content-active)',
        'alcpay-brand-primary': 'var(--alcpay-brand-primary)',
        'alcpay-brand-secondary': 'var(--alcpay-brand-secondary)',
        'alcpay-gray': '#E4E1DD',
      },
      // Define FlyonUI themes
      flyonui: {
        themes: [
          {
            alcpayLight: {
              primary: '#5ac54f',
              'primary-content': '#ffffff',
              secondary: '#134c4c',
              'secondary-content': '#ffffff',
              accent: '#0c2e44',
              'accent-content': '#ffffff',
              info: '#00ade4',
              'info-content': '#ffffff',
              success: '#25d463',
              'success-content': '#ffffff',
              warning: '#ffc21a',
              'warning-content': '#000000',
              error: '#ff432e',
              'error-content': '#ffffff',
              neutral: '#eeeeee',
              'neutral-content': '#010101',
              'base-100': '#ffffff',
              'base-200': '#e6e7e9',
              'base-300': '#b4b3b2',
              'base-content': '#010101',
              '--rounded-box': '0.50rem', // border-radius for large boxes
              '--rounded-btn': '0.75rem', // border-radius for buttons
              '--rounded-tooltip': '0.50rem', // border-radius for tooltip
              '--animation-btn': '0.27s', // button click animation duration
              '--animation-input': '0.27s', // input animation duration (e.g., checkboxes, switch)
              '--btn-focus-scale': '0.95', // button scale transform on focus
              '--border-btn': '0px', // button border width
              '--tab-border': '1px', // tab border width
              '--tab-radius': '0.50rem', // tab border-radius
            },
          },
        ],
      },
    },
  },
  plugins: [
    require('flyonui'),
    require('flyonui/plugin'),
    addDynamicIconSelectors(),
  ],
  darkMode: ['class', '[data-theme="alcpayDark"]'],
};

export default config satisfies Config;
