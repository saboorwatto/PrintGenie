import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image } from 'react-native';
import { Sparkles, Zap } from 'lucide-react-native';
import { colors } from '../../theme/colors';

export default function WelcomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.navy} />

      <View style={styles.topLogoRow}>
        <View style={styles.topLogoCard}>
          <Image
            source={require('../../../assets/printgenie-logo.png')}
            style={styles.topLogoImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.topLogoText}>PrintGenie</Text>
      </View>

      <Text style={styles.welcomeLabel}>WELCOME</Text>
      <Text style={styles.heroTitle}>
        Print Smart.{'\n'}Price Right.
      </Text>
      <Text style={styles.heroSubtitle}>
        Upload your design, get an AI-powered price estimate, compare print shops, and place your order with ease.
      </Text>

      <View style={styles.illustrationBox}>
        <View style={styles.floatingIcon1}>
          <Sparkles size={16} color={colors.gold} />
        </View>
        <View style={styles.floatingIcon2}>
          <Zap size={14} color={colors.royalBlue} />
        </View>

        <View style={styles.logoGlow}>
          <Image
            source={require('../../../assets/printgenie-logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => navigation?.navigate?.('ChooseRole')}
      >
        <Text style={styles.getStartedButtonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navy, paddingHorizontal: 24, paddingTop: 70, paddingBottom: 40 },
  topLogoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, gap: 10 },
  topLogoCard: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: colors.white,
    alignItems: 'center', justifyContent: 'center',
  },
  topLogoImage: { width: 30, height: 30 },
  topLogoText: { color: colors.white, fontSize: 17, fontWeight: '700' },
  welcomeLabel: { color: colors.textMuted, fontSize: 13, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
  heroTitle: { color: colors.white, fontSize: 32, fontWeight: '800', lineHeight: 38 },
  heroSubtitle: { color: colors.textMuted, fontSize: 14, lineHeight: 20, marginTop: 12, marginBottom: 24 },
  illustrationBox: {
    flex: 1, backgroundColor: colors.royalBlue + '15', borderRadius: 24,
    alignItems: 'center', justifyContent: 'center', marginBottom: 24,
    position: 'relative', overflow: 'hidden',
  },
  floatingIcon1: {
    position: 'absolute', top: 28, right: 32,
    width: 32, height: 32, borderRadius: 16, backgroundColor: colors.white,
    alignItems: 'center', justifyContent: 'center',
  },
  floatingIcon2: {
    position: 'absolute', bottom: 36, left: 28,
    width: 28, height: 28, borderRadius: 14, backgroundColor: colors.white,
    alignItems: 'center', justifyContent: 'center',
  },
  logoGlow: {
    width: 160, height: 160, borderRadius: 32,
    backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center',
    shadowColor: colors.gold, shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3, shadowRadius: 20, elevation: 10,
  },
  logoImage: { width: 130, height: 130 },
  getStartedButton: { backgroundColor: colors.gold, borderRadius: 14, paddingVertical: 17, alignItems: 'center' },
  getStartedButtonText: { color: colors.navy, fontSize: 16, fontWeight: '700' },
});