import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { colors } from '../../theme/colors';

const transactions = [
  { id: 'PG1234', customer: 'Ali Khan', amount: 1250, status: 'paid' },
  { id: 'PG1198', customer: 'Sara Ahmed', amount: 1800, status: 'pending' },
  { id: 'PG1150', customer: 'Zainab R.', amount: 3200, status: 'paid' },
  { id: 'PG1102', customer: 'Hassan M.', amount: 950, status: 'paid' },
];

export default function OwnerEarningsScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerTitle}>Earnings</Text>

        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total earnings</Text>
          <Text style={styles.totalValue}>PKR 48,650</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>This month</Text>
            <Text style={styles.statValue}>PKR 12,400</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Pending payments</Text>
            <Text style={[styles.statValue, { color: '#D97706' }]}>PKR 1,800</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <View style={styles.list}>
          {transactions.map((t, i) => (
            <View key={t.id} style={[styles.txRow, i !== transactions.length - 1 && styles.txRowBorder]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.txId}>#{t.id}</Text>
                <Text style={styles.txCustomer}>{t.customer} · PKR {t.amount.toLocaleString()}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: t.status === 'paid' ? '#DCFCE7' : '#FEF3C7' }]}>
                <Text style={[styles.statusText, { color: t.status === 'paid' ? '#16A34A' : '#D97706' }]}>
                  {t.status === 'paid' ? 'Paid' : 'Pending'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: 20, paddingTop: 50, paddingBottom: 40 },
  headerTitle: { fontSize: 22, fontWeight: '700', color: colors.navy, marginBottom: 16 },
  totalCard: { backgroundColor: colors.navy, borderRadius: 16, padding: 18, marginBottom: 12 },
  totalLabel: { color: colors.textMuted, fontSize: 12 },
  totalValue: { color: colors.white, fontSize: 28, fontWeight: '800', marginTop: 6 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  statBox: { flex: 1, backgroundColor: colors.mist, borderRadius: 12, padding: 14 },
  statLabel: { fontSize: 12, color: colors.slate },
  statValue: { fontSize: 16, fontWeight: '700', color: colors.navy, marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.navy, marginBottom: 10 },
  list: { backgroundColor: colors.mist, borderRadius: 16, overflow: 'hidden' },
  txRow: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  txRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border + '22' },
  txId: { fontSize: 13, fontWeight: '700', color: colors.royalBlue },
  txCustomer: { fontSize: 12, color: colors.slate, marginTop: 2 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  statusText: { fontSize: 10, fontWeight: '700' },
});