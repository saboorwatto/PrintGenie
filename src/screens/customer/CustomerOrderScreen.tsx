import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Package, ChevronRight } from 'lucide-react-native';
import { colors } from '../../theme/colors';

const orders = [
  { id: 'PG1234', title: 'Business Cards', qty: '100 Pcs', status: 'In Production', color: '#2563EB', bg: '#DBEAFE' },
  { id: 'PG1198', title: 'Flyers A5', qty: '500 Pcs', status: 'Delivered', color: '#16A34A', bg: '#DCFCE7' },
  { id: 'PG1150', title: 'Brochures Tri-fold', qty: '200 Pcs', status: 'Delivered', color: '#16A34A', bg: '#DCFCE7' },
  { id: 'PG1102', title: 'Banners', qty: '5 Pcs', status: 'Cancelled', color: '#DC2626', bg: '#FEE2E2' },
];

export default function CustomerOrdersScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerTitle}>My Orders</Text>

        <View style={styles.list}>
          {orders.map((order, i) => (
            <TouchableOpacity
              key={order.id}
              style={[styles.orderRow, i !== orders.length - 1 && styles.orderRowBorder]}
              onPress={() => navigation?.navigate?.('OrderDetail')}
            >
              <View style={styles.orderIconBox}>
                <Package size={18} color={colors.royalBlue} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.orderTitle}>{order.title}</Text>
                <Text style={styles.orderMeta}>#{order.id} · {order.qty}</Text>
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
  headerTitle: { fontSize: 24, fontWeight: '700', color: colors.navy, marginBottom: 16 },
  list: { backgroundColor: colors.mist, borderRadius: 16, overflow: 'hidden' },
  orderRow: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  orderRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border + '22' },
  orderIconBox: {
    width: 38, height: 38, borderRadius: 10, backgroundColor: colors.white,
    alignItems: 'center', justifyContent: 'center',
  },
  orderTitle: { fontSize: 14, fontWeight: '600', color: colors.navy },
  orderMeta: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  statusText: { fontSize: 10, fontWeight: '700' },
});