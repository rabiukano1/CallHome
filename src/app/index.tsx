import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Phone, ShieldCheck, Sparkles, ChevronRight, Home, Smartphone, Zap } from 'lucide-react-native';
import { useAppTheme } from '@/context/ThemeContext';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Welcome to CallHome',
    description: 'Experience a new way to stay connected with your home hub. Seamless, crystal-clear communication.',
    icon: Home,
    color: '#3B82F6',
  },
  {
    id: '2',
    title: 'Crystal Clear Quality',
    description: 'Our advanced gateway ensures high-definition audio and video calls, even on low bandwidth.',
    icon: Zap,
    color: '#10B981',
  },
  {
    id: '3',
    title: 'Private & Secure',
    description: 'Your privacy is our priority. Every call is encrypted and secured by your personal home gateway.',
    icon: ShieldCheck,
    color: '#6366F1',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const { theme, isDarkMode } = useAppTheme();
  const styles = getStyles(theme);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0]?.index || 0);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < SLIDES.length - 1) {
      // @ts-ignore
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.push('/login');
    }
  };

  const renderItem = ({ item }: any) => {
    const Icon = item.icon;
    return (
      <View style={[styles.slide, { width }]}>
        <View style={styles.iconContainer}>
          <LinearGradient
            colors={[`${item.color}40`, 'transparent']}
            style={styles.iconBg}
          >
            <Icon color={item.color} size={120} strokeWidth={1.5} />
          </LinearGradient>
          <View style={[styles.sparkleContainer, { right: 20, top: 40 }]}>
            <Sparkles color={item.color} size={24} opacity={0.6} />
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: theme.darkText }]}>{item.title}</Text>
          <Text style={[styles.description, { color: theme.grayText }]}>{item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.softBlueBackground }]}>
      <FlatList
        data={SLIDES}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          {SLIDES.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [10, 20, 10],
              extrapolate: 'clamp',
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={i.toString()}
                style={[
                  styles.dot,
                  { width: dotWidth, opacity, backgroundColor: SLIDES[currentIndex].color },
                ]}
              />
            );
          })}
        </View>

        <TouchableOpacity 
          onPress={scrollTo} 
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[SLIDES[currentIndex].color, `${SLIDES[currentIndex].color}CC`]}
            style={styles.nextButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.nextButtonText}>
              {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
            </Text>
            <ChevronRight color="#FFFFFF" size={20} />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.skipButton} 
          onPress={() => router.push('/login')}
        >
          <Text style={[styles.skipText, { color: theme.grayText }]}>Skip</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function getStyles(theme: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    slide: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
    },
    iconContainer: {
      height: height * 0.4,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    iconBg: {
      width: 280,
      height: 280,
      borderRadius: 140,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sparkleContainer: {
      position: 'absolute',
    },
    textContainer: {
      alignItems: 'center',
      marginTop: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: '800',
      textAlign: 'center',
      marginBottom: 16,
      letterSpacing: -0.5,
    },
    description: {
      fontSize: 16,
      textAlign: 'center',
      lineHeight: 24,
      paddingHorizontal: 20,
    },
    footer: {
      paddingBottom: 40,
      paddingHorizontal: 40,
      alignItems: 'center',
    },
    indicatorContainer: {
      flexDirection: 'row',
      height: 10,
      marginBottom: 40,
    },
    dot: {
      height: 10,
      borderRadius: 5,
      marginHorizontal: 4,
    },
    nextButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 18,
      paddingHorizontal: 32,
      borderRadius: 20,
      width: width - 80,
      gap: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 20,
      elevation: 10,
    },
    nextButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '700',
    },
    skipButton: {
      marginTop: 24,
    },
    skipText: {
      fontSize: 14,
      fontWeight: '600',
      opacity: 0.6,
    },
  });
}
