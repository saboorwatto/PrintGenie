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
import { Package, Mail, Lock } from 'lucide-react-native';
import { colors } from '../../theme/colors';

export default function OwnerLoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: wire up to POST /api/auth/owner-login from the SDS
    navigation.reset({ index: 0, routes: [{ name: 'ShopOwnerTabs' }] });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <View style={styles.body}>
        <View style={styles.logoBox}>
          <View style={styles.logoIconBox}>
            <Package size={26} color={colors.navy} />
          </View>
          <Text style={styles.heroTitle}>Welcome Back!</Text>
          <Text style={styles.heroSubtitle}>Login to your shop account</Text>
        </View>

        <Text style={styles.label}>Email</Text>
        <View style={styles.inputRow}>
          <Mail size={16} color={colors.textMuted} />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor={colors.textMuted}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputRow}>
          <Lock size={16} color={colors.textMuted} />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor={colors.textMuted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.signupPrompt}>
          Don't have an account?{' '}
          <Text style={styles.signupLink} onPress={() => navigation?.navigate?.('OwnerRegistration')}>
            Sign Up
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  body: { flex: 1, paddingHorizontal: 24, paddingTop: 90 },
  logoBox: { alignItems: 'center', marginBottom: 32 },
  logoIconBox: { width: 64, height: 64, borderRadius: 16, backgroundColor: colors.gold, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 22, fontWeight: '800', color: colors.navy },
  heroSubtitle: { fontSize: 13, color: colors.textMuted, marginTop: 4 },
  label: { fontSize: 13, fontWeight: '600', color: colors.slate, marginBottom: 8 },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.mist, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 4, marginBottom: 18, gap: 10 },
  input: { flex: 1, paddingVertical: 12, fontSize: 14, color: colors.navy },
  forgotPassword: { color: colors.royalBlue, fontSize: 13, fontWeight: '600', textAlign: 'right', marginBottom: 24 },
  loginButton: { backgroundColor: colors.navy, borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginBottom: 20 },
  loginButtonText: { color: colors.white, fontSize: 15, fontWeight: '700' },
  signupPrompt: { fontSize: 13, color: colors.textMuted, textAlign: 'center' },
  signupLink: { color: colors.gold, fontWeight: '700' },
});