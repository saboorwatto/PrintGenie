import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { colors } from '../../theme/colors';
import PrintGenieLogo from '../../components/PrintGenieLogo';

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
        <PrintGenieLogo size="large" style={styles.logo} />
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
    flex: 1,
    backgroundColor: colors.royalBlue + '38',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.gold + '60',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    padding: 24,
  },
  logo: { width: 240, height: 96 },
  getStartedButton: { backgroundColor: colors.gold, borderRadius: 14, paddingVertical: 17, alignItems: 'center' },
  getStartedButtonText: { color: colors.navy, fontSize: 16, fontWeight: '700' },
});
