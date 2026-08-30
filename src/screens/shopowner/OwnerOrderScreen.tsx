import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { ChevronRight, ArrowLeft } from 'lucide-react-native';
import { colors } from '../../theme/colors';

const orders = [
  { id: 'PG1234', customer: 'Ali Khan', email: 'ali@gmail.com', phone: '0301-1234567', product: 'Business Cards', specs: 'Matte 300gsm, double-sided', qty: 100, totalAmount: 1250, status: 'production', paymentStatus: 'paid' },
  { id: 'PG1198', customer: 'Sara Ahmed', email: 'sara@gmail.com', phone: '0322-9876543', product: 'A3 Posters', specs: 'Glossy 250gsm', qty: 20, totalAmount: 1800, status: 'pending', paymentStatus: 'pending' },
  { id: 'PG1150', customer: 'Zainab R.', email: 'zainab@gmail.com', phone: '0333-4567890', product: 'Flyers A5', specs: 'Kraft paper', qty: 500, totalAmount: 3200, status: 'completed', paymentStatus: 'paid' },
];

const statusStyles: Record<string, { color: string; bg: string; label: string }> = {
  pending: { color: '#D97706', bg: '#FEF3C7', label: 'Pending' },
  production: { color: '#2563EB', bg: '#DBEAFE', label: 'In Production' },
  shipped: { color: '#7C3AED', bg: '#EDE9FE', label: 'Shipped' },
  completed: { color: '#16A34A', bg: '#DCFCE7', label: 'Completed' },
};

export default function OwnerOrdersScreen({ route }: any) {
  const [selectedId, setSelectedId] = useState<string | null>(route?.params?.orderId ?? null);

  useEffect(() => {
    if (route?.params?.orderId) {
      setSelectedId(route.params.orderId);
    }
  }, [route?.params?.orderId]);
  const selectedOrder = orders.find((o) => o.id === selectedId);

  if (selectedOrder) {
    return <OrderDetail order={selectedOrder} onBack={() => setSelectedId(null)} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerTitle}>Orders</Text>

        <View style={styles.list}>
          {orders.map((order, i) => {
            const statusInfo = statusStyles[order.status];
            return (
              <TouchableOpacity
                key={order.id}
                style={[styles.orderRow, i !== orders.length - 1 && styles.orderRowBorder]}
                onPress={() => setSelectedId(order.id)}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.orderId}>#{order.id}</Text>
                  <Text style={styles.orderCustomer}>{order.customer} · {order.product}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusInfo.bg }]}>
                  <Text style={[styles.statusText, { color: statusInfo.color }]}>{statusInfo.label}</Text>
                </View>
                <ChevronRight size={16} color={colors.textMuted} style={{ marginLeft: 6 }} />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

function OrderDetail({ order, onBack }: { order: typeof orders[0]; onBack: () => void }) {
  const [status, setStatus] = useState(order.status);
  const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus);

  const statuses = ['pending', 'production', 'shipped', 'completed'];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.detailHeaderRow}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <ArrowLeft size={18} color={colors.navy} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order #{order.id}</Text>
        </View>

        <View style={styles.customerCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{order.customer.charAt(0)}</Text>
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.customerName}>{order.customer}</Text>
            <Text style={styles.customerMeta}>{order.email}</Text>
            <Text style={styles.customerMeta}>{order.phone}</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>PRODUCT</Text>
        <View style={styles.productCard}>
          <Text style={styles.productName}>{order.product}</Text>
          <Text style={styles.productSpecs}>{order.specs}</Text>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>Quantity</Text>
            <Text style={styles.summaryValue}>{order.qty}</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>Total Amount</Text>
            <Text style={styles.summaryValue}>PKR {order.totalAmount.toLocaleString()}</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>UPDATE STATUS</Text>
        <View style={styles.statusPickerRow}>
          {statuses.map((s) => (
            <TouchableOpacity
              key={s}
              style={[styles.statusPill, status === s && { backgroundColor: statusStyles[s].bg }]}
              onPress={() => setStatus(s)}
            >
              <Text style={[styles.statusPillText, status === s && { color: statusStyles[s].color }]}>
                {statusStyles[s].label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.paymentRow}>
          <TouchableOpacity
            style={[styles.paymentPill, paymentStatus === 'pending' && styles.paymentPillPending]}
            onPress={() => setPaymentStatus('pending')}
          >
            <Text style={[styles.paymentPillText, paymentStatus === 'pending' && { color: '#92400E' }]}>
              Pending Payment
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.paymentPill, paymentStatus === 'paid' && styles.paymentPillPaid]}
            onPress={() => setPaymentStatus('paid')}
          >
            <Text style={[styles.paymentPillText, paymentStatus === 'paid' && { color: '#166534' }]}>
              Paid
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: 20, paddingTop: 50, paddingBottom: 40 },
  headerTitle: { fontSize: 22, fontWeight: '700', color: colors.navy, marginBottom: 16 },
  detailHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backButton: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: colors.mist,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  list: { backgroundColor: colors.mist, borderRadius: 16, overflow: 'hidden' },
  orderRow: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  orderRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border + '22' },
  orderId: { fontSize: 14, fontWeight: '700', color: colors.royalBlue },
  orderCustomer: { fontSize: 13, color: colors.slate, marginTop: 2 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  statusText: { fontSize: 10, fontWeight: '700' },
  customerCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.mist, borderRadius: 14, padding: 14, marginBottom: 16 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.royalBlue + '22', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 16, fontWeight: '700', color: colors.royalBlue },
  customerName: { fontSize: 14, fontWeight: '700', color: colors.navy },
  customerMeta: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  sectionLabel: { fontSize: 11, fontWeight: '700', color: colors.textMuted, letterSpacing: 0.5, marginBottom: 8 },
  productCard: { flexDirection: 'row', backgroundColor: colors.mist, borderRadius: 14, padding: 14, marginBottom: 16 },
  productName: { fontSize: 14, fontWeight: '700', color: colors.navy },
  productSpecs: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  summaryRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  summaryBox: { flex: 1, backgroundColor: colors.mist, borderRadius: 12, padding: 14 },
  summaryLabel: { fontSize: 12, color: colors.slate },
  summaryValue: { fontSize: 16, fontWeight: '700', color: colors.navy, marginTop: 4 },
  statusPickerRow: { marginBottom: 16 },
  statusPill: { backgroundColor: colors.mist, borderRadius: 12, padding: 14, marginBottom: 8 },
  statusPillText: { fontSize: 14, fontWeight: '600', color: colors.slate },
  paymentRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  paymentPill: { flex: 1, borderRadius: 20, paddingVertical: 10, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  paymentPillPending: { backgroundColor: '#FEF3C7', borderColor: '#FDE68A' },
  paymentPillPaid: { backgroundColor: '#DCFCE7', borderColor: '#BBF7D0' },
  paymentPillText: { fontSize: 12, fontWeight: '700', color: colors.slate },
  saveButton: { backgroundColor: colors.gold, borderRadius: 12, paddingVertical: 16, alignItems: 'center' },
  saveButtonText: { color: colors.navy, fontSize: 15, fontWeight: '700' },
});