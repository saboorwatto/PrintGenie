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
import { ArrowLeft, Mail, Lock, User, Phone } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { register } from '../../api/authApi';

export default function SignUpScreen({ navigation, route }: any) {
  const role = route?.params?.role;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Missing info', 'Please fill in your name, email, and password.');
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password, phone, role);
      Alert.alert('Account created', 'You can now log in with your new account.', [
        { text: 'OK', onPress: () => navigation?.navigate?.('AuthLogin', { role }) },
      ]);
    } catch (err) {
      Alert.alert('Sign up failed', 'That email may already be registered, or something went wrong.');
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
        <View style={styles.inputRow}>
          <User size={16} color={colors.textMuted} />
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor={colors.textMuted}
            value={name}
            onChangeText={setName}
          />
        </View>

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
        <View style={styles.inputRow}>
          <Lock size={16} color={colors.textMuted} />
          <TextInput
            style={styles.input}
            placeholder="Create a password"
            placeholderTextColor={colors.textMuted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

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
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 4, marginBottom: 16, gap: 10,
  },
  input: { flex: 1, paddingVertical: 12, fontSize: 14, color: colors.navy },
  signUpButton: { backgroundColor: colors.navy, borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 8, marginBottom: 20 },
  signUpButtonText: { color: colors.white, fontSize: 15, fontWeight: '700' },
  loginPrompt: { fontSize: 13, color: colors.textMuted, textAlign: 'center' },
  loginLink: { color: colors.royalBlue, fontWeight: '700' },
});