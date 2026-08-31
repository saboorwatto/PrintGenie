import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { ArrowLeft, Sparkles } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import PrintGenieLogo from '../../components/PrintGenieLogo';

type ResetRole = 'customer' | 'admin' | 'shopowner';

const ROLE_COPY: Record<ResetRole, string> = {
  customer: 'Enter your email and we\'ll send you a link to reset your PrintGenie account password.',
  admin: 'Enter your admin email and we\'ll send you a link to reset your admin panel password.',
  shopowner: 'Enter your shop email and we\'ll send you a link to reset your shop account password.',
};

export default function ResetPasswordScreen({ navigation, route }: any) {
  const role: ResetRole = route?.params?.role ?? 'customer';
  const [email, setEmail] = useState('');

  const handleSendLink = () => {
    // TODO: wire up to POST /api/auth/reset-password from the SDS (pass role in request body)
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack?.()}>
        <ArrowLeft size={18} color={colors.navy} />
      </TouchableOpacity>

      <View style={styles.body}>
        <PrintGenieLogo size="small" style={styles.logo} />

        <Text style={styles.heroTitle}>Reset Password</Text>
        <Text style={styles.heroSubtitle}>{ROLE_COPY[role]}</Text>

        <View style={styles.iconCircle}>
          <Sparkles size={26} color={colors.royalBlue} />
        </View>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor={colors.textMuted}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleSendLink}>
          <Text style={styles.sendButtonText}>Send Reset Link</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  backButton: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: colors.mist,
    alignItems: 'center', justifyContent: 'center', marginLeft: 20, marginTop: 50,
  },
  body: { flex: 1, paddingHorizontal: 24, paddingTop: 20 },
  logo: { marginBottom: 24, alignSelf: 'flex-start' },
  heroTitle: { color: colors.navy, fontSize: 24, fontWeight: '800' },
  heroSubtitle: { color: colors.textMuted, fontSize: 13, marginTop: 8, marginBottom: 32, lineHeight: 19 },
  iconCircle: {
    width: 72, height: 72, borderRadius: 36, backgroundColor: colors.royalBlue + '15',
    alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 32,
  },
  label: { fontSize: 13, fontWeight: '600', color: colors.slate, marginBottom: 8 },
  input: {
    backgroundColor: colors.mist, borderRadius: 12, paddingHorizontal: 14,
    paddingVertical: 14, fontSize: 14, color: colors.navy, marginBottom: 24,
  },
  sendButton: { backgroundColor: colors.navy, borderRadius: 12, paddingVertical: 16, alignItems: 'center' },
  sendButtonText: { color: colors.white, fontSize: 15, fontWeight: '700' },
});