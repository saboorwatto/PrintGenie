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
} from 'react-native';
import { colors } from '../../theme/colors';
export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (target: 'Main' | 'Customer') => {
    if (navigation) {
      navigation.navigate(target);
    } else {
      console.log('Login pressed', { email, password, target });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.navy} />

      <View style={styles.header}>
        <View style={styles.logoBox}>
          <Text style={styles.logoIcon}>📦</Text>
        </View>
        <Text style={styles.title}>PrintGenie</Text>
        <Text style={styles.subtitle}>PRINT MARKETPLACE</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="admin@printgenie.com"
          placeholderTextColor={colors.textMuted}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor={colors.textMuted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={() => handleLogin('Customer')}>
          <Text style={styles.loginButtonText}>Login as Customer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.adminButton} onPress={() => handleLogin('Main')}>
          <Text style={styles.adminButtonText}>Admin Panel Login</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Choose customer or admin access to continue
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: {
    backgroundColor: colors.navy,
    alignItems: 'center',
    paddingTop: 70,
    paddingBottom: 40,
  },
  logoBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoIcon: { fontSize: 28 },
  title: { color: colors.white, fontSize: 24, fontWeight: '700' },
  subtitle: { color: colors.textMuted, fontSize: 12, letterSpacing: 2, marginTop: 4 },
  form: { flex: 1, paddingHorizontal: 24, paddingTop: 32 },
  label: { color: colors.slate, fontSize: 14, fontWeight: '600', marginBottom: 8 },
  input: {
    backgroundColor: colors.mist,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.navy,
    marginBottom: 20,
  },
  forgotPassword: {
    color: colors.royalBlue,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: colors.navy,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: { color: colors.white, fontSize: 16, fontWeight: '700' },
  adminButton: {
    backgroundColor: colors.mist,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  adminButtonText: { color: colors.navy, fontSize: 15, fontWeight: '700' },
  footerText: { color: colors.textMuted, fontSize: 12, textAlign: 'center' },
});