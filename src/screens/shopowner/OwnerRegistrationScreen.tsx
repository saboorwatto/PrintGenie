import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { UploadCloud, Check } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import PrintGenieLogo from '../../components/PrintGenieLogo';

const CITIES = ['Lahore', 'Karachi', 'Islamabad', 'Faisalabad', 'Rawalpindi', 'Multan'];

export default function OwnerRegistrationScreen({ navigation }: any) {
  const [shopName, setShopName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState(CITIES[0]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // TODO: wire up to POST /api/shops/register from the SDS
    if (!shopName || !ownerName || !address || !email || !phone || !password || !agreed) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <View style={styles.confirmContainer}>
        <PrintGenieLogo size="small" style={styles.confirmLogo} />
        <View style={styles.confirmIconCircle}>
          <Check size={28} color="#16A34A" />
        </View>
        <Text style={styles.confirmTitle}>Registration submitted</Text>
        <Text style={styles.confirmSubtitle}>
          {shopName} is pending verification. We'll notify you within 24 hours once your shop is approved to go live.
        </Text>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => navigation?.navigate?.('OwnerLogin')}
        >
          <Text style={styles.confirmButtonText}>Go to login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.logoRow}>
          <PrintGenieLogo size="small" style={styles.logo} />
          <View>
            <Text style={styles.heroTitle}>Print Shop Registration</Text>
            <Text style={styles.heroSubtitle}>Get listed on PrintGenie</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>SHOP DETAILS</Text>
        <TextInput style={styles.input} placeholder="Shop name (e.g. Al-Noor Printers)" placeholderTextColor={colors.textMuted} value={shopName} onChangeText={setShopName} />
        <TextInput style={styles.input} placeholder="Shop address" placeholderTextColor={colors.textMuted} value={address} onChangeText={setAddress} />

        <View style={styles.cityRow}>
          {CITIES.map((c) => (
            <TouchableOpacity
              key={c}
              style={[styles.cityPill, city === c && styles.cityPillSelected]}
              onPress={() => setCity(c)}
            >
              <Text style={[styles.cityPillText, city === c && styles.cityPillTextSelected]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionLabel}>OWNER DETAILS</Text>
        <TextInput style={styles.input} placeholder="Owner name" placeholderTextColor={colors.textMuted} value={ownerName} onChangeText={setOwnerName} />
        <TextInput style={styles.input} placeholder="owner@yourshop.com" placeholderTextColor={colors.textMuted} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="03XX XXXXXXX" placeholderTextColor={colors.textMuted} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <TextInput style={styles.input} placeholder="Password (at least 6 characters)" placeholderTextColor={colors.textMuted} value={password} onChangeText={setPassword} secureTextEntry />

        <TouchableOpacity style={styles.uploadBox}>
          <UploadCloud size={20} color={colors.royalBlue} />
          <Text style={styles.uploadText}>Upload CNIC or business license</Text>
          <Text style={styles.uploadHint}>Speeds up verification — PDF, PNG or JPG</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.agreeRow} onPress={() => setAgreed(!agreed)}>
          <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
            {agreed && <Check size={12} color={colors.white} />}
          </View>
          <Text style={styles.agreeText}>I confirm this shop's details are accurate and agree to PrintGenie's vendor terms.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit for verification</Text>
        </TouchableOpacity>

        <Text style={styles.loginPrompt}>
          Already registered?{' '}
          <Text style={styles.loginLink} onPress={() => navigation?.navigate?.('OwnerLogin')}>
            Log in
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: 24, paddingTop: 50, paddingBottom: 40 },
  logoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, gap: 12 },
  logo: { width: 100, height: 40 },
  heroTitle: { fontSize: 18, fontWeight: '800', color: colors.navy },
  heroSubtitle: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  sectionLabel: { fontSize: 11, fontWeight: '700', color: colors.textMuted, letterSpacing: 0.5, marginBottom: 10, marginTop: 8 },
  input: { backgroundColor: colors.mist, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13, fontSize: 14, color: colors.navy, marginBottom: 12 },
  cityRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  cityPill: { backgroundColor: colors.mist, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 8 },
  cityPillSelected: { backgroundColor: colors.royalBlue },
  cityPillText: { fontSize: 12, fontWeight: '600', color: colors.slate },
  cityPillTextSelected: { color: colors.white },
  uploadBox: {
    borderWidth: 1.5, borderColor: colors.border, borderStyle: 'dashed', borderRadius: 12,
    alignItems: 'center', paddingVertical: 20, marginBottom: 16, marginTop: 4,
  },
  uploadText: { fontSize: 13, fontWeight: '600', color: colors.royalBlue, marginTop: 8 },
  uploadHint: { fontSize: 11, color: colors.textMuted, marginTop: 4 },
  agreeRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 20 },
  checkbox: { width: 18, height: 18, borderRadius: 4, borderWidth: 1.5, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  checkboxChecked: { backgroundColor: colors.royalBlue, borderColor: colors.royalBlue },
  agreeText: { flex: 1, fontSize: 12, color: colors.slate, lineHeight: 17 },
  submitButton: { backgroundColor: colors.navy, borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginBottom: 16 },
  submitButtonText: { color: colors.white, fontSize: 15, fontWeight: '700' },
  loginPrompt: { fontSize: 13, color: colors.textMuted, textAlign: 'center' },
  loginLink: { color: colors.gold, fontWeight: '700' },
  confirmContainer: { flex: 1, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  confirmLogo: { marginBottom: 24 },
  confirmIconCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#DCFCE7', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  confirmTitle: { fontSize: 17, fontWeight: '700', color: colors.navy, marginBottom: 8 },
  confirmSubtitle: { fontSize: 13, color: colors.textMuted, textAlign: 'center', lineHeight: 19, marginBottom: 24 },
  confirmButton: { backgroundColor: colors.gold, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 14 },
  confirmButtonText: { color: colors.navy, fontSize: 14, fontWeight: '700' },
});