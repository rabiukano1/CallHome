import { ThemeProvider as NavProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import React from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider, useAppTheme } from '@/context/ThemeContext';

function RootLayoutContent() {
  const { isDarkMode } = useAppTheme();

  return (
    <NavProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </NavProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  );
}
