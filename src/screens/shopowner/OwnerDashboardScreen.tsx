import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Bell, ChevronRight } from 'lucide-react-native';
import { colors } from '../../theme/colors';

const recentOrders = [
  { id: 'PG1234', customer: 'Ali Khan', status: 'In Production', color: '#2563EB', bg: '#DBEAFE' },
  { id: 'PG1198', customer: 'Sara Ahmed', status: 'Pending', color: '#D97706', bg: '#FEF3C7' },
  { id: 'PG1150', customer: 'Zainab R.', status: 'Completed', color: '#16A34A', bg: '#DCFCE7' },
  { id: 'PG1102', customer: 'Hassan M.', status: 'Shipped', color: '#2563EB', bg: '#DBEAFE' },
];

export default function OwnerDashboardScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.greeting}>Good Morning,{'\n'}Print Palace 👋</Text>
          <TouchableOpacity style={styles.bellButton}>
            <Bell size={18} color={colors.navy} />
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>48</Text>
            <Text style={styles.statLabel}>Total Orders</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>In Production</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>31</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.list}>
          {recentOrders.map((order, i) => (
            <TouchableOpacity
              key={order.id}
              style={[styles.orderRow, i !== recentOrders.length - 1 && styles.orderRowBorder]}
              onPress={() => navigation.navigate('Orders', { orderId: order.id })}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.orderId}>#{order.id}</Text>
                <Text style={styles.orderCustomer}>{order.customer}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: order.bg }]}>
                <Text style={[styles.statusText, { color: order.color }]}>{order.status}</Text>
              </View>
              <ChevronRight size={16} color={colors.textMuted} style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: 20, paddingTop: 50, paddingBottom: 40 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  greeting: { fontSize: 20, fontWeight: '700', color: colors.navy, lineHeight: 26 },
  bellButton: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.mist,
    alignItems: 'center', justifyContent: 'center',
  },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 24 },
  statBox: { flex: 1, backgroundColor: colors.mist, borderRadius: 12, padding: 10, alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: '800', color: colors.navy },
  statLabel: { fontSize: 10, color: colors.slate, marginTop: 4, textAlign: 'center' },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.navy },
  viewAll: { fontSize: 13, fontWeight: '600', color: colors.royalBlue },
  list: { backgroundColor: colors.mist, borderRadius: 16, overflow: 'hidden' },
  orderRow: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  orderRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border + '22' },
  orderId: { fontSize: 14, fontWeight: '700', color: colors.royalBlue },
  orderCustomer: { fontSize: 13, color: colors.slate, marginTop: 2 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  statusText: { fontSize: 10, fontWeight: '700' },
});