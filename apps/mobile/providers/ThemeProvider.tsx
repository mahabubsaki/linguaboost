import React, { createContext, useContext, useState, ReactNode } from 'react';
import { View } from 'react-native';
import { useColorScheme } from 'nativewind';
import { ThemeName, ColorScheme, themes } from '../constants/theme';

interface ThemeContextType {
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
  colorScheme: ColorScheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeName;
}

export function ThemeProvider({ children, defaultTheme = 'linguaboost' }: ThemeProviderProps) {
  const [themeName, setThemeName] = useState<ThemeName>(defaultTheme);
  const { colorScheme } = useColorScheme();

  const currentColorScheme: ColorScheme = colorScheme || 'light';

  return (
    <ThemeContext.Provider
      value={{
        themeName,
        setThemeName,
        colorScheme: currentColorScheme
      }}
    >
      <View style={themes[themeName][currentColorScheme]} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
