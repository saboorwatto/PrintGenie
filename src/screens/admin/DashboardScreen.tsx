import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { colors } from '../../theme/colors';
import RevenueChart from '../../components/RevenueChart';
import { fetchDashboardStats } from '../../api/adminApi';

export default function DashboardScreen({ navigation }: any) {
  const [stats, setStats] = useState<{ totalOrders: number; customers: number; totalRevenue: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadStats = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchDashboardStats();
      setStats(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <View style={styles.avatar} />
        </View>

        {/* Stats row */}
        {loading ? (
          <View style={styles.statsLoadingBox}>
            <ActivityIndicator color={colors.royalBlue} />
          </View>
        ) : error ? (
          <View style={styles.statsLoadingBox}>
            <Text style={styles.statsErrorText}>Could not load dashboard stats</Text>
            <TouchableOpacity onPress={loadStats} style={styles.statsRetryButton}>
              <Text style={styles.statsRetryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{stats?.totalOrders.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Total Orders</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{stats?.customers.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Customers</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>
                PKR{'\n'}{((stats?.totalRevenue ?? 0) / 1_000_000).toFixed(2)}M
              </Text>
              <Text style={styles.statLabel}>Total Revenue</Text>
            </View>
          </View>
        )}

        {/* Revenue chart card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Revenue Overview</Text>
            <Text style={styles.cardFilter}>This Month ▾</Text>
          </View>
          <RevenueChart />
        </View>

        {/* Pending actions card */}
        <View style={styles.pendingCard}>
          <Text style={styles.pendingLabel}>PENDING ACTIONS</Text>
          <View style={styles.pendingRow}>
            <Text style={styles.pendingText}>
              4 shop applications{'\n'}awaiting review
            </Text>
            <Text style={styles.pendingAction}>Review →</Text>
          </View>
        </View>

        {/* AI model status card */}
        <TouchableOpacity
          style={styles.aiMonitorCard}
          onPress={() => navigation?.navigate?.('AIMonitoring')}
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
  headerTitle: { fontSize: 24, fontWeight: '700', color: colors.navy },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.mist,
  },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  statBox: {
    flex: 1,
    backgroundColor: colors.mist,
    borderRadius: 12,
    padding: 14,
    marginRight: 8,
  },
  statValue: { fontSize: 18, fontWeight: '700', color: colors.navy },
  statLabel: { fontSize: 12, color: colors.slate, marginTop: 4 },
  statsLoadingBox: { height: 76, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  statsErrorText: { fontSize: 12, color: '#DC2626', marginBottom: 6 },
  statsRetryButton: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: colors.mist, borderRadius: 8 },
  statsRetryText: { fontSize: 12, fontWeight: '600', color: colors.navy },
  card: {
    backgroundColor: colors.mist,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 15, fontWeight: '700', color: colors.navy },
  cardFilter: { fontSize: 12, color: colors.slate },
  pendingCard: {
    backgroundColor: colors.navy,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  pendingLabel: { color: colors.gold, fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
  pendingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pendingText: { color: colors.white, fontSize: 14, flex: 1 },
  pendingAction: { color: colors.gold, fontSize: 13, fontWeight: '700' },
  aiMonitorCard: { backgroundColor: colors.mist, borderRadius: 16, padding: 16, marginTop: 12 },
  aiMonitorLabel: { color: colors.royalBlue, fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
  aiMonitorAction: { color: colors.royalBlue, fontSize: 13, fontWeight: '700' },
});