import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Image, TextInput, Dimensions, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  ChevronLeft, User, Bell, Shield, CircleHelp, LogOut, Moon, Globe, 
  Search, ShieldCheck, Database, HardDrive, Smartphone, ChevronRight,
  Sparkles, X, Camera, MessageSquare, Fingerprint, Eye, Lock, Mail, PhoneCall
} from 'lucide-react-native';
import { useAppTheme } from '@/context/ThemeContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode, theme } = useAppTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const styles = getStyles(theme, isDarkMode);

  const [profile, setProfile] = useState({
    name: 'Jane Cooper',
    username: 'janecooper88',
    email: 'jane.cooper@home.com',
    avatar: 'https://i.pravatar.cc/150?img=32'
  });
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...profile });

  const handleSaveProfile = () => {
    setProfile({ ...tempProfile });
    setIsEditModalVisible(false);
  };

  const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);
  const [privacySettings, setPrivacySettings] = useState({
    twoFactor: false,
    publicProfile: true,
    readReceipts: true,
    biometricLock: false,
  });

  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);

  const handleTogglePrivacy = (key: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const SettingItem = ({ icon: Icon, label, sublabel, value, type = 'chevron', onPress, color = theme.primaryNavy }: any) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress}
      disabled={type === 'switch'}
    >
      <View style={styles.settingLeft}>
        <View style={[styles.iconContainer, { backgroundColor: isDarkMode ? `${color}30` : `${color}15` }]}>
          <Icon color={color} size={20} />
        </View>
        <View style={styles.settingTextContent}>
          <Text style={styles.settingLabel}>{label}</Text>
          {sublabel && <Text style={styles.settingSublabel}>{sublabel}</Text>}
        </View>
      </View>
      {type === 'chevron' && <ChevronRight size={20} color={theme.grayText} />}
      {type === 'switch' && (
        <Switch 
          value={value} 
          onValueChange={onPress}
          trackColor={{ false: theme.lightBorder, true: theme.activeMint }}
          thumbColor={theme.white}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.cardGradientStart, theme.cardGradientEnd]}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView edges={['top']}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <ChevronLeft color="#FFFFFF" size={28} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Settings</Text>
            <TouchableOpacity style={styles.premiumIcon}>
              <Sparkles color={theme.activeMint} size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.searchBar}>
            <Search color="rgba(255,255,255,0.6)" size={18} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search settings..."
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileMain}>
            <View style={styles.profileImageWrapper}>
              <Image source={{ uri: profile.avatar }} style={styles.profileImage} />
              <View style={styles.activeIndicator} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{profile.name}</Text>
              <Text style={styles.profileUsername}>@{profile.username}</Text>
              <Text style={styles.profileEmail}>{profile.email}</Text>
            </View>
            <TouchableOpacity 
              style={styles.manageButton}
              onPress={() => {
                setTempProfile({ ...profile });
                setIsEditModalVisible(true);
              }}
            >
              <Text style={styles.manageButtonText}>Manage</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Account Section */}
        <Text style={styles.sectionTitle}>Account & Security</Text>
        <View style={styles.sectionCard}>
          <SettingItem 
            icon={User} 
            label="Personal Details" 
            sublabel="Name, Email, Username"
            color="#3B82F6"
            onPress={() => {
              setTempProfile({ ...profile });
              setIsEditModalVisible(true);
            }}
          />
          <SettingItem 
            icon={ShieldCheck} 
            label="Privacy" 
            sublabel="Security & visibility"
            color="#10B981"
            onPress={() => setIsPrivacyModalVisible(true)}
          />
          <SettingItem 
            icon={Smartphone} 
            label="Linked Devices" 
            sublabel="2 devices active"
            color="#8B5CF6"
          />
        </View>

        {/* App Preferences */}
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.sectionCard}>
          <SettingItem 
            icon={Bell} 
            label="Notifications" 
            type="switch" 
            value={notificationsEnabled} 
            onPress={() => setNotificationsEnabled(!notificationsEnabled)} 
            color="#F59E0B"
          />
          <SettingItem 
            icon={Moon} 
            label="Dark Mode" 
            sublabel={isDarkMode ? "Enabled" : "Disabled"}
            type="switch" 
            value={isDarkMode} 
            onPress={toggleDarkMode} 
            color="#6366F1"
          />
          <SettingItem 
            icon={Globe} 
            label="Language" 
            sublabel="English (US)"
            color="#EC4899"
          />
        </View>

        {/* System & Help */}
        <Text style={styles.sectionTitle}>System</Text>
        <View style={styles.sectionCard}>
          <SettingItem 
            icon={Database} 
            label="Data & Storage" 
            color="#06B6D4"
          />
          <SettingItem 
            icon={CircleHelp} 
            label="Help & Feedback" 
            color="#2563EB" 
            onPress={() => setIsHelpModalVisible(true)}
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => router.replace('/login')}
        >
          <LinearGradient
            colors={isDarkMode ? ['rgba(229, 57, 53, 0.2)', 'rgba(229, 57, 53, 0.1)'] : ['rgba(229, 57, 53, 0.1)', 'rgba(229, 57, 53, 0.05)']}
            style={styles.logoutGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <LogOut color={theme.missedCallRed} size={22} />
            <Text style={styles.logoutText}>Log Out Account</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.versionText}>callhome v1.0.0 • Build 1249</Text>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: isDarkMode ? 'rgba(0,0,0,0.8)' : 'rgba(11, 42, 91, 0.4)' }]}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.modalContent, { backgroundColor: theme.whiteCard }]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.primaryNavy }]}>Manage Profile</Text>
              <TouchableOpacity 
                style={styles.modalCloseBtn}
                onPress={() => setIsEditModalVisible(false)}
              >
                <X color={theme.primaryNavy} size={20} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.avatarEditContainer}>
                <View style={styles.avatarWrapperLarge}>
                  <Image source={{ uri: tempProfile.avatar }} style={styles.avatarLarge} />
                  <TouchableOpacity style={styles.cameraBtn}>
                    <Camera color={theme.white} size={20} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.avatarHint}>Change Profile Picture</Text>
              </View>

              <View style={styles.editSection}>
                <View style={styles.inputGroup}>
                  <Text style={[styles.inputLabel, { color: theme.grayText }]}>FULL NAME</Text>
                  <View style={[styles.inputWrapper, { borderColor: theme.lightBorder }]}>
                    <User color={theme.primaryNavy} size={18} style={styles.inputIcon} />
                    <TextInput
                      style={[styles.modalInput, { color: theme.darkText }]}
                      placeholder="Enter full name"
                      placeholderTextColor={theme.grayText}
                      value={tempProfile.name}
                      onChangeText={(text) => setTempProfile({ ...tempProfile, name: text })}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={[styles.inputLabel, { color: theme.grayText }]}>USERNAME</Text>
                  <View style={[styles.inputWrapper, { borderColor: theme.lightBorder }]}>
                    <Text style={styles.usernamePrefix}>@</Text>
                    <TextInput
                      style={[styles.modalInput, { color: theme.darkText }]}
                      placeholder="username"
                      placeholderTextColor={theme.grayText}
                      value={tempProfile.username}
                      onChangeText={(text) => setTempProfile({ ...tempProfile, username: text })}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={[styles.inputLabel, { color: theme.grayText }]}>EMAIL ADDRESS</Text>
                  <View style={[styles.inputWrapper, { borderColor: theme.lightBorder }]}>
                    <Globe color={theme.primaryNavy} size={18} style={styles.inputIcon} />
                    <TextInput
                      style={[styles.modalInput, { color: theme.darkText }]}
                      placeholder="email@example.com"
                      placeholderTextColor={theme.grayText}
                      keyboardType="email-address"
                      value={tempProfile.email}
                      onChangeText={(text) => setTempProfile({ ...tempProfile, email: text })}
                    />
                  </View>
                </View>
              </View>

              <TouchableOpacity 
                style={[styles.saveButton, { backgroundColor: theme.primaryNavy }]}
                onPress={handleSaveProfile}
              >
                <LinearGradient
                  colors={[theme.primaryNavy, '#10B981']}
                  style={styles.saveButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={[styles.saveButtonText, { color: theme.white }]}>Save Changes</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <View style={{ height: 20 }} />
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      {/* Privacy Modal */}
      <Modal
        visible={isPrivacyModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsPrivacyModalVisible(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: isDarkMode ? 'rgba(0,0,0,0.8)' : 'rgba(11, 42, 91, 0.4)' }]}>
          <View style={[styles.modalContent, { backgroundColor: theme.whiteCard, maxHeight: '85%' }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.primaryNavy }]}>Privacy & Security</Text>
              <TouchableOpacity 
                style={styles.modalCloseBtn}
                onPress={() => setIsPrivacyModalVisible(false)}
              >
                <X color={theme.primaryNavy} size={20} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.privacyHero}>
                <View style={[styles.privacyIconBg, { backgroundColor: `${theme.activeMint}15` }]}>
                  <ShieldCheck color={theme.activeMint} size={42} />
                </View>
                <Text style={styles.privacyHeroTitle}>Your Privacy Matters</Text>
                <Text style={styles.privacyHeroSub}>Control who can see your profile and how your data is secured.</Text>
              </View>

              <View style={styles.privacySection}>
                <Text style={styles.privacySectionTitle}>Security</Text>
                <View style={styles.privacyCard}>
                  <SettingItem 
                    icon={Lock} 
                    label="Two-Factor Auth" 
                    sublabel="Add extra layer of security"
                    type="switch"
                    value={privacySettings.twoFactor}
                    onPress={() => handleTogglePrivacy('twoFactor')}
                    color="#F59E0B"
                  />
                  <View style={styles.privacyDivider} />
                  <SettingItem 
                    icon={Fingerprint} 
                    label="Biometric Lock" 
                    sublabel="Unlock app with fingerprint"
                    type="switch"
                    value={privacySettings.biometricLock}
                    onPress={() => handleTogglePrivacy('biometricLock')}
                    color="#3B82F6"
                  />
                </View>

                <Text style={styles.privacySectionTitle}>Visibility</Text>
                <View style={styles.privacyCard}>
                  <SettingItem 
                    icon={Eye} 
                    label="Public Profile" 
                    sublabel="Visible to everyone"
                    type="switch"
                    value={privacySettings.publicProfile}
                    onPress={() => handleTogglePrivacy('publicProfile')}
                    color="#10B981"
                  />
                  <View style={styles.privacyDivider} />
                  <SettingItem 
                    icon={MessageSquare} 
                    label="Read Receipts" 
                    sublabel="Show when you've seen calls"
                    type="switch"
                    value={privacySettings.readReceipts}
                    onPress={() => handleTogglePrivacy('readReceipts')}
                    color="#8B5CF6"
                  />
                </View>
              </View>

              <TouchableOpacity 
                style={styles.saveButton}
                onPress={() => setIsPrivacyModalVisible(false)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[theme.primaryNavy, '#2563EB']}
                  style={styles.saveButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={[styles.saveButtonText, { color: '#FFFFFF' }]}>Done</Text>
                  <ShieldCheck color="#FFFFFF" size={20} style={{ marginLeft: 8 }} />
                </LinearGradient>
              </TouchableOpacity>
              
              <View style={{ height: 20 }} />
            </ScrollView>
          </View>
        </View>
      </Modal>
      {/* Help Modal */}
      <Modal
        visible={isHelpModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsHelpModalVisible(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: isDarkMode ? 'rgba(0,0,0,0.8)' : 'rgba(11, 42, 91, 0.4)' }]}>
          <View style={[styles.modalContent, { backgroundColor: theme.whiteCard, maxHeight: '90%' }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.primaryNavy }]}>Help & Support</Text>
              <TouchableOpacity 
                style={styles.modalCloseBtn}
                onPress={() => setIsHelpModalVisible(false)}
              >
                <X color={theme.primaryNavy} size={20} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.helpHero}>
                <View style={[styles.helpIconBg, { backgroundColor: `${theme.primaryNavy}15` }]}>
                  <MessageSquare color={theme.primaryNavy} size={42} />
                </View>
                <Text style={styles.helpHeroTitle}>How can we help?</Text>
                <Text style={styles.helpHeroSub}>Find answers or contact our dedicated support team 24/7.</Text>
              </View>

              <View style={styles.helpSection}>
                <Text style={styles.helpSectionTitle}>Popular Questions</Text>
                <View style={styles.faqList}>
                  <TouchableOpacity style={[styles.faqItem, { borderColor: theme.lightBorder }]}>
                    <Text style={[styles.faqQuestion, { color: theme.darkText }]}>How to update my profile?</Text>
                    <ChevronRight size={16} color={theme.grayText} />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.faqItem, { borderColor: theme.lightBorder }]}>
                    <Text style={[styles.faqQuestion, { color: theme.darkText }]}>Is my data secure?</Text>
                    <ChevronRight size={16} color={theme.grayText} />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.faqItem, { borderColor: theme.lightBorder }]}>
                    <Text style={[styles.faqQuestion, { color: theme.darkText }]}>How to change theme?</Text>
                    <ChevronRight size={16} color={theme.grayText} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.helpSectionTitle}>Contact Us</Text>
                <View style={styles.supportRow}>
                  <TouchableOpacity style={[styles.supportBtn, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(11, 42, 91, 0.03)', borderColor: theme.lightBorder }]}>
                    <Mail color={theme.primaryNavy} size={24} />
                    <Text style={[styles.supportBtnText, { color: theme.darkText }]}>Email</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.supportBtn, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(11, 42, 91, 0.03)', borderColor: theme.lightBorder }]}>
                    <MessageSquare color={theme.primaryNavy} size={24} />
                    <Text style={[styles.supportBtnText, { color: theme.darkText }]}>Live Chat</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.supportBtn, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(11, 42, 91, 0.03)', borderColor: theme.lightBorder }]}>
                    <PhoneCall color={theme.primaryNavy} size={24} />
                    <Text style={[styles.supportBtnText, { color: theme.darkText }]}>Call</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity 
                style={styles.saveButton}
                onPress={() => setIsHelpModalVisible(false)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[theme.primaryNavy, '#2563EB']}
                  style={styles.saveButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={[styles.saveButtonText, { color: '#FFFFFF' }]}>Close</Text>
                  <Sparkles color="#FFFFFF" size={20} style={{ marginLeft: 8 }} />
                </LinearGradient>
              </TouchableOpacity>
              
              <View style={{ height: 20 }} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function getStyles(theme: any, isDarkMode: boolean) {
  return StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.softBlueBackground,
  },
  headerGradient: {
    paddingBottom: 20,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  premiumIcon: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 18,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 120, // Ensures content is visible above the nav bar
  },
  profileCard: {
    backgroundColor: theme.whiteCard,
    borderRadius: 24,
    padding: 20,
    marginBottom: 30,
    shadowColor: theme.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  profileMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageWrapper: {
    position: 'relative',
    marginRight: 16,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: theme.softBlueBackground,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: theme.activeMint,
    borderWidth: 2,
    borderColor: theme.whiteCard,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.darkText,
  },
  profileUsername: {
    fontSize: 13,
    color: theme.primaryNavy,
    fontWeight: '700',
    marginTop: 1,
  },
  profileEmail: {
    fontSize: 12,
    color: theme.grayText,
    marginTop: 1,
  },
  manageButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: isDarkMode ? theme.lightBorder : theme.softBlueBackground,
    borderRadius: 10,
  },
  manageButtonText: {
    color: theme.primaryNavy,
    fontSize: 12,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: theme.grayText,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginLeft: 4,
  },
  sectionCard: {
    backgroundColor: theme.whiteCard,
    borderRadius: 24,
    paddingVertical: 8,
    marginBottom: 24,
    shadowColor: theme.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  settingTextContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.darkText,
  },
  settingSublabel: {
    fontSize: 12,
    color: theme.grayText,
    fontWeight: '500',
    marginTop: 1,
  },
  logoutButton: {
    marginTop: 8,
    marginBottom: 20,
    borderRadius: 18,
    overflow: 'hidden',
  },
  logoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    gap: 10,
  },
  logoutText: {
    color: theme.missedCallRed,
    fontSize: 16,
    fontWeight: '800',
  },
  versionText: {
    textAlign: 'center',
    color: theme.grayText,
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.5,
    marginBottom: 20,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
  },
  modalCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(11, 42, 91, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEditContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarWrapperLarge: {
    position: 'relative',
    marginBottom: 12,
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: theme.softBlueBackground,
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.primaryNavy,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: theme.whiteCard,
  },
  avatarHint: {
    fontSize: 14,
    color: theme.grayText,
    fontWeight: '600',
  },
  editSection: {
    gap: 20,
    marginBottom: 32,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(11, 42, 91, 0.03)',
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
    opacity: 0.6,
  },
  usernamePrefix: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.primaryNavy,
    marginRight: 8,
    opacity: 0.6,
  },
  modalInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    borderRadius: 18,
    overflow: 'hidden',
    height: 56,
    marginTop: 8,
  },
  saveButtonGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  // Privacy Modal Styles
  privacyHero: {
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 10,
  },
  privacyIconBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  privacyHeroTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.darkText,
    marginBottom: 8,
  },
  privacyHeroSub: {
    fontSize: 14,
    color: theme.grayText,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  privacySection: {
    marginBottom: 24,
  },
  privacySectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: theme.grayText,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginLeft: 4,
  },
  privacyCard: {
    backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(11, 42, 91, 0.03)',
    borderRadius: 24,
    paddingVertical: 8,
    marginBottom: 12,
  },
  privacyDivider: {
    height: 1,
    backgroundColor: theme.lightBorder,
    marginHorizontal: 16,
    opacity: 0.5,
  },
  // Help Modal Styles
  helpHero: {
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 10,
  },
  helpIconBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  helpHeroTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.darkText,
    marginBottom: 8,
  },
  helpHeroSub: {
    fontSize: 14,
    color: theme.grayText,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  helpSection: {
    marginBottom: 24,
  },
  helpSectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: theme.grayText,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginLeft: 4,
  },
  faqList: {
    marginBottom: 24,
    gap: 12,
  },
  faqItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(11, 42, 91, 0.03)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: '700',
  },
  supportRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  supportBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 16,
    borderWidth: 1,
    gap: 8,
  },
  supportBtnText: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    },
  });
}
