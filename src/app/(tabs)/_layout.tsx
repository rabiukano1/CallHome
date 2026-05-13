import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { History, User, Grid, Settings as SettingsIcon, Home } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';

import { useAppTheme } from '@/context/ThemeContext';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { isDarkMode, theme } = useAppTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.softBlueBackground }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: theme.whiteCard,
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            borderTopWidth: 0,
            height: 80 + insets.bottom,
            elevation: 20,
            shadowColor: theme.shadowColor,
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.1,
            shadowRadius: 15,
            paddingBottom: insets.bottom + 8,
            paddingTop: 12,
          },
          tabBarShowLabel: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabItem}>
                <View style={[styles.iconPill, focused && styles.activePill]}>
                  <Home color={focused ? theme.primaryNavy : theme.grayText} size={24} />
                </View>
                <Text style={[styles.tabLabel, focused && styles.activeLabel]} numberOfLines={1} adjustsFontSizeToFit>Home</Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="contacts"
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabItem}>
                <View style={[styles.iconPill, focused && styles.activePill]}>
                  <User color={focused ? theme.primaryNavy : theme.grayText} size={24} />
                </View>
                <Text style={[styles.tabLabel, focused && styles.activeLabel]} numberOfLines={1} adjustsFontSizeToFit>Contacts</Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="keypad"
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabItem}>
                <View style={[styles.iconPill, focused && styles.activePill]}>
                  <Grid color={focused ? theme.primaryNavy : theme.grayText} size={24} />
                </View>
                <Text style={[styles.tabLabel, focused && styles.activeLabel]} numberOfLines={1} adjustsFontSizeToFit>Keypad</Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabItem}>
                <View style={[styles.iconPill, focused && styles.activePill]}>
                  <SettingsIcon color={focused ? theme.primaryNavy : theme.grayText} size={24} />
                </View>
                <Text style={[styles.tabLabel, focused && styles.activeLabel]} numberOfLines={1} adjustsFontSizeToFit>Settings</Text>
              </View>
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 8,
  },
  iconPill: {
    width: 52,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  activePill: {
    backgroundColor: Colors.activePillBg,
  },
  tabLabel: {
    fontSize: 10,
    color: Colors.grayText,
    fontWeight: '800',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  activeLabel: {
    color: Colors.primaryNavy,
  },
});
