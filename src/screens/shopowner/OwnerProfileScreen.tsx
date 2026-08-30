import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { colors } from '../../theme/colors';

export default function OwnerProfileScreen({ navigation }: any) {
  const [shopName, setShopName] = useState('Print Palace');
  const [ownerName, setOwnerName] = useState('Ahmed Raza');
  const [email, setEmail] = useState('ahmed@printpalace.com');
  const [phone, setPhone] = useState('0301-1234567');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // TODO: wire up to PUT /api/shops/:id from the SDS
    setSaved(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack?.()}>
            <ArrowLeft size={18} color={colors.navy} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Shop name</Text>
          <TextInput style={styles.input} value={shopName} onChangeText={(v) => { setShopName(v); setSaved(false); }} />

          <Text style={styles.label}>Owner name</Text>
          <TextInput style={styles.input} value={ownerName} onChangeText={(v) => { setOwnerName(v); setSaved(false); }} />

          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value={email} onChangeText={(v) => { setEmail(v); setSaved(false); }} autoCapitalize="none" keyboardType="email-address" />

          <Text style={styles.label}>Phone number</Text>
          <TextInput style={styles.input} value={phone} onChangeText={(v) => { setPhone(v); setSaved(false); }} keyboardType="phone-pad" />

          <View style={styles.saveRow}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save changes</Text>
            </TouchableOpacity>
            {saved && <Text style={styles.savedText}>Saved</Text>}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: 20, paddingTop: 50, paddingBottom: 40 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.mist, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.navy },
  card: { backgroundColor: colors.mist, borderRadius: 16, padding: 18 },
  label: { fontSize: 13, fontWeight: '600', color: colors.slate, marginBottom: 8 },
  input: { backgroundColor: colors.white, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: colors.navy, marginBottom: 16 },
  saveRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 4 },
  saveButton: { backgroundColor: colors.navy, borderRadius: 10, paddingHorizontal: 20, paddingVertical: 12 },
  saveButtonText: { color: colors.white, fontSize: 13, fontWeight: '700' },
  savedText: { fontSize: 13, fontWeight: '600', color: '#16A34A' },
});