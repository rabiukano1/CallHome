import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Phone, Video, UserPlus, Search, X, ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAppTheme } from '@/context/ThemeContext';

const INITIAL_CONTACTS = [
  { id: '1', name: 'Alice Johnson', phone: '+1 234 567 890', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'Bob Smith', phone: '+1 987 654 321', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'Charlie Brown', phone: '+1 555 123 456', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', name: 'Dad', phone: '+1 555 999 888', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: '5', name: 'Emma Watson', phone: '+1 555 444 333', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: '6', name: 'Frank Miller', phone: '+1 555 222 111', avatar: 'https://i.pravatar.cc/150?img=6' },
  { id: '7', name: 'Home Hub', phone: 'internal-hub-1', avatar: null },
];

export default function ContactsScreen() {
  const router = useRouter();
  const { theme, isDarkMode } = useAppTheme();
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '' });

  const styles = getStyles(theme, isDarkMode);

  const filteredContacts = contacts
    .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.phone.includes(searchQuery))
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      const contact = {
        id: Date.now().toString(),
        ...newContact,
        avatar: null,
      };
      setContacts([...contacts, contact]);
      setNewContact({ name: '', phone: '' });
      setIsModalVisible(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft color={theme.primaryNavy} size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contacts</Text>
        <TouchableOpacity 
          style={styles.addContactBtn}
          onPress={() => setIsModalVisible(true)}
        >
          <UserPlus color={theme.primaryNavy} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
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

        <Text style={styles.sectionHeader}>All Contacts ({filteredContacts.length})</Text>

        <View style={styles.contactList}>
          {filteredContacts.map((contact) => (
            <View key={contact.id} style={styles.contactCard}>
              <View style={styles.contactLeft}>
                {contact.avatar ? (
                  <Image source={{ uri: contact.avatar }} style={styles.avatar} />
                ) : (
                  <View style={[styles.avatar, styles.placeholderAvatar]}>
                    <Text style={styles.placeholderAvatarText}>{contact.name.charAt(0).toUpperCase()}</Text>
                  </View>
                )}
                <View>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  <Text style={styles.contactPhone}>{contact.phone}</Text>
                </View>
              </View>
              
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => router.push({ pathname: '/calling', params: { name: contact.name, number: contact.phone, mode: 'voice' } })}
                >
                  <Phone color={theme.primaryNavy} size={20} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => router.push({ pathname: '/calling', params: { name: contact.name, number: contact.phone, mode: 'video' } })}
                >
                  <Video color={theme.primaryNavy} size={20} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Add Contact Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: isDarkMode ? 'rgba(0,0,0,0.7)' : 'rgba(11, 42, 91, 0.4)' }]}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.modalContent, { backgroundColor: theme.whiteCard }]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.primaryNavy }]}>New Contact</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <X color={theme.primaryNavy} size={24} />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: theme.primaryNavy }]}>Full Name</Text>
              <TextInput
                style={[styles.modalInput, { backgroundColor: isDarkMode ? theme.softBlueBackground : theme.searchBg, color: theme.darkText, borderColor: theme.lightBorder }]}
                placeholder="John Doe"
                placeholderTextColor={theme.grayText}
                value={newContact.name}
                onChangeText={(text) => setNewContact({ ...newContact, name: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: theme.primaryNavy }]}>Phone Number</Text>
              <TextInput
                style={[styles.modalInput, { backgroundColor: isDarkMode ? theme.softBlueBackground : theme.searchBg, color: theme.darkText, borderColor: theme.lightBorder }]}
                placeholder="+1 234 567 890"
                placeholderTextColor={theme.grayText}
                keyboardType="phone-pad"
                value={newContact.phone}
                onChangeText={(text) => setNewContact({ ...newContact, phone: text })}
              />
            </View>

            <TouchableOpacity 
              style={[
                styles.saveButton,
                { backgroundColor: theme.primaryNavy },
                (!newContact.name || !newContact.phone) && styles.saveButtonDisabled
              ]}
              onPress={handleAddContact}
              disabled={!newContact.name || !newContact.phone}
            >
              <Text style={[styles.saveButtonText, { color: theme.white }]}>Create Contact</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const getStyles = (theme: any, isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.softBlueBackground,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.whiteCard,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.primaryNavy,
  },
  addContactBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.whiteCard,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.whiteCard,
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 54,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: theme.lightBorder,
    shadowColor: theme.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: theme.darkText,
    fontWeight: '500',
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '800',
    color: theme.grayText,
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginLeft: 4,
  },
  contactList: {
    gap: 12,
  },
  contactCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.whiteCard,
    padding: 16,
    borderRadius: 24,
    shadowColor: theme.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: theme.lightBorder,
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 16,
  },
  placeholderAvatar: {
    backgroundColor: isDarkMode ? theme.lightBorder : theme.softBlueBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderAvatarText: {
    color: theme.primaryNavy,
    fontSize: 22,
    fontWeight: 'bold',
  },
  contactName: {
    fontSize: 17,
    fontWeight: '700',
    color: theme.darkText,
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 14,
    color: theme.grayText,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.softBlueBackground,
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingBottom: 40,
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
    fontSize: 20,
    fontWeight: '800',
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    marginLeft: 4,
  },
  modalInput: {
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 54,
    fontSize: 16,
    borderWidth: 1,
  },
  saveButton: {
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonDisabled: {
    backgroundColor: theme.grayText,
    opacity: 0.5,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
