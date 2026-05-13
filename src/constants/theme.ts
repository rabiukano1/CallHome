import '@/global.css';
import { Platform } from 'react-native';
import { Colors as AppColors } from './colors';

export const Colors = {
  light: {
    text: AppColors.darkText,
    background: AppColors.softBlueBackground,
    backgroundElement: AppColors.whiteCard,
    backgroundSelected: AppColors.lightBorder,
    textSecondary: AppColors.grayText,
    tint: AppColors.primaryNavy,
  },
  dark: {
    // Basic dark mode fallbacks using primary palette
    text: AppColors.white,
    background: AppColors.primaryNavy,
    backgroundElement: 'rgba(255,255,255,0.1)',
    backgroundSelected: 'rgba(255,255,255,0.2)',
    textSecondary: 'rgba(255,255,255,0.6)',
    tint: AppColors.activeMint,
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
