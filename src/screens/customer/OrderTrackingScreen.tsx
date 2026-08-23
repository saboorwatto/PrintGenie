import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { ArrowLeft, Package, CheckCircle2, Truck } from 'lucide-react-native';
import { colors } from '../../theme/colors';

const trackingSteps = [
  { title: 'Order Placed', time: '15 May 2026, 10:30 AM', done: true },
  { title: 'Paid', time: '15 May 2026, 9:00 AM', done: true },
  { title: 'In Production', time: '16 May 2026, 9:00 AM', done: false, current: true },
];

export default function OrderTrackingScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack?.()}>
          <ArrowLeft size={18} color={colors.navy} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Tracking</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.orderCard}>
          <View style={styles.orderIconBox}>
            <Package size={18} color={colors.royalBlue} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.orderId}>ORDER #PG1234</Text>
            <Text style={styles.orderTitle}>Business Cards</Text>
            <Text style={styles.orderSubtitle}>100 Pcs · Matte Finish</Text>
          </View>
        </View>

        <View style={styles.statusRow}>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Placed on</Text>
            <Text style={styles.statusValue}>15 May 2026</Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Status</Text>
            <Text style={styles.statusValue}>In Production</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Tracking Progress</Text>
        <View style={styles.timeline}>
          {trackingSteps.map((step, i) => (
            <View key={step.title} style={styles.timelineRow}>
              <View style={styles.timelineLeft}>
                <View
                  style={[
                    styles.timelineDot,
                    step.done && styles.timelineDotDone,
                    step.current && styles.timelineDotCurrent,
                  ]}
                >
                  {step.done ? (
                    <CheckCircle2 size={14} color={colors.white} />
                  ) : (
                    <Text style={styles.timelineDotNumber}>{i + 1}</Text>
                  )}
                </View>
                {i !== trackingSteps.length - 1 && <View style={styles.timelineLine} />}
              </View>
              <View style={{ flex: 1, paddingBottom: 20 }}>
                <Text style={styles.timelineTitle}>{step.title}</Text>
                <Text style={styles.timelineTime}>{step.time}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.deliveryCard}>
          <View style={styles.deliveryIconBox}>
            <Truck size={18} color={colors.gold} />
          </View>
          <View>
            <Text style={styles.deliveryLabel}>ESTIMATED DELIVERY</Text>
            <Text style={styles.deliveryDate}>20 May 2026</Text>
            <Text style={styles.deliverySubtitle}>3-4 business days remaining</Text>
          </View>
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
  statusRow: { flexDirection: 'row', backgroundColor: '#FEF3C7', borderRadius: 12, padding: 14, marginBottom: 24, gap: 24 },
  statusItem: {},
  statusLabel: { fontSize: 11, color: '#92400E' },
  statusValue: { fontSize: 13, fontWeight: '700', color: '#92400E', marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.navy, marginBottom: 14 },
  timeline: { marginBottom: 24 },
  timelineRow: { flexDirection: 'row' },
  timelineLeft: { alignItems: 'center', marginRight: 14 },
  timelineDot: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: colors.mist,
    alignItems: 'center', justifyContent: 'center',
  },
  timelineDotDone: { backgroundColor: '#16A34A' },
  timelineDotCurrent: { backgroundColor: colors.royalBlue },
  timelineDotNumber: { color: colors.white, fontSize: 12, fontWeight: '700' },
  timelineLine: { width: 2, flex: 1, backgroundColor: '#16A34A', marginTop: 2 },
  timelineTitle: { fontSize: 14, fontWeight: '700', color: colors.navy },
  timelineTime: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  deliveryCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.navy,
    borderRadius: 16, padding: 16, gap: 12,
  },
  deliveryIconBox: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: colors.white + '15',
    alignItems: 'center', justifyContent: 'center',
  },
  deliveryLabel: { color: colors.textMuted, fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  deliveryDate: { color: colors.gold, fontSize: 18, fontWeight: '800', marginTop: 2 },
  deliverySubtitle: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
});