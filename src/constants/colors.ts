// ─── callhome Color Palette ────────────────────────────────────────────────
// All UI colors are exported from here. Import from this file everywhere.

export const Colors = {
  /** Deep navy used for headers, buttons, card text */
  primaryNavy: '#0B2A5B',

  /** Soft blue-grey used as the app background */
  softBlueBackground: '#EAF1F7',

  /** Pure white card surfaces */
  whiteCard: '#FFFFFF',

  /** Mint/teal accent: active tab pill, status dot, incoming calls */
  activeMint: '#76E4DF',

  /** Primary dark text color */
  darkText: '#0B1B35',

  /** Subdued grey for secondary text, placeholders */
  grayText: '#7A7F8A',

  /** Missed call indicator */
  missedCallRed: '#E53935',

  /** Incoming call indicator */
  incomingGreen: '#00796B',

  /** Subtle borders and dividers */
  lightBorder: '#DCE3EA',

  // ── Derived / Utility ────────────────────────────────────────────────────
  /** Transparent white overlay for glassmorphism effects */
  glassWhite: 'rgba(255,255,255,0.15)',

  /** Connection card gradient start (deep navy) */
  cardGradientStart: '#0B2A5B',

  /** Connection card gradient end (slightly lighter navy) */
  cardGradientEnd: '#0D3570',

  /** FAB gradient: teal → gold */
  fabGradientTeal: '#76E4DF',
  fabGradientGold: '#EAB308',

  /** Active tab pill background (translucent mint) */
  activePillBg: 'rgba(118,228,223,0.25)',

  /** Search bar background */
  searchBg: '#F0F4F8',

  /** Icon placeholder background (Home Hub) */
  placeholderAvatarBg: '#76E4DF',

  /** Outgoing arrow color (neutral grey) */
  outgoingGray: '#7A7F8A',

  /** White text used on dark/colored surfaces */
  white: '#FFFFFF',

  /** Black with opacity for shadows */
  shadowColor: '#000000',
} as const;

export const DarkColors = {
  primaryNavy: '#0B2A5B',
  softBlueBackground: '#050B18', // Deep space black
  whiteCard: '#111D35', // Dark navy card
  activeMint: '#76E4DF',
  darkText: '#FFFFFF', // White text in dark mode
  grayText: '#A1A7B5', // Lighter grey for dark mode
  missedCallRed: '#FF5252',
  incomingGreen: '#26A69A',
  lightBorder: '#1F2D4A',
  glassWhite: 'rgba(255,255,255,0.05)',
  cardGradientStart: '#0B2A5B',
  cardGradientEnd: '#1E3A8A',
  fabGradientTeal: '#76E4DF',
  fabGradientGold: '#EAB308',
  activePillBg: 'rgba(118,228,223,0.15)',
  searchBg: '#1A2A48',
  placeholderAvatarBg: '#76E4DF',
  outgoingGray: '#A1A7B5',
  white: '#FFFFFF',
  shadowColor: '#000000',
} as const;

export type ColorKey = keyof typeof Colors;
