import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Package } from 'lucide-react-native';
import { colors } from '../../theme/colors';

export default function WelcomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.navy} />

      <Text style={styles.welcomeLabel}>WELCOME</Text>
      <Text style={styles.heroTitle}>
        Print Smart.{'\n'}Price Right.
      </Text>
      <Text style={styles.heroSubtitle}>
        Upload your design, get an AI-powered price estimate, compare print shops, and place your order with ease.
      </Text>

      <View style={styles.illustrationBox}>
        <View style={styles.logoIconBox}>
          <Package size={32} color={colors.navy} />
        </View>
        <Text style={styles.logoTitle}>PrintGenie</Text>
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
  welcomeLabel: { color: colors.textMuted, fontSize: 13, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
  heroTitle: { color: colors.white, fontSize: 32, fontWeight: '800', lineHeight: 38 },
  heroSubtitle: { color: colors.textMuted, fontSize: 14, lineHeight: 20, marginTop: 12, marginBottom: 24 },
  illustrationBox: {
    flex: 1, backgroundColor: colors.royalBlue + '22', borderRadius: 20,
    alignItems: 'center', justifyContent: 'center', marginBottom: 24, gap: 12,
  },
  logoIconBox: {
    width: 64, height: 64, borderRadius: 16, backgroundColor: colors.gold,
    alignItems: 'center', justifyContent: 'center',
  },
  logoTitle: { color: colors.white, fontSize: 18, fontWeight: '700' },
  getStartedButton: { backgroundColor: colors.gold, borderRadius: 14, paddingVertical: 17, alignItems: 'center' },
  getStartedButtonText: { color: colors.navy, fontSize: 16, fontWeight: '700' },
});