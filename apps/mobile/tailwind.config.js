/** @type {import('tailwindcss').Config} */
import preset from 'nativewind/preset';
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [preset],
  theme: {
    extend: {}
  },
  plugins: []
};
