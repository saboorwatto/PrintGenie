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
} from 'react-native';
import { ArrowLeft, Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { register } from '../../api/authApi';

export default function SignUpScreen({ navigation, route }: any) {
  const role = route?.params?.role;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const passwordStrength =
    password.length === 0 ? null : password.length < 6 ? 'weak' : password.length < 10 ? 'medium' : 'strong';

  const handleSignUp = async () => {
    let hasError = false;

    if (!name) {
      setNameError('Name is required');
      hasError = true;
    } else {
      setNameError('');
    }

    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Enter a valid email address');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (hasError) return;

    setFormError('');
    setLoading(true);
    try {
      await register(name, email, password, phone, role);
      navigation?.navigate?.('AuthLogin', { role });
    } catch (err: any) {
      setFormError(err?.message || 'Something went wrong. Please try again.');
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
        <Text style={styles.heroTitle}>Create Account</Text>
        <Text style={styles.heroSubtitle}>
          Sign up as a {role === 'admin' ? 'Admin' : 'Customer'} to get started.
        </Text>

        <Text style={styles.label}>Full Name</Text>
        <View style={[styles.inputRow, nameError && styles.inputRowError]}>
          <User size={16} color={colors.textMuted} />
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor={colors.textMuted}
            value={name}
            onChangeText={(v) => { setName(v); setNameError(''); }}
          />
        </View>
        {nameError ? <Text style={styles.fieldErrorText}>{nameError}</Text> : null}

        <Text style={styles.label}>Email Address</Text>
        <View style={[styles.inputRow, emailError && styles.inputRowError]}>
          <Mail size={16} color={colors.textMuted} />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor={colors.textMuted}
            value={email}
            onChangeText={(v) => { setEmail(v); setEmailError(''); }}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
        {emailError ? <Text style={styles.fieldErrorText}>{emailError}</Text> : null}

        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.inputRow}>
          <Phone size={16} color={colors.textMuted} />
          <TextInput
            style={styles.input}
            placeholder="03XX XXXXXXX"
            placeholderTextColor={colors.textMuted}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={[styles.inputRow, passwordError && styles.inputRowError]}>
          <Lock size={16} color={colors.textMuted} />
          <TextInput
            style={styles.input}
            placeholder="Create a password"
            placeholderTextColor={colors.textMuted}
            value={password}
            onChangeText={(v) => { setPassword(v); setPasswordError(''); }}
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
        {passwordError ? (
          <Text style={styles.fieldErrorText}>{passwordError}</Text>
        ) : passwordStrength ? (
          <View style={styles.strengthRow}>
            <View style={styles.strengthBarTrack}>
              <View
                style={[
                  styles.strengthBarFill,
                  passwordStrength === 'weak' && { width: '33%', backgroundColor: '#DC2626' },
                  passwordStrength === 'medium' && { width: '66%', backgroundColor: '#D97706' },
                  passwordStrength === 'strong' && { width: '100%', backgroundColor: '#16A34A' },
                ]}
              />
            </View>
            <Text
              style={[
                styles.strengthLabel,
                passwordStrength === 'weak' && { color: '#DC2626' },
                passwordStrength === 'medium' && { color: '#D97706' },
                passwordStrength === 'strong' && { color: '#16A34A' },
              ]}
            >
              {passwordStrength === 'weak' ? 'Weak' : passwordStrength === 'medium' ? 'Medium' : 'Strong'}
            </Text>
          </View>
        ) : null}

        {formError ? (
          <View style={styles.formErrorBox}>
            <Text style={styles.formErrorText}>{formError}</Text>
          </View>
        ) : null}

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.signUpButtonText}>Create Account</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.loginPrompt}>
          Already have an account?{' '}
          <Text style={styles.loginLink} onPress={() => navigation?.navigate?.('AuthLogin', { role })}>
            Log in
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
  heroTitle: { color: colors.navy, fontSize: 26, fontWeight: '800' },
  heroSubtitle: { color: colors.textMuted, fontSize: 13, marginTop: 6, marginBottom: 24 },
  label: { fontSize: 13, fontWeight: '600', color: colors.slate, marginBottom: 8 },
  inputRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.mist,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 4, marginBottom: 6, gap: 10,
    borderWidth: 1.5, borderColor: 'transparent',
  },
  inputRowError: { borderColor: '#DC2626' },
  input: { flex: 1, paddingVertical: 12, fontSize: 14, color: colors.navy },
  fieldErrorText: { color: '#DC2626', fontSize: 12, marginBottom: 12 },
  strengthRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  strengthBarTrack: { flex: 1, height: 4, backgroundColor: colors.border + '55', borderRadius: 2, overflow: 'hidden' },
  strengthBarFill: { height: 4, borderRadius: 2 },
  strengthLabel: { fontSize: 11, fontWeight: '700' },
  formErrorBox: { backgroundColor: '#FEE2E2', borderRadius: 10, padding: 12, marginBottom: 16 },
  formErrorText: { color: '#DC2626', fontSize: 13, textAlign: 'center' },
  signUpButton: { backgroundColor: colors.navy, borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 8, marginBottom: 20 },
  signUpButtonText: { color: colors.white, fontSize: 15, fontWeight: '700' },
  loginPrompt: { fontSize: 13, color: colors.textMuted, textAlign: 'center' },
  loginLink: { color: colors.royalBlue, fontWeight: '700' },
});