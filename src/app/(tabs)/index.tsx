import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings as SettingsIcon, Search, Router as RouterIcon, Phone, Video, Home, Grid, ArrowDownLeft, ArrowUpRight, Sparkles } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAppTheme } from '@/context/ThemeContext';

const RECENT_CALLS = [
  {
    id: '1',
    name: 'Dad',
    type: 'missed',
    time: '2:15 PM',
    avatar: 'https://i.pravatar.cc/150?img=11',
  },
  {
    id: '2',
    name: 'Sarah Miller',
    type: 'outgoing',
    time: '11:30 AM',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: '3',
    name: 'Home Hub',
    type: 'incoming',
    time: 'Yesterday',
    avatar: null,
  },
];

export default function RecentsScreen() {
  const router = useRouter();
  const { theme, isDarkMode } = useAppTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const styles = getStyles(theme);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity 
              onPress={() => router.push('/(tabs)/settings')}
              activeOpacity={0.8}
            >
              <View style={styles.profileWrapper}>
                <Image source={{ uri: 'https://i.pravatar.cc/150?img=32' }} style={styles.avatar} />
                <View style={styles.onlineStatus} />
              </View>
            </TouchableOpacity>
            <View>
              <Text style={styles.greetingText}>Hello, Jane</Text>
              <Text style={styles.headerTitle}>callhome</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.settingsIconBtn}
            onPress={() => router.push('/(tabs)/settings')}
          >
            <SettingsIcon color={theme.primaryNavy} size={22} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search color={theme.grayText} size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search contacts"
            placeholderTextColor={theme.grayText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Connection Card */}
        <LinearGradient
          colors={[theme.cardGradientStart, theme.cardGradientEnd]}
          style={styles.connectionCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardEyebrow}>HOME CONNECTION</Text>
            <RouterIcon color="rgba(255,255,255,0.6)" size={28} />
          </View>
          <Text style={styles.cardTitle}>Smart Gateway Active</Text>
          <View style={styles.cardStatusPill}>
            <View style={styles.statusDot} />
            <Text style={styles.cardStatusText}>High Quality Link Available</Text>
          </View>
        </LinearGradient>

        {/* Recents Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recents</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/contacts')}>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>

        {/* Call List */}
        <View style={styles.callList}>
          {RECENT_CALLS.map((call) => (
            <View key={call.id} style={styles.callItem}>
              <View style={styles.callItemLeft}>
                <View style={styles.avatarWrapper}>
                  {call.avatar ? (
                    <Image source={{ uri: call.avatar }} style={styles.callAvatar} />
                  ) : (
                    <View style={[styles.callAvatar, styles.placeholderAvatar]}>
                      <Home color={theme.primaryNavy} size={24} />
                    </View>
                  )}
                  <View style={[styles.typeIndicator, { backgroundColor: call.type === 'missed' ? theme.missedCallRed : theme.incomingGreen }]}>
                    {call.type === 'missed' ? (
                      <ArrowDownLeft color={theme.white} size={10} />
                    ) : (
                      <ArrowUpRight color={theme.white} size={10} />
                    )}
                  </View>
                </View>
                <View style={styles.callInfo}>
                  <Text style={styles.callName}>{call.name}</Text>
                  <Text style={styles.callType}>{call.type} • {call.time}</Text>
                </View>
              </View>
              <View style={styles.callActions}>
                <TouchableOpacity style={styles.actionBtn}>
                  <Phone color={theme.primaryNavy} size={20} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                  <Video color={theme.primaryNavy} size={20} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        
        {/* Bottom Spacer */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Action Button - Smart Call */}
      <TouchableOpacity 
        style={styles.fab}
        activeOpacity={0.9}
        onPress={() => router.push('/(tabs)/keypad')}
      >
        <LinearGradient
          colors={['#0B2A5B', '#10B981']}
          style={styles.fabGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.smartBadge}>
            <Sparkles color="#10B981" size={14} />
            <Text style={styles.smartBadgeText}>SMART</Text>
          </View>
          <View style={styles.fabContent}>
            <Phone color="#FFFFFF" size={24} />
            <Text style={styles.fabText}>Smart Call</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.softBlueBackground,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  profileWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: theme.white,
  },
  onlineStatus: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.activeMint,
    borderWidth: 2,
    borderColor: theme.whiteCard,
  },
  greetingText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.grayText,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: -2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.primaryNavy,
    letterSpacing: -0.5,
  },
  settingsIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.whiteCard,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.whiteCard,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 54,
    marginBottom: 25,
    shadowColor: theme.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: theme.darkText,
    fontWeight: '500',
  },
  connectionCard: {
    borderRadius: 28,
    padding: 24,
    marginBottom: 30,
    shadowColor: theme.primaryNavy,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardEyebrow: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
  },
  cardTitle: {
    color: theme.white,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  cardStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.activeMint,
  },
  cardStatusText: {
    color: theme.white,
    fontSize: 12,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.primaryNavy,
  },
  viewAllText: {
    color: theme.primaryNavy,
    fontWeight: '700',
    fontSize: 14,
  },
  callList: {
    gap: 16,
  },
  callItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.whiteCard,
    padding: 16,
    borderRadius: 20,
    shadowColor: theme.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  callItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarWrapper: {
    position: 'relative',
  },
  callAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  placeholderAvatar: {
    backgroundColor: theme.softBlueBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeIndicator: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.whiteCard,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callInfo: {
    gap: 4,
  },
  callName: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.darkText,
  },
  callType: {
    fontSize: 13,
    color: theme.grayText,
    textTransform: 'capitalize',
  },
  callActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.softBlueBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 110,
    right: 20,
    borderRadius: 33,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 12,
  },
  fabGradient: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 33,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 140,
  },
  smartBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    gap: 4,
    marginBottom: 4,
  },
  smartBadgeText: {
    color: '#10B981',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1,
  },
  fabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fabText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
