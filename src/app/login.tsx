import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Mail, Lock, User, Eye, EyeOff, Github, Globe, Apple, ChevronLeft, ArrowRight, Fingerprint 
} from 'lucide-react-native';
import { useAppTheme } from '@/context/ThemeContext';

const { width } = Dimensions.get('window');

const SocialButton = ({ icon: Icon, theme, styles, color = '#000' }: any) => (
  <TouchableOpacity style={[styles.socialBtn, { borderColor: theme.lightBorder, backgroundColor: theme.whiteCard }]}>
    {Icon ? <Icon color={color} size={24} /> : <View style={{ width: 24, height: 24, backgroundColor: 'red' }} />}
  </TouchableOpacity>
);

export default function AuthScreen() {
  const router = useRouter();
  const { theme, isDarkMode } = useAppTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  const styles = getStyles(theme, isDarkMode);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const handleAuth = () => {
    // In a real app, this would perform authentication
    console.log(`Authenticating ${email}...`);
    console.log('Redirection attempted to /(tabs)');
    router.replace('/(tabs)');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.softBlueBackground }]}>
      <LinearGradient
        colors={[theme.cardGradientStart, theme.softBlueBackground]}
        style={styles.backgroundGradient}
      />
      
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <ChevronLeft color={theme.primaryNavy} size={28} />
            </TouchableOpacity>
            <View style={styles.logoContainer}>
              <View style={[styles.logoCircle, { backgroundColor: theme.primaryNavy }]}>
                <Text style={styles.logoText}>C</Text>
              </View>
              <Text style={[styles.appName, { color: theme.primaryNavy }]}>callhome</Text>
            </View>
          </View>

          <View style={styles.formContainer}>
            <Text style={[styles.title, { color: theme.darkText }]}>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </Text>
            <Text style={[styles.subtitle, { color: theme.grayText }]}>
              {isLogin 
                ? 'Sign in to continue staying connected with your home.' 
                : 'Join the community for high-quality home communication.'}
            </Text>

            <View style={styles.inputs}>
              {!isLogin && (
                <View style={[styles.inputWrapper, { backgroundColor: theme.whiteCard, borderColor: theme.lightBorder }]}>
                  <User color={theme.primaryNavy} size={20} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { color: theme.darkText }]}
                    placeholder="Full Name"
                    placeholderTextColor={theme.grayText}
                    value={fullName}
                    onChangeText={setFullName}
                  />
                </View>
              )}

              <View style={[styles.inputWrapper, { backgroundColor: theme.whiteCard, borderColor: theme.lightBorder }]}>
                <Mail color={theme.primaryNavy} size={20} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { color: theme.darkText }]}
                  placeholder="Email Address"
                  placeholderTextColor={theme.grayText}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={[styles.inputWrapper, { backgroundColor: theme.whiteCard, borderColor: theme.lightBorder }]}>
                <Lock color={theme.primaryNavy} size={20} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { color: theme.darkText }]}
                  placeholder="Password"
                  placeholderTextColor={theme.grayText}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff color={theme.grayText} size={20} /> : <Eye color={theme.grayText} size={20} />}
                </TouchableOpacity>
              </View>

              {isLogin && (
                <TouchableOpacity style={styles.forgotBtn}>
                  <Text style={[styles.forgotText, { color: theme.primaryNavy }]}>Forgot Password?</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.authActions}>
              <TouchableOpacity 
                style={styles.mainBtn} 
                onPress={handleAuth}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[theme.primaryNavy, '#2563EB']}
                  style={styles.btnGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.btnText}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
                  <ArrowRight color="#FFFFFF" size={20} />
                </LinearGradient>
              </TouchableOpacity>

              {isLogin && (
                <TouchableOpacity 
                  style={[styles.biometricBtn, { borderColor: theme.lightBorder, backgroundColor: theme.whiteCard }]}
                  onPress={() => {
                    console.log('Biometric authentication requested');
                    handleAuth();
                  }}
                >
                  <Fingerprint color={theme.primaryNavy} size={28} />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.dividerContainer}>
              <View style={[styles.divider, { backgroundColor: theme.lightBorder }]} />
              <Text style={[styles.dividerText, { color: theme.grayText }]}>Or continue with</Text>
              <View style={[styles.divider, { backgroundColor: theme.lightBorder }]} />
            </View>

            <View style={styles.socialRow}>
              <SocialButton icon={Globe} theme={theme} styles={styles} color="#DB4437" />
              <SocialButton icon={Apple} theme={theme} styles={styles} color={isDarkMode ? '#FFF' : '#000'} />
              <SocialButton icon={Github} theme={theme} styles={styles} color={isDarkMode ? '#FFF' : '#333'} />
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: theme.grayText }]}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </Text>
            <TouchableOpacity onPress={toggleAuthMode}>
              <Text style={[styles.toggleText, { color: theme.primaryNavy }]}>
                {isLogin ? 'Sign Up' : 'Sign In'}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

function getStyles(theme: any, isDarkMode: boolean) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    backgroundGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 300,
    },
    safeArea: {
      flex: 1,
    },
    keyboardView: {
      flex: 1,
      paddingHorizontal: 24,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 20,
      marginBottom: 40,
    },
    backButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: 'rgba(255,255,255,0.2)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    logoCircle: {
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoText: {
      color: '#FFFFFF',
      fontSize: 20,
      fontWeight: '900',
    },
    appName: {
      fontSize: 20,
      fontWeight: '800',
      letterSpacing: -0.5,
    },
    formContainer: {
      flex: 1,
    },
    title: {
      fontSize: 32,
      fontWeight: '800',
      letterSpacing: -1,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      lineHeight: 22,
      marginBottom: 32,
    },
    inputs: {
      gap: 16,
      marginBottom: 24,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 60,
      borderRadius: 18,
      paddingHorizontal: 16,
      borderWidth: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.02,
      shadowRadius: 10,
      elevation: 2,
    },
    inputIcon: {
      marginRight: 12,
      opacity: 0.6,
    },
    input: {
      flex: 1,
      fontSize: 16,
      fontWeight: '600',
    },
    forgotBtn: {
      alignSelf: 'flex-end',
    },
    forgotText: {
      fontSize: 14,
      fontWeight: '700',
    },
    authActions: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 10,
    },
    mainBtn: {
      flex: 1,
      height: 60,
      borderRadius: 18,
      overflow: 'hidden',
      shadowColor: '#2563EB',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.3,
      shadowRadius: 20,
      elevation: 8,
    },
    biometricBtn: {
      width: 60,
      height: 60,
      borderRadius: 18,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 2,
    },
    btnGradient: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    btnText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '800',
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 32,
    },
    divider: {
      flex: 1,
      height: 1,
    },
    dividerText: {
      paddingHorizontal: 16,
      fontSize: 14,
      fontWeight: '600',
    },
    socialRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 20,
    },
    socialBtn: {
      width: 60,
      height: 60,
      borderRadius: 18,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 2,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 30,
    },
    footerText: {
      fontSize: 15,
      fontWeight: '500',
    },
    toggleText: {
      fontSize: 15,
      fontWeight: '800',
    },
  });
}
