import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, ActivityIndicator, RefreshControl, Modal } from 'react-native';
import { ShoppingBag, Users2, Wallet, ChevronDown, Check, LogOut } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import RevenueChart from '../../components/RevenueChart';
import { fetchDashboardStats } from '../../api/adminApi';

const periods = [
  { key: 'daily', label: 'Today' },
  { key: 'weekly', label: 'This Week' },
  { key: 'monthly', label: 'This Month' },
];

export default function DashboardScreen({ navigation }: any) {
  const [stats, setStats] = useState<{ totalOrders: number; customers: number; totalRevenue: number; pendingShops: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [period, setPeriod] = useState('monthly');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const loadStats = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true); else setLoading(true);
    setError(false);
    try {
      const data = await fetchDashboardStats(period);
      setStats(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, [period]);

  const currentPeriodLabel = periods.find((p) => p.key === period)?.label ?? 'This Month';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => loadStats(true)} tintColor={colors.royalBlue} />
        }
      >
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Dashboard</Text>
            <Text style={styles.headerSubtitle}>Welcome back, Admin</Text>
          </View>
          <TouchableOpacity style={styles.avatar} onPress={() => setMenuOpen(true)}>
            <Text style={styles.avatarText}>A</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.periodPicker} onPress={() => setPickerOpen(true)}>
          <Text style={styles.periodPickerText}>{currentPeriodLabel}</Text>
          <ChevronDown size={14} color={colors.royalBlue} />
        </TouchableOpacity>

        {/* Stats row */}
        {loading ? (
          <View style={styles.statsLoadingBox}>
            <ActivityIndicator color={colors.royalBlue} />
          </View>
        ) : error ? (
          <View style={styles.statsLoadingBox}>
            <Text style={styles.statsErrorText}>Could not load dashboard stats</Text>
            <TouchableOpacity onPress={() => loadStats()} style={styles.statsRetryButton}>
              <Text style={styles.statsRetryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <View style={[styles.statIconBox, { backgroundColor: '#DBEAFE' }]}>
                <ShoppingBag size={16} color="#2563EB" />
              </View>
              <Text style={styles.statValue}>{stats?.totalOrders.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Total Orders</Text>
            </View>
            <View style={styles.statBox}>
              <View style={[styles.statIconBox, { backgroundColor: '#DCFCE7' }]}>
                <Users2 size={16} color="#16A34A" />
              </View>
              <Text style={styles.statValue}>{stats?.customers.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Customers</Text>
            </View>
            <View style={styles.statBox}>
              <View style={[styles.statIconBox, { backgroundColor: '#FEF3C7' }]}>
                <Wallet size={16} color="#D97706" />
              </View>
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
            <Text style={styles.cardFilter}>{currentPeriodLabel}</Text>
          </View>
          <RevenueChart period={period} />
        </View>

        {/* Pending actions card */}
        {(stats?.pendingShops ?? 0) > 0 && (
          <TouchableOpacity
            style={styles.pendingCard}
            onPress={() => navigation?.navigate?.('Shops')}
          >
            <Text style={styles.pendingLabel}>PENDING ACTIONS</Text>
            <View style={styles.pendingRow}>
              <Text style={styles.pendingText}>
                {stats?.pendingShops} shop application{stats?.pendingShops !== 1 ? 's' : ''}{'\n'}awaiting review
              </Text>
              <Text style={styles.pendingAction}>Review →</Text>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>

      <Modal visible={pickerOpen} transparent animationType="fade" onRequestClose={() => setPickerOpen(false)}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() => setPickerOpen(false)}
          />
          <View style={styles.pickerSheet}>
            <Text style={styles.pickerTitle}>Show data for</Text>
            {periods.map((p) => (
              <TouchableOpacity
                key={p.key}
                style={styles.pickerRow}
                onPress={() => { setPeriod(p.key); setPickerOpen(false); }}
              >
                <Text style={styles.pickerRowText}>{p.label}</Text>
                {period === p.key && <Check size={16} color={colors.royalBlue} />}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <Modal visible={menuOpen} transparent animationType="fade" onRequestClose={() => setMenuOpen(false)}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() => setMenuOpen(false)}
          />
          <View style={styles.pickerSheet}>
            <TouchableOpacity
              style={styles.logoutRow}
              onPress={() => {
                setMenuOpen(false);
                navigation?.getParent?.()?.reset?.({ index: 0, routes: [{ name: 'Auth' }] });
              }}
            >
              <LogOut size={18} color="#DC2626" />
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginBottom: 12,
  },
  headerTitle: { fontSize: 24, fontWeight: '700', color: colors.navy },
  headerSubtitle: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.royalBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: colors.white, fontSize: 15, fontWeight: '700' },
  periodPicker: {
    flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 6,
    backgroundColor: colors.mist, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, marginBottom: 16,
  },
  periodPickerText: { fontSize: 13, fontWeight: '600', color: colors.royalBlue },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  statBox: {
    flex: 1,
    backgroundColor: colors.mist,
    borderRadius: 12,
    padding: 14,
    marginRight: 8,
  },
  statIconBox: {
    width: 30, height: 30, borderRadius: 8,
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  statValue: { fontSize: 18, fontWeight: '700', color: colors.navy },
  statLabel: { fontSize: 12, color: colors.slate, marginTop: 4 },
  statsLoadingBox: { height: 100, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
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
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  pickerSheet: { backgroundColor: colors.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingBottom: 36 },
  pickerTitle: { fontSize: 13, fontWeight: '700', color: colors.textMuted, marginBottom: 12 },
  pickerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border + '22' },
  pickerRowText: { fontSize: 15, fontWeight: '600', color: colors.navy },
  logoutRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 },
  logoutText: { fontSize: 15, fontWeight: '700', color: '#DC2626' },
});