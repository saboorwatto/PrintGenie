import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { ArrowLeft, CheckCircle2 } from 'lucide-react-native';
import { colors } from '../../theme/colors';

const priceBreakdown = [
  { label: 'Printing', price: 'PKR 850' },
  { label: 'Material', price: 'PKR 250' },
  { label: 'Finishing', price: 'PKR 100' },
  { label: 'Others', price: 'PKR 50' },
];

export default function QuoteResultScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack?.()}>
          <ArrowLeft size={18} color={colors.navy} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quote Result</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.priceCard}>
          <Text style={styles.priceLabel}>ESTIMATED PRICE</Text>
          <Text style={styles.priceValue}>PKR 1,250</Text>
          <Text style={styles.priceSubtitle}>for 100 Business Cards</Text>
        </View>

        <Text style={styles.sectionTitle}>Price Breakdown</Text>
        <View style={styles.breakdownList}>
          {priceBreakdown.map((item, i) => (
            <View
              key={item.label}
              style={[styles.breakdownRow, i !== priceBreakdown.length - 1 && styles.breakdownRowBorder]}
            >
              <Text style={styles.breakdownLabel}>{item.label}</Text>
              <Text style={styles.breakdownPrice}>{item.price}</Text>
            </View>
          ))}
          <View style={[styles.breakdownRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalPrice}>PKR 1,250</Text>
          </View>
        </View>

        <View style={styles.aiTip}>
          <CheckCircle2 size={16} color="#16A34A" />
          <Text style={styles.aiTipText}>AI suggested — high quality match at best price.</Text>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation?.navigate?.('ComparePresses')}
        >
          <Text style={styles.continueButtonText}>Compare Presses</Text>
        </TouchableOpacity>
      </ScrollView>
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
  body: { paddingHorizontal: 20, paddingBottom: 40 },
  priceCard: { backgroundColor: colors.navy, borderRadius: 16, alignItems: 'center', paddingVertical: 28, marginBottom: 24 },
  priceLabel: { color: colors.textMuted, fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  priceValue: { color: colors.gold, fontSize: 32, fontWeight: '800', marginTop: 8 },
  priceSubtitle: { color: colors.textMuted, fontSize: 12, marginTop: 6 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.navy, marginBottom: 10 },
  breakdownList: { backgroundColor: colors.mist, borderRadius: 16, overflow: 'hidden', marginBottom: 16 },
  breakdownRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 14, paddingHorizontal: 16 },
  breakdownRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border + '22' },
  breakdownLabel: { fontSize: 14, color: colors.slate },
  breakdownPrice: { fontSize: 14, fontWeight: '600', color: colors.navy },
  totalRow: { backgroundColor: colors.white },
  totalLabel: { fontSize: 15, fontWeight: '700', color: colors.navy },
  totalPrice: { fontSize: 16, fontWeight: '800', color: colors.navy },
  aiTip: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#DCFCE7',
    borderRadius: 12, padding: 12, marginBottom: 24, gap: 8,
  },
  aiTipText: { flex: 1, fontSize: 12, color: '#166534' },
  continueButton: { backgroundColor: colors.gold, borderRadius: 12, paddingVertical: 16, alignItems: 'center' },
  continueButtonText: { color: colors.navy, fontSize: 15, fontWeight: '700' },
});