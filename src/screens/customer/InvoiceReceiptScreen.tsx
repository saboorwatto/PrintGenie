import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { ArrowLeft, Download, CheckCircle2 } from 'lucide-react-native';
import { colors } from '../../theme/colors';

const lineItems = [
  { label: 'Business Cards Printing (100 pcs)', price: 'PKR 850' },
  { label: 'Matte 300gsm Material', price: 'PKR 250' },
  { label: 'UV Coating Finishing', price: 'PKR 100' },
  { label: 'Platform Service Fee', price: 'PKR 50' },
];

export default function InvoiceReceiptScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack?.()}>
          <ArrowLeft size={18} color={colors.navy} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Invoice & Receipt</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.paidBanner}>
          <CheckCircle2 size={18} color="#16A34A" />
          <Text style={styles.paidText}>Payment Confirmed</Text>
        </View>

        <View style={styles.invoiceCard}>
          <View style={styles.invoiceHeaderRow}>
            <Text style={styles.invoiceLabel}>INVOICE</Text>
            <Text style={styles.invoiceNumber}>#INV-PG1234</Text>
          </View>
          <Text style={styles.invoiceDate}>Issued 15 May 2026</Text>

          <View style={styles.divider} />

          {lineItems.map((item, i) => (
            <View key={item.label} style={styles.lineRow}>
              <Text style={styles.lineLabel}>{item.label}</Text>
              <Text style={styles.linePrice}>{item.price}</Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Paid</Text>
            <Text style={styles.totalValue}>PKR 1,250</Text>
          </View>
          <Text style={styles.paymentMethod}>Paid via JazzCash · Transaction #JZ98213</Text>
        </View>

        <TouchableOpacity style={styles.downloadButton}>
          <Download size={16} color={colors.navy} />
          <Text style={styles.downloadButtonText}>Download PDF Receipt</Text>
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
  paidBanner: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#DCFCE7',
    borderRadius: 12, padding: 12, marginBottom: 16, gap: 8,
  },
  paidText: { fontSize: 13, fontWeight: '700', color: '#166534' },
  invoiceCard: { backgroundColor: colors.mist, borderRadius: 16, padding: 18, marginBottom: 20 },
  invoiceHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  invoiceLabel: { fontSize: 12, fontWeight: '700', color: colors.textMuted, letterSpacing: 1 },
  invoiceNumber: { fontSize: 13, fontWeight: '700', color: colors.navy },
  invoiceDate: { fontSize: 12, color: colors.textMuted, marginTop: 4 },
  divider: { height: 1, backgroundColor: colors.border + '33', marginVertical: 14 },
  lineRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  lineLabel: { flex: 1, fontSize: 13, color: colors.slate, marginRight: 8 },
  linePrice: { fontSize: 13, fontWeight: '600', color: colors.navy },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  totalLabel: { fontSize: 15, fontWeight: '700', color: colors.navy },
  totalValue: { fontSize: 17, fontWeight: '800', color: colors.navy },
  paymentMethod: { fontSize: 11, color: colors.textMuted },
  downloadButton: {
    flexDirection: 'row', backgroundColor: colors.gold, borderRadius: 12,
    paddingVertical: 15, alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  downloadButtonText: { color: colors.navy, fontSize: 15, fontWeight: '700' },
});