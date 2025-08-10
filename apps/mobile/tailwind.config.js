/** @type {import('tailwindcss').Config} */
import presst from 'nativewind/preset';
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Create custom colors that use CSS custom values
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        neutral: 'rgb(var(--color-neutral) / <alpha-value>)',
        background: 'rgb(var(--color-background) / <alpha-value>)'
      },
      fontSize: {
        // Headers: 24px-32px, Bold
        'header-sm': ['24px', { lineHeight: '32px', fontWeight: '700' }],
        'header-md': ['28px', { lineHeight: '36px', fontWeight: '700' }],
        'header-lg': ['34px', { lineHeight: '40px', fontWeight: '700' }],
        'header-xl': ['40px', { lineHeight: '48px', fontWeight: '700' }],

        // Subheaders: 18px-20px, Semibold
        'subheader-sm': ['18px', { lineHeight: '24px', fontWeight: '600' }],
        'subheader-lg': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'subheader-thin': ['18px', { lineHeight: '24px', fontWeight: '400' }],

        // Body Text: 14px-16px, Regular
        'body-sm': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'body-lg': ['16px', { lineHeight: '24px', fontWeight: '400' }],

        // Captions: 12px-14px, Medium
        'caption-sm': ['12px', { lineHeight: '16px', fontWeight: '500' }],
        'caption-lg': ['14px', { lineHeight: '20px', fontWeight: '500' }]
      }
    }
  },
  plugins: [
    // Set default values on the `:root` element
    ({ addBase }) =>
      addBase({
        ':root': {
          '--color-primary': '37 99 235', // #2563EB
          '--color-secondary': '16 185 129', // #10B981
          '--color-accent': '245 158 11', // #F59E0B
          '--color-neutral': '107 114 128', // #6B7280
          '--color-background': '250 251 252' // #FAFBFC
        }
      })
  ],
  presets: [presst]
};
