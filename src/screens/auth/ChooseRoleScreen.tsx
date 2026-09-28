import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { ArrowLeft, ShoppingCart, Store, Cog, LogIn } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import PrintGenieLogo from '../../components/PrintGenieLogo';

const roles = [
  { id: 'customer', icon: ShoppingCart, title: 'Customer', subtitle: 'I want to place orders' },
  { id: 'shopowner', icon: Store, title: 'Print Shop Owner', subtitle: 'I want to manage my shop' },
  { id: 'admin', icon: Cog, title: 'Admin', subtitle: 'I want to manage platform' },
];

export default function ChooseRoleScreen({ navigation }: any) {
  const [selected, setSelected] = useState('customer');
  
  const handleContinue = () => {
    navigation?.navigate?.('AuthLogin', { role: selected });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <ArrowLeft size={18} color={colors.navy} />
      </TouchableOpacity>

      <PrintGenieLogo size="small" style={styles.logo} />

      <Text style={styles.headerLabel}>CHOOSE YOUR ROLE</Text>
      <Text style={styles.headerTitle}>How will you use PrintGenie?</Text>
      <Text style={styles.headerSubtitle}>Pick the account type that fits you best.</Text>

      <View style={styles.roleList}>
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selected === role.id;
          return (
            <TouchableOpacity
              key={role.id}
              style={[styles.roleCard, isSelected && styles.roleCardSelected]}
              onPress={() => setSelected(role.id)}
            >
              <View style={[styles.roleIconBox, isSelected && styles.roleIconBoxSelected]}>
                <Icon size={20} color={isSelected ? colors.white : colors.royalBlue} />
              </View>
              <View style={styles.roleTextBox}>
                <Text style={[styles.roleTitle, isSelected && styles.roleTitleSelected]}>{role.title}</Text>
                <Text style={styles.roleSubtitle}>{role.subtitle}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
                <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, paddingHorizontal: 24, paddingTop: 50, paddingBottom: 40 },
  backButton: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: colors.mist,
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  logo: { marginBottom: 20, alignSelf: 'flex-start' },
  headerLabel: { color: colors.royalBlue, fontSize: 12, fontWeight: '700', letterSpacing: 1, marginBottom: 6 },
  headerTitle: { color: colors.navy, fontSize: 24, fontWeight: '800', marginBottom: 8 },
  headerSubtitle: { color: colors.textMuted, fontSize: 13, marginBottom: 24 },
  roleList: { gap: 12, marginBottom: 32 },
  roleCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.mist,
    borderRadius: 14, padding: 16, borderWidth: 2, borderColor: 'transparent',
  },
  roleCardSelected: { borderColor: colors.royalBlue, backgroundColor: colors.royalBlue + '10' },
  roleIconBox: {
    width: 44, height: 44, borderRadius: 12, backgroundColor: colors.white,
    alignItems: 'center', justifyContent: 'center', marginRight: 14,
  },
  roleIconBoxSelected: { backgroundColor: colors.royalBlue },
  roleTextBox: { flex: 1 },
  roleTitle: { fontSize: 15, fontWeight: '700', color: colors.navy },
  roleTitleSelected: { color: colors.royalBlue },
  roleSubtitle: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  continueButton: { backgroundColor: colors.navy, borderRadius: 14, paddingVertical: 17, alignItems: 'center' },
  continueButtonText: { color: colors.white, fontSize: 16, fontWeight: '700' },
    signInButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 14, marginTop: 12},
  signInButtonText: { color: colors.royalBlue, fontSize: 14, fontWeight: '600' },
});
