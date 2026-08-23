import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { ArrowLeft, Package, Receipt, Star, MessageSquareWarning, ChevronRight } from 'lucide-react-native';
import { colors } from '../../theme/colors';

export default function OrderDetailScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack?.()}>
          <ArrowLeft size={18} color={colors.navy} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.orderCard}>
          <View style={styles.orderIconBox}>
            <Package size={18} color={colors.royalBlue} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.orderId}>ORDER #PG1234</Text>
            <Text style={styles.orderTitle}>Business Cards</Text>
            <Text style={styles.orderSubtitle}>100 Pcs · Matte Finish · Delivered</Text>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Paid</Text>
            <Text style={styles.summaryValue}>PKR 1,250</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Delivered On</Text>
            <Text style={styles.summaryValue}>20 May 2026</Text>
          </View>
        </View>

        <View style={styles.actionsList}>
          <TouchableOpacity
            style={[styles.actionRow, styles.actionRowBorder]}
            onPress={() => navigation?.navigate?.('InvoiceReceipt')}
          >
            <View style={styles.actionIconBox}>
              <Receipt size={18} color={colors.royalBlue} />
            </View>
            <Text style={styles.actionLabel}>View Invoice & Receipt</Text>
            <ChevronRight size={16} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionRow, styles.actionRowBorder]}
            onPress={() => navigation?.navigate?.('RatingReview')}
          >
            <View style={styles.actionIconBox}>
              <Star size={18} color={colors.gold} />
            </View>
            <Text style={styles.actionLabel}>Rate & Review this Order</Text>
            <ChevronRight size={16} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => navigation?.navigate?.('ComplaintRefund')}
          >
            <View style={styles.actionIconBox}>
              <MessageSquareWarning size={18} color="#DC2626" />
            </View>
            <Text style={styles.actionLabel}>Report a Problem / Request Refund</Text>
            <ChevronRight size={16} color={colors.textMuted} />
          </TouchableOpacity>
        </View>
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
  orderCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.mist,
    borderRadius: 16, padding: 14, marginBottom: 12,
  },
  orderIconBox: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: colors.white,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  orderId: { fontSize: 11, fontWeight: '700', color: colors.textMuted, letterSpacing: 0.5 },
  orderTitle: { fontSize: 15, fontWeight: '700', color: colors.navy, marginTop: 2 },
  orderSubtitle: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  summaryRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  summaryItem: { flex: 1, backgroundColor: colors.mist, borderRadius: 12, padding: 14 },
  summaryLabel: { fontSize: 12, color: colors.slate },
  summaryValue: { fontSize: 16, fontWeight: '700', color: colors.navy, marginTop: 4 },
  actionsList: { backgroundColor: colors.mist, borderRadius: 16, overflow: 'hidden' },
  actionRow: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  actionRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border + '22' },
  actionIconBox: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: colors.white,
    alignItems: 'center', justifyContent: 'center',
  },
  actionLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: colors.navy },
});