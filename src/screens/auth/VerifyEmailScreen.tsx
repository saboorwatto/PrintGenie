import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { ArrowLeft, ShieldCheck } from 'lucide-react-native';
import { colors } from '../../theme/colors';

export default function VerifyEmailScreen({ navigation }: any) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState(false);
  const inputs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    if (secondsLeft === 0) return;
    const timer = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const handleChange = (text: string, index: number) => {
    setError(false);

    // Support pasting a full 6-digit code at once
    if (text.length > 1) {
      const digits = text.replace(/\D/g, '').slice(0, 6).split('');
      const newCode = [...code];
      digits.forEach((d, i) => { if (index + i < 6) newCode[index + i] = d; });
      setCode(newCode);
      const nextEmpty = newCode.findIndex((d) => !d);
      inputs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus();
      return;
    }

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    setVerifying(true);
    setError(false);
    try {
      // TODO: wire up to POST /api/auth/verify-otp from the SDS
      await new Promise((resolve) => setTimeout(resolve, 700));
      navigation?.navigate?.('ChooseRole');
    } catch (err) {
      setError(true);
    } finally {
      setVerifying(false);
    }
  };

  const isComplete = code.every((d) => d !== '');
  const timeLabel = `00:${secondsLeft.toString().padStart(2, '0')}`;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack?.()}>
        <ArrowLeft size={18} color={colors.navy} />
      </TouchableOpacity>

      <View style={styles.body}>
        <View style={styles.iconCircle}>
          <ShieldCheck size={30} color={colors.royalBlue} />
        </View>

        <Text style={styles.heroTitle}>Verify Your Email</Text>
        <Text style={styles.heroSubtitle}>Enter the 6-digit code sent to your email address.</Text>

        <View style={styles.codeRow}>
          {code.map((digit, i) => (
            <TextInput
              key={i}
              ref={(ref) => {
                inputs.current[i] = ref;
              }}
              style={[
                styles.codeBox,
                digit && styles.codeBoxFilled,
                error && styles.codeBoxError,
              ]}
              value={digit}
              onChangeText={(text) => handleChange(text, i)}
              onKeyPress={(e) => handleKeyPress(e, i)}
              keyboardType="number-pad"
              maxLength={6}
              textAlign="center"
            />
          ))}
        </View>

        {error && <Text style={styles.errorText}>Incorrect code — please try again</Text>}

        <Text style={styles.resendPrompt}>
          Didn't receive code?{' '}
          {secondsLeft > 0 ? (
            <Text style={styles.resendTimer}>Resend ({timeLabel})</Text>
          ) : (
            <Text style={styles.resendLink} onPress={() => setSecondsLeft(30)}>
              Resend
            </Text>
          )}
        </Text>

        <TouchableOpacity
          style={[styles.verifyButton, !isComplete && styles.verifyButtonDisabled]}
          onPress={handleVerify}
          disabled={!isComplete || verifying}
        >
          {verifying ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.verifyButtonText}>Verify & Continue</Text>
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
  body: { flex: 1, paddingHorizontal: 24, paddingTop: 20 },
  iconCircle: {
    width: 64, height: 64, borderRadius: 32, backgroundColor: colors.royalBlue + '15',
    alignItems: 'center', justifyContent: 'center', marginBottom: 20,
  },
  heroTitle: { color: colors.navy, fontSize: 24, fontWeight: '800' },
  heroSubtitle: { color: colors.textMuted, fontSize: 13, marginTop: 8, marginBottom: 28 },
  codeRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  codeBox: {
    width: 46, height: 54, borderRadius: 12, backgroundColor: colors.mist,
    fontSize: 20, fontWeight: '700', color: colors.navy,
    borderWidth: 1.5, borderColor: 'transparent',
  },
  codeBoxFilled: { borderColor: colors.royalBlue, backgroundColor: colors.royalBlue + '10' },
  codeBoxError: { borderColor: '#DC2626', backgroundColor: '#FEE2E2' },
  errorText: { color: '#DC2626', fontSize: 12, marginBottom: 16 },
  resendPrompt: { fontSize: 13, color: colors.textMuted, textAlign: 'center', marginTop: 16, marginBottom: 32 },
  resendTimer: { color: colors.textMuted, fontWeight: '600' },
  resendLink: { color: colors.royalBlue, fontWeight: '700' },
  verifyButton: { backgroundColor: colors.navy, borderRadius: 12, paddingVertical: 16, alignItems: 'center' },
  verifyButtonDisabled: { opacity: 0.4 },
  verifyButtonText: { color: colors.white, fontSize: 15, fontWeight: '700' },
});