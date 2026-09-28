import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { ArrowLeft, KeyRound, Mail } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { forgotPassword } from '../../api/authApi';

export default function ResetPasswordScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendLink = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await forgotPassword(email);
      navigation?.navigate?.('EnterResetCode', { email });
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack?.()}>
        <ArrowLeft size={18} color={colors.navy} />
      </TouchableOpacity>

      <View style={styles.body}>
        <View style={styles.iconCircle}>
          <KeyRound size={30} color={colors.royalBlue} />
        </View>

        <Text style={styles.heroTitle}>Reset Password</Text>
        <Text style={styles.heroSubtitle}>
          Enter your email and we'll send you a code to reset your password.
        </Text>

        <Text style={styles.label}>Email</Text>
        <View style={[styles.inputRow, error && styles.inputRowError]}>
          <Mail size={16} color={colors.textMuted} />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor={colors.textMuted}
            value={email}
            onChangeText={(v) => { setEmail(v); setError(''); }}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.sendButton} onPress={handleSendLink} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.sendButtonText}>Send Code</Text>
          )}
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
  body: { flex: 1, paddingHorizontal: 24, paddingTop: 40 },
  iconCircle: {
    width: 72, height: 72, borderRadius: 36, backgroundColor: colors.royalBlue + '15',
    alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 24,
  },
  heroTitle: { color: colors.navy, fontSize: 24, fontWeight: '800', textAlign: 'center' },
  heroSubtitle: { color: colors.textMuted, fontSize: 13, marginTop: 8, marginBottom: 32, lineHeight: 19, textAlign: 'center' },
  label: { fontSize: 13, fontWeight: '600', color: colors.slate, marginBottom: 8 },
  inputRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.mist,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 4, gap: 10,
    borderWidth: 1.5, borderColor: 'transparent',
  },
  inputRowError: { borderColor: '#DC2626' },
  input: { flex: 1, paddingVertical: 14, fontSize: 14, color: colors.navy },
  errorText: { color: '#DC2626', fontSize: 12, marginTop: 6, marginBottom: 8 },
  sendButton: { backgroundColor: colors.navy, borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 16 },
  sendButtonText: { color: colors.white, fontSize: 15, fontWeight: '700' },
});