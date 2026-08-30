import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { colors } from '../../theme/colors';
import RevenueChart from '../../components/RevenueChart';

export default function DashboardScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <View style={styles.avatar} />
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>1,250</Text>
            <Text style={styles.statLabel}>Total Orders</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>532</Text>
            <Text style={styles.statLabel}>Customers</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>PKR{'\n'}1.25M</Text>
            <Text style={styles.statLabel}>Total Revenue</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Revenue Overview</Text>
            <Text style={styles.cardFilter}>This Month ▾</Text>
          </View>
                   <RevenueChart />
        </View>

        <View style={styles.pendingCard}>
          <Text style={styles.pendingLabel}>PENDING ACTIONS</Text>
          <View style={styles.pendingRow}>
            <Text style={styles.pendingText}>
              4 shop applications{'\n'}awaiting review
            </Text>
            <Text style={styles.pendingAction}>Review →</Text>
          </View>
        </View>
                <TouchableOpacity
          style={styles.aiMonitorCard}
          onPress={() => navigation.getParent()?.navigate('AIMonitoring')}
        >
          <Text style={styles.aiMonitorLabel}>AI MODEL STATUS</Text>
          <View style={styles.pendingRow}>
            <Text style={styles.pendingText}>All systems operational</Text>
            <Text style={styles.aiMonitorAction}>View Details →</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: 20, paddingBottom: 40 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
    aiMonitorCard: { backgroundColor: colors.mist, borderRadius: 16, padding: 16, marginTop: 12 },
  aiMonitorLabel: { color: colors.royalBlue, fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
  aiMonitorAction: { color: colors.royalBlue, fontSize: 13, fontWeight: '700' },
  headerTitle: { fontSize: 24, fontWeight: '700', color: colors.navy },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.mist },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  statBox: { flex: 1, backgroundColor: colors.mist, borderRadius: 12, padding: 14, marginRight: 8 },
  statValue: { fontSize: 18, fontWeight: '700', color: colors.navy },
  statLabel: { fontSize: 12, color: colors.slate, marginTop: 4 },
  card: { backgroundColor: colors.mist, borderRadius: 16, padding: 16, marginBottom: 16 },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 15, fontWeight: '700', color: colors.navy },
  cardFilter: { fontSize: 12, color: colors.slate },
  chartPlaceholder: {
    height: 120,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 8,
  },
  pendingCard: { backgroundColor: colors.navy, borderRadius: 16, padding: 16 },
  pendingLabel: { color: colors.gold, fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
  pendingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pendingText: { color: colors.white, fontSize: 14, flex: 1 },
  pendingAction: { color: colors.gold, fontSize: 13, fontWeight: '700' },
});