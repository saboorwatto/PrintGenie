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
  Alert,
} from 'react-native';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import PrintGenieLogo from '../../components/PrintGenieLogo';
import { login } from '../../api/authApi';
import { setToken } from '../../api/authToken';



export default function AuthLoginScreen({ navigation, route }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const selectedRole = route?.params?.role;

  const handleLogin = async () => {
    setLoading(true);
    try {
            const response = await login(email, password);
      setToken(response.token);

      const actualRole = response.user?.role; // trust the server, not the button tapped earlier

      if (actualRole === 'customer') {
        navigation?.reset?.({ index: 0, routes: [{ name: 'Customer' }] });
      } else if (actualRole === 'admin') {
        navigation?.reset?.({ index: 0, routes: [{ name: 'Main' }] });
      } else if (actualRole === 'shopOwner') {
        navigation?.reset?.({ index: 0, routes: [{ name: 'ShopOwner' }] });
      } else {
        Alert.alert('Login failed', 'Unrecognized account role.');
      }
    } catch (err) {
      Alert.alert('Login failed', 'Check your email and password, or try again.');
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
        <PrintGenieLogo size="small" style={styles.logo} />

        <Text style={styles.welcomeLabel}>WELCOME BACK</Text>
        <Text style={styles.heroTitle}>Welcome Back! 👋</Text>
        <Text style={styles.heroSubtitle}>Login to continue to your PrintGenie account.</Text>

        <Text style={styles.label}>Email Address</Text>
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

        <TouchableOpacity onPress={() => navigation.navigate('ResetPassword', { role: route?.params?.role ?? 'customer' })}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.signupPrompt}>
          Don't have an account?{' '}
          <Text style={styles.signupLink} onPress={() => navigation?.navigate?.('ChooseRole')}>
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
  logo: { marginBottom: 24, alignSelf: 'flex-start' },
  welcomeLabel: { color: colors.royalBlue, fontSize: 12, fontWeight: '700', letterSpacing: 1, marginBottom: 6 },
  heroTitle: { color: colors.navy, fontSize: 26, fontWeight: '800' },
  heroSubtitle: { color: colors.textMuted, fontSize: 13, marginTop: 6, marginBottom: 28 },
  label: { fontSize: 13, fontWeight: '600', color: colors.slate, marginBottom: 8 },
  inputRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.mist,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 4, marginBottom: 18, gap: 10,
  },
  input: { flex: 1, paddingVertical: 12, fontSize: 14, color: colors.navy },
  forgotPassword: { color: colors.royalBlue, fontSize: 13, fontWeight: '600', textAlign: 'right', marginBottom: 24 },
  loginButton: { backgroundColor: colors.navy, borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginBottom: 20 },
  loginButtonText: { color: colors.white, fontSize: 15, fontWeight: '700' },
  signupPrompt: { fontSize: 13, color: colors.textMuted, textAlign: 'center' },
  signupLink: { color: colors.royalBlue, fontWeight: '700' },
});