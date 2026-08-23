import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { ArrowLeft, ShieldCheck, Smartphone } from 'lucide-react-native';
import { colors } from '../../theme/colors';

const gateways = [
  { id: 'jazzcash', name: 'JazzCash', subtitle: 'Pay via JazzCash mobile account' },
  { id: 'easypaisa', name: 'EasyPaisa', subtitle: 'Pay via EasyPaisa OTP / M-PIN' },
];

export default function PaymentScreen({ navigation }: any) {
  const [selected, setSelected] = useState('jazzcash');

  const handlePay = () => {
    // TODO: wire up to POST /api/orders then selected gateway API from the SDS
    navigation?.navigate?.('OrderTracking');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack?.()}>
          <ArrowLeft size={18} color={colors.navy} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Secure Payment</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>AMOUNT TO PAY</Text>
          <Text style={styles.amountValue}>PKR 1,250</Text>
          <Text style={styles.amountSubtitle}>ColorMax Press · 100 Business Cards</Text>
        </View>

        <Text style={styles.sectionTitle}>Choose Payment Method</Text>
        <View style={styles.gatewayList}>
          {gateways.map((gw) => (
            <TouchableOpacity
              key={gw.id}
              style={[styles.gatewayRow, selected === gw.id && styles.gatewayRowSelected]}
              onPress={() => setSelected(gw.id)}
            >
              <View style={styles.gatewayIconBox}>
                <Smartphone size={18} color={colors.royalBlue} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.gatewayName}>{gw.name}</Text>
                <Text style={styles.gatewaySubtitle}>{gw.subtitle}</Text>
              </View>
              <View style={[styles.radio, selected === gw.id && styles.radioSelected]} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.secureNote}>
          <ShieldCheck size={14} color="#16A34A" />
          <Text style={styles.secureNoteText}>Payments are encrypted and processed securely</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.payButton} onPress={handlePay}>
          <Text style={styles.payButtonText}>Pay PKR 1,250</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingTop: 50, paddingHorizontal: 20, paddingBottom: 16 },
  backButton: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: colors.mist,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.navy },
  body: { flex: 1, paddingHorizontal: 20 },
  amountCard: { backgroundColor: colors.navy, borderRadius: 16, alignItems: 'center', paddingVertical: 24, marginBottom: 24 },
  amountLabel: { color: colors.textMuted, fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  amountValue: { color: colors.gold, fontSize: 28, fontWeight: '800', marginTop: 8 },
  amountSubtitle: { color: colors.textMuted, fontSize: 12, marginTop: 6 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: colors.navy, marginBottom: 12 },
  gatewayList: { marginBottom: 20 },
  gatewayRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.mist,
    borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1.5, borderColor: 'transparent',
  },
  gatewayRowSelected: { borderColor: colors.royalBlue },
  gatewayIconBox: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: colors.white,
    alignItems: 'center', justifyContent: 'center',
  },
  gatewayName: { fontSize: 14, fontWeight: '700', color: colors.navy },
  gatewaySubtitle: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: colors.border },
  radioSelected: { borderColor: colors.royalBlue, backgroundColor: colors.royalBlue },
  secureNote: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  secureNoteText: { fontSize: 11, color: colors.textMuted },
  footer: { paddingHorizontal: 20, paddingBottom: 24, paddingTop: 8 },
  payButton: { backgroundColor: colors.gold, borderRadius: 12, paddingVertical: 16, alignItems: 'center' },
  payButtonText: { color: colors.navy, fontSize: 15, fontWeight: '700' },
});