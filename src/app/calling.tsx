import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX,
  Video, VideoOff, SwitchCamera, Grid, User,
} from 'lucide-react-native';
import { useAppTheme } from '@/context/ThemeContext';

const { width, height } = Dimensions.get('window');

type CallMode = 'voice' | 'video' | 'phone';
type CallState = 'dialing' | 'connecting' | 'active' | 'ended';

export default function CallingScreen() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const params = useLocalSearchParams<{
    name?: string; number?: string; mode?: string;
  }>();

  const callerName = params.name || 'Unknown';
  const callerNumber = params.number || '';
  const callMode = (params.mode || 'phone') as CallMode;

  const [callState, setCallState] = useState<CallState>('dialing');
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(callMode === 'video');
  const [seconds, setSeconds] = useState(0);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Simulate call states
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, duration: 600, useNativeDriver: true,
    }).start();

    const t1 = setTimeout(() => setCallState('connecting'), 1500);
    const t2 = setTimeout(() => setCallState('active'), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Pulse animation for avatar
  useEffect(() => {
    if (callState !== 'active') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.15, duration: 800, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [callState]);

  // Timer
  useEffect(() => {
    if (callState !== 'active') return;
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, [callState]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const endCall = () => {
    setCallState('ended');
    setTimeout(() => router.back(), 400);
  };

  const statusLabel = {
    dialing: 'Dialing...',
    connecting: 'Connecting...',
    active: formatTime(seconds),
    ended: 'Call Ended',
  }[callState];

  const modeLabel = {
    voice: 'Voice Call',
    video: 'Video Call',
    phone: 'Phone Call',
  }[callMode];

  const gradientColors: [string, string, string] = callMode === 'video'
    ? ['#0B2A5B', '#1E3A8A', '#3B82F6']
    : callMode === 'voice'
      ? ['#0B2A5B', '#0D3570', '#2563EB']
      : ['#0B2A5B', '#1F2937', '#374151'];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={gradientColors} style={StyleSheet.absoluteFillObject} />

      {/* Video mode placeholder */}
      {callMode === 'video' && isVideoOn && (
        <View style={styles.videoContainer}>
          <View style={styles.remoteVideo}>
            <LinearGradient colors={['#1E3A8A', '#3B82F6']} style={StyleSheet.absoluteFillObject} />
            <User color="rgba(255,255,255,0.15)" size={180} />
          </View>
          <View style={styles.localVideo}>
            <LinearGradient colors={['#0B2A5B', '#2563EB']} style={StyleSheet.absoluteFillObject} />
            <User color="rgba(255,255,255,0.3)" size={40} />
          </View>
        </View>
      )}

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Mode badge */}
        <View style={styles.modeBadge}>
          <Text style={styles.modeBadgeText}>{modeLabel}</Text>
        </View>

        {/* Avatar (hidden in active video) */}
        {!(callMode === 'video' && isVideoOn) && (
          <View style={styles.avatarSection}>
            <Animated.View style={[styles.avatarRing, { transform: [{ scale: pulseAnim }] }]}>
              <View style={styles.avatarOuter} />
            </Animated.View>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {callerName.charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>
        )}

        {/* Caller info */}
        <View style={styles.callerInfo}>
          <Text style={styles.callerName}>{callerName}</Text>
          {callerNumber ? <Text style={styles.callerNumber}>{callerNumber}</Text> : null}
          <Text style={[
            styles.callStatus,
            callState === 'active' && styles.callStatusActive,
          ]}>
            {statusLabel}
          </Text>
        </View>

        {/* Spacer */}
        <View style={{ flex: 1 }} />

        {/* Controls */}
        <View style={styles.controls}>
          <ControlBtn
            icon={isMuted ? MicOff : Mic}
            label={isMuted ? 'Unmute' : 'Mute'}
            active={isMuted}
            onPress={() => setIsMuted(!isMuted)}
          />
          <ControlBtn
            icon={isSpeaker ? VolumeX : Volume2}
            label={isSpeaker ? 'Earpiece' : 'Speaker'}
            active={isSpeaker}
            onPress={() => setIsSpeaker(!isSpeaker)}
          />
          {callMode !== 'phone' && (
            <ControlBtn
              icon={isVideoOn ? VideoOff : Video}
              label={isVideoOn ? 'Video Off' : 'Video On'}
              active={isVideoOn}
              onPress={() => setIsVideoOn(!isVideoOn)}
            />
          )}
          {callMode === 'video' && isVideoOn && (
            <ControlBtn
              icon={SwitchCamera}
              label="Flip"
              onPress={() => console.log('Flip camera')}
            />
          )}
          {callMode === 'phone' && (
            <ControlBtn
              icon={Grid}
              label="Keypad"
              onPress={() => console.log('Open keypad')}
            />
          )}
        </View>

        {/* End call */}
        <TouchableOpacity style={styles.endCallBtn} onPress={endCall} activeOpacity={0.8}>
          <LinearGradient
            colors={['#EF4444', '#DC2626']}
            style={styles.endCallGradient}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          >
            <PhoneOff color="#FFF" size={28} />
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.endLabel}>End Call</Text>

        <View style={{ height: 40 }} />
      </Animated.View>
    </View>
  );
}

function ControlBtn({ icon: Icon, label, active, onPress }: any) {
  return (
    <TouchableOpacity style={styles.controlItem} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.controlCircle, active && styles.controlCircleActive]}>
        <Icon color={active ? '#0B2A5B' : '#FFF'} size={24} />
      </View>
      <Text style={styles.controlLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1, alignItems: 'center', paddingTop: 60,
  },
  modeBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 16, paddingVertical: 6,
    borderRadius: 20, marginBottom: 40,
  },
  modeBadgeText: {
    color: '#FFF', fontSize: 13, fontWeight: '700',
    letterSpacing: 1, textTransform: 'uppercase',
  },
  avatarSection: {
    width: 140, height: 140,
    justifyContent: 'center', alignItems: 'center', marginBottom: 24,
  },
  avatarRing: {
    position: 'absolute', width: 140, height: 140,
    borderRadius: 70, justifyContent: 'center', alignItems: 'center',
  },
  avatarOuter: {
    width: 140, height: 140, borderRadius: 70,
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.2)',
  },
  avatar: {
    width: 110, height: 110, borderRadius: 55,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { color: '#FFF', fontSize: 48, fontWeight: '300' },
  callerInfo: { alignItems: 'center', marginBottom: 20 },
  callerName: { color: '#FFF', fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  callerNumber: { color: 'rgba(255,255,255,0.6)', fontSize: 16, marginTop: 4, fontWeight: '500' },
  callStatus: {
    color: 'rgba(255,255,255,0.5)', fontSize: 15, marginTop: 8,
    fontWeight: '600', letterSpacing: 0.5,
  },
  callStatusActive: { color: '#76E4DF' },
  controls: {
    flexDirection: 'row', justifyContent: 'center',
    gap: 24, marginBottom: 40, flexWrap: 'wrap',
  },
  controlItem: { alignItems: 'center', width: 70 },
  controlCircle: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center', alignItems: 'center', marginBottom: 6,
  },
  controlCircleActive: { backgroundColor: '#FFF' },
  controlLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: '600' },
  endCallBtn: {
    width: 72, height: 72, borderRadius: 36, overflow: 'hidden',
    shadowColor: '#EF4444', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4, shadowRadius: 16, elevation: 10,
  },
  endCallGradient: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
  endLabel: {
    color: 'rgba(255,255,255,0.5)', fontSize: 12,
    fontWeight: '600', marginTop: 8,
  },
  videoContainer: { ...StyleSheet.absoluteFillObject },
  remoteVideo: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
  localVideo: {
    position: 'absolute', top: 60, right: 20,
    width: 120, height: 160, borderRadius: 16,
    overflow: 'hidden', justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)',
  },
});
