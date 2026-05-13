import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Phone, Delete, UserPlus, X, ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAppTheme } from '@/context/ThemeContext';

const KEYPAD_NUMBERS = [
  { val: '1', letters: '' }, { val: '2', letters: 'ABC' }, { val: '3', letters: 'DEF' },
  { val: '4', letters: 'GHI' }, { val: '5', letters: 'JKL' }, { val: '6', letters: 'MNO' },
  { val: '7', letters: 'PQRS' }, { val: '8', letters: 'TUV' }, { val: '9', letters: 'WXYZ' },
  { val: '*', letters: '' }, { val: '0', letters: '+' }, { val: '#' },
];

export default function KeypadScreen() {
  const router = useRouter();
  const { theme, isDarkMode } = useAppTheme();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contactName, setContactName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const styles = getStyles(theme, isDarkMode);

  const handlePress = (val: string) => {
    setPhoneNumber(prev => prev + val);
    setShowSuccess(false);
  };

  const handleDelete = () => {
    setPhoneNumber(prev => prev.slice(0, -1));
    setShowSuccess(false);
  };

  const handleSaveContact = () => {
    if (contactName.trim()) {
      console.log(`Saved ${contactName} with number ${phoneNumber}`);
      setShowSuccess(true);
      setIsModalVisible(false);
      setContactName('');
      setPhoneNumber('');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft color={theme.primaryNavy} size={28} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Keypad</Text>
          <View style={{ width: 44 }} />
        </View>

        <View style={styles.displayArea}>
          {showSuccess ? (
            <View style={styles.successContainer}>
              <UserPlus color={theme.incomingGreen} size={48} />
              <Text style={styles.successText}>Contact Saved!</Text>
              <TouchableOpacity onPress={() => setShowSuccess(false)}>
                <Text style={styles.dismissText}>Dismiss</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text style={styles.phoneText} numberOfLines={1} adjustsFontSizeToFit>
                {phoneNumber || ' '}
              </Text>
              {phoneNumber.length > 0 && (
                <TouchableOpacity 
                  style={styles.addContactBtn}
                  onPress={() => setIsModalVisible(true)}
                >
                  <UserPlus color={theme.incomingGreen} size={20} />
                  <Text style={styles.addContactText}>Add to Contacts</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>

        <View style={styles.keypadContainer}>
          {KEYPAD_NUMBERS.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.key}
              activeOpacity={0.7}
              onPress={() => handlePress(item.val)}
            >
              <View style={styles.keyInner}>
                <Text style={styles.keyText}>{item.val}</Text>
                {item.letters ? <Text style={styles.keySubtext}>{item.letters}</Text> : null}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ flex: 1, minHeight: 20 }} />

        <View style={styles.footer}>
          <View style={{ width: 60 }} />
          <TouchableOpacity
            style={[styles.callButton, !phoneNumber && { opacity: 0.5 }]}
            onPress={() => {
              if (phoneNumber) {
                router.push({ pathname: '/calling', params: { number: phoneNumber, name: phoneNumber, mode: 'phone' } });
              }
            }}
            disabled={!phoneNumber}
          >
            <Phone color={theme.white} size={28} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            {phoneNumber.length > 0 && <Delete color={theme.grayText} size={28} />}
          </TouchableOpacity>
        </View>
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
                placeholder="Name"
                placeholderTextColor={theme.grayText}
                autoFocus={true}
                value={contactName}
                onChangeText={setContactName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: theme.primaryNavy }]}>Phone Number</Text>
              <TextInput
                style={[styles.modalInput, { backgroundColor: isDarkMode ? theme.softBlueBackground : theme.searchBg, color: theme.darkText, borderColor: theme.lightBorder }]}
                placeholder="Phone Number"
                placeholderTextColor={theme.grayText}
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>

            <TouchableOpacity 
              style={[
                styles.saveButton,
                { backgroundColor: theme.primaryNavy },
                !contactName.trim() && styles.saveButtonDisabled
              ]}
              onPress={handleSaveContact}
              disabled={!contactName.trim()}
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
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 200,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
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
    fontSize: 20,
    fontWeight: '800',
    color: theme.primaryNavy,
  },
  displayArea: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    minHeight: 80,
  },
  phoneText: {
    fontSize: 42,
    fontWeight: '200',
    color: theme.primaryNavy,
    textAlign: 'center',
    letterSpacing: -1,
  },
  addContactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDarkMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 12,
    gap: 8,
  },
  addContactText: {
    color: theme.incomingGreen,
    fontSize: 16,
    fontWeight: '600',
  },
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.primaryNavy,
    marginTop: 12,
  },
  dismissText: {
    fontSize: 16,
    color: theme.grayText,
    marginTop: 8,
    textDecorationLine: 'underline',
  },
  keypadContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  key: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: theme.whiteCard,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)',
  },
  keyInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    fontSize: 28,
    fontWeight: '300',
    color: theme.primaryNavy,
    lineHeight: 32,
  },
  keySubtext: {
    fontSize: 8,
    fontWeight: '800',
    color: theme.grayText,
    letterSpacing: 1.5,
    marginTop: -1,
    textTransform: 'uppercase',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
    marginBottom: 15,
    marginTop: 5,
  },
  callButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.incomingGreen,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.incomingGreen,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  deleteButton: {
    width: 60,
    height: 60,
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
