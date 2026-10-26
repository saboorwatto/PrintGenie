import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
} from 'react-native';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { login } from '../../api/authApi';
import { setToken } from '../../api/authToken';

export default function AuthLoginScreen({ navigation, route }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  const role = route?.params?.role;

  const handleLogin = async () => {
    let hasError = false;
    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    } else {
      setEmailError('');
    }
    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } else {
      setPasswordError('');
    }
    if (hasError) return;

    setFormError('');
    setLoading(true);
    try {
      const response = await login(email, password);
      setToken(response.token);
      const actualRole = response.user?.role;

      if (actualRole === 'customer') {
        navigation?.reset?.({ index: 0, routes: [{ name: 'Customer' }] });
      } else if (actualRole === 'admin') {
        navigation?.reset?.({ index: 0, routes: [{ name: 'Main' }] });
      } else if (actualRole === 'shopOwner') {
        navigation?.reset?.({ index: 0, routes: [{ name: 'ShopOwner' }] });
      } else {
        setFormError('Unrecognized account role.');
      }
    } catch (err: any) {
      setFormError(err?.message || 'Check your email and password, or try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack?.()}>
        <ArrowLeft size={18} color={colors.navy} />
      </TouchableOpacity>

      <View style={styles.body}>
        <View style={styles.logoRow}>
          <View style={styles.logoIconBox}>
            <Image
              source={require('../../../assets/printgenie-logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.logoTitle}>PrintGenie</Text>
        </View>

        <Text style={styles.welcomeLabel}>WELCOME BACK</Text>
        <Text style={styles.heroTitle}>Welcome Back!</Text>
        <Text style={styles.heroSubtitle}>Login to continue to your PrintGenie account.</Text>

        <Text style={styles.label}>Email Address</Text>
        <View style={[styles.inputRow, emailError && styles.inputRowError]}>
          <Mail size={16} color={colors.textMuted} />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor={colors.textMuted}
            value={email}
            onChangeText={(v) => { setEmail(v); setEmailError(''); setFormError(''); }}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
        {emailError ? <Text style={styles.fieldErrorText}>{emailError}</Text> : null}

        <Text style={styles.label}>Password</Text>
        <View style={[styles.inputRow, passwordError && styles.inputRowError]}>
          <Lock size={16} color={colors.textMuted} />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor={colors.textMuted}
            value={password}
            onChangeText={(v) => { setPassword(v); setPasswordError(''); setFormError(''); }}
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
        {passwordError ? <Text style={styles.fieldErrorText}>{passwordError}</Text> : null}

        <TouchableOpacity onPress={() => navigation?.navigate?.('ResetPassword')}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        {formError ? (
          <View style={styles.formErrorBox}>
            <Text style={styles.formErrorText}>{formError}</Text>
          </View>
        ) : null}

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.signupPrompt}>
          Don't have an account?{' '}
          <Text
            style={styles.signupLink}
            onPress={() =>
              role === 'shopowner'
                ? navigation?.navigate?.('ShopOwner', { screen: 'OwnerRegistration' })
                : navigation?.navigate?.('SignUp', { role })
            }
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  backButton: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: colors.mist,
    alignItems: 'center', justifyContent: 'center', marginLeft: 20, marginTop: 50,
  },
  body: { flex: 1, paddingHorizontal: 24, paddingTop: 20 },
  logoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 28 },
  logoIconBox: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: colors.white,
    alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  logoImage: { width: 28, height: 28 },
  logoTitle: { color: colors.navy, fontSize: 18, fontWeight: '700' },
  welcomeLabel: { color: colors.royalBlue, fontSize: 12, fontWeight: '700', letterSpacing: 1, marginBottom: 6 },
  heroTitle: { color: colors.navy, fontSize: 26, fontWeight: '800' },
  heroSubtitle: { color: colors.textMuted, fontSize: 13, marginTop: 6, marginBottom: 28 },
  label: { fontSize: 13, fontWeight: '600', color: colors.slate, marginBottom: 8 },
  inputRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.mist,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 4, marginBottom: 6, gap: 10,
    borderWidth: 1.5, borderColor: 'transparent',
  },
  inputRowError: { borderColor: '#DC2626' },
  input: { flex: 1, paddingVertical: 12, fontSize: 14, color: colors.navy },
  fieldErrorText: { color: '#DC2626', fontSize: 12, marginBottom: 12 },
  forgotPassword: { color: colors.royalBlue, fontSize: 13, fontWeight: '600', textAlign: 'right', marginBottom: 16 },
  formErrorBox: { backgroundColor: '#FEE2E2', borderRadius: 10, padding: 12, marginBottom: 16 },
  formErrorText: { color: '#DC2626', fontSize: 13, textAlign: 'center' },
  loginButton: { backgroundColor: colors.navy, borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginBottom: 20 },
  loginButtonText: { color: colors.white, fontSize: 15, fontWeight: '700' },
  signupPrompt: { fontSize: 13, color: colors.textMuted, textAlign: 'center' },
  signupLink: { color: colors.royalBlue, fontWeight: '700' },
});