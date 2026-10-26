import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { ArrowLeft, ShieldCheck, Lock, Eye, EyeOff } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { resetPassword } from '../../api/authApi';

export default function EnterResetCodeScreen({ navigation, route }: any) {
  const email = route?.params?.email;

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    setError('');
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

  const isCodeComplete = code.every((d) => d !== '');

  const handleReset = async () => {
    if (!isCodeComplete) {
      setError('Enter the full 6-digit code');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }

    setError('');
    setLoading(true);
    try {
      await resetPassword(email, code.join(''), newPassword);
      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || 'Invalid or expired code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
        <View style={styles.body}>
          <View style={styles.iconCircleSuccess}>
            <ShieldCheck size={30} color="#16A34A" />
          </View>
          <Text style={styles.heroTitle}>Password Reset</Text>
          <Text style={styles.heroSubtitle}>
            Your password has been changed successfully. You can now log in with your new password.
          </Text>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => navigation?.navigate?.('AuthLogin')}
          >
            <Text style={styles.resetButtonText}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

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

        <Text style={styles.heroTitle}>Enter Reset Code</Text>
        <Text style={styles.heroSubtitle}>
          We sent a 6-digit code to {email}. Enter it below along with your new password.
        </Text>

        <View style={styles.codeRow}>
          {code.map((digit, i) => (
            <TextInput
              key={i}
              ref={(ref: TextInput | null) => {
                inputs.current[i] = ref;
              }}
              style={[styles.codeBox, digit && styles.codeBoxFilled]}
              value={digit}
              onChangeText={(text) => handleChange(text.slice(-1), i)}
              onKeyPress={(e) => handleKeyPress(e, i)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>

        <Text style={styles.label}>New Password</Text>
        <View style={styles.inputRow}>
          <Lock size={16} color={colors.textMuted} />
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            placeholderTextColor={colors.textMuted}
            value={newPassword}
            onChangeText={(v) => { setNewPassword(v); setError(''); }}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyeOff size={16} color={colors.textMuted} />
            ) : (
              <Eye size={16} color={colors.textMuted} />
            )}
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.resetButton} onPress={handleReset} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.resetButtonText}>Reset Password</Text>
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
    width: 64, height: 64, borderRadius: 32, backgroundColor: colors.royalBlue + '15',
    alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 20,
  },
  iconCircleSuccess: {
    width: 64, height: 64, borderRadius: 32, backgroundColor: '#DCFCE7',
    alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 20, marginTop: 60,
  },
  heroTitle: { color: colors.navy, fontSize: 24, fontWeight: '800', textAlign: 'center' },
  heroSubtitle: { color: colors.textMuted, fontSize: 13, marginTop: 8, marginBottom: 28, lineHeight: 19, textAlign: 'center' },
  codeRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  codeBox: {
    width: 46, height: 54, borderRadius: 12, backgroundColor: colors.mist,
    fontSize: 20, fontWeight: '700', color: colors.navy,
    borderWidth: 1.5, borderColor: 'transparent',
  },
  codeBoxFilled: { borderColor: colors.royalBlue, backgroundColor: colors.royalBlue + '10' },
  label: { fontSize: 13, fontWeight: '600', color: colors.slate, marginBottom: 8 },
  inputRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.mist,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 4, gap: 10,
  },
  input: { flex: 1, paddingVertical: 14, fontSize: 14, color: colors.navy },
  errorText: { color: '#DC2626', fontSize: 12, marginTop: 12, textAlign: 'center' },
  resetButton: { backgroundColor: colors.navy, borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 20 },
  resetButtonText: { color: colors.white, fontSize: 15, fontWeight: '700' },
});