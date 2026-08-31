import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import PrintGenieLogo from '../../components/PrintGenieLogo';

export default function VerifyEmailScreen({ navigation }: any) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const inputs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    if (secondsLeft === 0) return;
    const timer = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerify = () => {
    // TODO: wire up to POST /api/auth/verify-email from the SDS
    navigation?.navigate?.('ChooseRole');
  };

  const timeLabel = `00:${secondsLeft.toString().padStart(2, '0')}`;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack?.()}>
        <ArrowLeft size={18} color={colors.navy} />
      </TouchableOpacity>

      <View style={styles.body}>
        <PrintGenieLogo size="small" style={styles.logo} />

        <Text style={styles.heroTitle}>Verify Your Email</Text>
        <Text style={styles.heroSubtitle}>Enter the 6-digit code sent to your email address.</Text>

        <View style={styles.codeRow}>
          {code.map((digit, i) => (
            <TextInput
              key={i}
              ref={(ref) => { inputs.current[i] = ref; }}
              style={styles.codeBox}
              value={digit}
              onChangeText={(text) => handleChange(text.slice(-1), i)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>

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

        <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
          <Text style={styles.verifyButtonText}>Verify & Continue</Text>
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
  heroSubtitle: { color: colors.textMuted, fontSize: 13, marginTop: 8, marginBottom: 28 },
  codeRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  codeBox: {
    width: 46, height: 54, borderRadius: 12, backgroundColor: colors.mist,
    fontSize: 20, fontWeight: '700', color: colors.navy,
  },
  resendPrompt: { fontSize: 13, color: colors.textMuted, textAlign: 'center', marginBottom: 32 },
  resendTimer: { color: colors.textMuted, fontWeight: '600' },
  resendLink: { color: colors.royalBlue, fontWeight: '700' },
  verifyButton: { backgroundColor: colors.navy, borderRadius: 12, paddingVertical: 16, alignItems: 'center' },
  verifyButtonText: { color: colors.white, fontSize: 15, fontWeight: '700' },
});