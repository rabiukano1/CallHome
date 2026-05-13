import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Colors, DarkColors } from '@/constants/colors';

type Theme = typeof Colors;

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    setIsDarkMode(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const theme = isDarkMode ? DarkColors : Colors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
}
