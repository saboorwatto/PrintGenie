import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from 'react-native';
import {
  X, LayoutGrid, ClipboardList, FolderOpen, MapPin,
  CreditCard, Settings, HelpCircle, ChevronRight, LogOut,
} from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { Heart } from 'lucide-react-native';

const menuItems = [
  { icon: LayoutGrid, label: 'Dashboard' },
  { icon: ClipboardList, label: 'My Orders' },
  { icon: FolderOpen, label: 'My Designs' },
  { icon: Heart, label: 'Favorite Shops' },
  { icon: MapPin, label: 'Addresses' },
  { icon: CreditCard, label: 'Payment Methods' },
  { icon: Settings, label: 'Settings' },
  { icon: HelpCircle, label: 'Support' },
];

export default function ProfileMenuScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.navy} />

      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>AH</Text>
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.userName}>Ali Hassan</Text>
          <Text style={styles.userRole}>Customer Account</Text>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation?.goBack?.()}>
          <X size={18} color={colors.white} />
        </TouchableOpacity>
      </View>

            <ScrollView style={styles.menuSheet} contentContainerStyle={{ paddingVertical: 8 }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <TouchableOpacity key={item.label} style={styles.menuRow}>
              <View style={styles.menuIconBox}>
                <Icon size={18} color={colors.royalBlue} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <ChevronRight size={18} color={colors.textMuted} />
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={styles.logoutRow}
          onPress={() => navigation.getParent()?.reset({ index: 0, routes: [{ name: 'Auth' }] })}
        >
          <View style={styles.logoutIconBox}>
            <LogOut size={18} color="#DC2626" />
          </View>
          <Text style={styles.logoutLabel}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navy },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: 50, paddingHorizontal: 20, paddingBottom: 20 },
  avatar: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: colors.gold,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: colors.navy, fontSize: 16, fontWeight: '800' },
  userName: { color: colors.white, fontSize: 16, fontWeight: '700' },
  userRole: { color: colors.royalBlue, fontSize: 12, marginTop: 2 },
  closeButton: {
    width: 34, height: 34, borderRadius: 17, backgroundColor: colors.white + '15',
    alignItems: 'center', justifyContent: 'center',
  },
  menuSheet: { flex: 1, backgroundColor: colors.white, borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 16 },
  menuRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: colors.border + '15',
  },
  menuIconBox: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: colors.mist,
    alignItems: 'center', justifyContent: 'center', marginRight: 14,
  },
  menuLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: colors.navy },
    logoutRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 14, marginTop: 8,
  },
  logoutIconBox: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: '#FEE2E2',
    alignItems: 'center', justifyContent: 'center', marginRight: 14,
  },
  logoutLabel: { fontSize: 14, fontWeight: '700', color: '#DC2626' },
});