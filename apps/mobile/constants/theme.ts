import { vars } from 'nativewind';

// Theme definitions
export const themes = {
  linguaboost: {
    light: vars({
      '--color-primary': '37 99 235', // #2563EB - Primary Blue
      '--color-secondary': '16 185 129', // #10B981 - Secondary Green
      '--color-accent': '245 158 11', // #F59E0B - Accent Orange
      '--color-neutral': '107 114 128', // #6B7280 - Neutral Gray
      '--color-background': '250 251 252' // #FAFBFC - Background
    }),
    dark: vars({
      '--color-primary': '147 197 253', // Lighter blue for dark mode
      '--color-secondary': '52 211 153', // Lighter green for dark mode
      '--color-accent': '251 191 36', // Lighter orange for dark mode
      '--color-neutral': '156 163 175', // Lighter gray for dark mode
      '--color-background': '17 24 39' // Dark background
    })
  },
  christmas: {
    light: vars({
      '--color-primary': '239 68 68', // Red
      '--color-secondary': '34 197 94', // Green
      '--color-accent': '245 158 11', // Gold
      '--color-neutral': '107 114 128', // Neutral Gray
      '--color-background': '254 242 242' // Light red background
    }),
    dark: vars({
      '--color-primary': '248 113 113', // Lighter red
      '--color-secondary': '74 222 128', // Lighter green
      '--color-accent': '251 191 36', // Gold
      '--color-neutral': '156 163 175', // Light gray
      '--color-background': '127 29 29' // Dark red background
    })
  },
  ocean: {
    light: vars({
      '--color-primary': '14 165 233', // Sky blue
      '--color-secondary': '6 182 212', // Cyan
      '--color-accent': '168 85 247', // Purple
      '--color-neutral': '107 114 128', // Neutral Gray
      '--color-background': '240 249 255' // Light blue background
    }),
    dark: vars({
      '--color-primary': '56 189 248', // Lighter sky blue
      '--color-secondary': '34 211 238', // Lighter cyan
      '--color-accent': '196 181 253', // Lighter purple
      '--color-neutral': '156 163 175', // Light gray
      '--color-background': '12 74 110' // Dark blue background,
    })
  }
};

export type ThemeName = keyof typeof themes;
export type ColorScheme = 'light' | 'dark';
