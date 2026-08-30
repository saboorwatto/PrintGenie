import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { User, Upload, ChevronRight, LogOut } from 'lucide-react-native';
import { colors } from '../../theme/colors';

const menuItems = [
  { icon: User, label: 'Profile', description: 'Shop and owner details', route: 'OwnerProfile' },
  { icon: Upload, label: 'Design Proof Upload', description: 'Share previews with customers', route: 'OwnerDesignProof' },
];

export default function OwnerMoreScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerTitle}>More</Text>

        <View style={styles.list}>
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={item.label}
                style={[styles.row, i !== menuItems.length - 1 && styles.rowBorder]}
                onPress={() => navigation.getParent()?.navigate(item.route)}
              >
                <Icon size={20} color={colors.royalBlue} />
                <View style={{ flex: 1, marginLeft: 14 }}>
                  <Text style={styles.rowLabel}>{item.label}</Text>
                  <Text style={styles.rowDescription}>{item.description}</Text>
                </View>
                <ChevronRight size={16} color={colors.textMuted} />
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.getParent()?.getParent()?.reset({ index: 0, routes: [{ name: 'Auth' }] })}
        >
          <LogOut size={16} color="#DC2626" />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: 20, paddingTop: 50, paddingBottom: 40 },
  headerTitle: { fontSize: 22, fontWeight: '700', color: colors.navy, marginBottom: 16 },
  list: { backgroundColor: colors.mist, borderRadius: 16, overflow: 'hidden', marginBottom: 16 },
  row: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border + '22' },
  rowLabel: { fontSize: 14, fontWeight: '700', color: colors.navy },
  rowDescription: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  logoutButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border,
    borderRadius: 16, paddingVertical: 16,
  },
  logoutText: { fontSize: 14, fontWeight: '700', color: '#DC2626' },
});