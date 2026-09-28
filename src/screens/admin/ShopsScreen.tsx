import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, StatusBar, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';
import { Search, Star, MapPin, Check, X } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import Avatar from '../../components/Avatar';
import { fetchShops, approveShop, rejectShop } from '../../api/adminApi';

const filters = ['All', 'Pending', 'Active', 'Rejected'];

export default function ShopsScreen() {
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [actioningId, setActioningId] = useState<string | null>(null);

  const loadShops = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true); else setLoading(true);
    setError(false);
    try {
      const data = await fetchShops();
      setShops(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadShops();
  }, []);

      const handleApprove = async (shopId: string) => {
    setActioningId(shopId);
    try {
      await approveShop(shopId);
      loadShops();
    } catch (err) {
      console.log('Approve failed:', err);
    } finally {
      setActioningId(null);
    }
  };

  const handleReject = async (shopId: string) => {
    setActioningId(shopId);
    try {
      await rejectShop(shopId);
      loadShops();
    } catch (err) {
      // error handled by leaving the shop in its current state
    } finally {
      setActioningId(null);
    }
  };

  const filteredShops = shops.filter((s) => {
    const matchesSearch = s.name?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === 'All' || s.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const pendingCount = shops.filter((s) => s.status === 'Pending').length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => loadShops(true)} tintColor={colors.royalBlue} />
        }
      >
        <Text style={styles.headerTitle}>Shops</Text>
        <Text style={styles.headerSubtitle}>
          {shops.length} total {pendingCount > 0 ? `· ${pendingCount} awaiting review` : ''}
        </Text>

        <View style={styles.searchBox}>
          <Search size={18} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search shops..."
            placeholderTextColor={colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={styles.filterRow}>
          {filters.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterPill, activeFilter === f && styles.filterPillActive]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.filterPillText, activeFilter === f && styles.filterPillTextActive]}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {loading ? (
          <View style={styles.stateBox}>
            <ActivityIndicator color={colors.royalBlue} />
          </View>
        ) : error ? (
          <View style={styles.stateBox}>
            <Text style={styles.stateErrorText}>Could not load shops</Text>
            <TouchableOpacity onPress={() => loadShops()} style={styles.stateRetryButton}>
              <Text style={styles.stateRetryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : filteredShops.length === 0 ? (
          <View style={styles.stateBox}>
            <Text style={styles.stateEmptyText}>No shops in this category</Text>
          </View>
        ) : (
          <View style={styles.list}>
            {filteredShops.map((shop, i) => (
              <View
                key={shop.id ?? shop._id ?? shop.name + i}
                style={[styles.shopRow, i !== filteredShops.length - 1 && styles.shopRowBorder]}
              >
                <View style={styles.shopTopRow}>
                  <Avatar
                    imageUrl={shop.imageUrl}
                    initials={shop.initial ?? shop.name?.charAt(0) ?? '?'}
                    bgColor={shop.color ?? colors.royalBlue + '22'}
                    textColor={shop.textColor ?? colors.royalBlue}
                    size={40}
                    rounded={false}
                  />

                  <View style={styles.shopInfo}>
                    <Text style={styles.shopName}>{shop.name}</Text>
                    <View style={styles.locationRow}>
                      <MapPin size={11} color={colors.textMuted} />
                      <Text style={styles.shopLocation}>{shop.location}</Text>
                    </View>
                  </View>

                  <View style={styles.shopRight}>
                    <View style={styles.ratingRow}>
                      <Star size={12} color={colors.gold} fill={colors.gold} />
                      <Text style={styles.ratingText}>{shop.rating ?? '—'}</Text>
                    </View>
                    <View
                      style={[
                        styles.statusBadge,
                        shop.status === 'Active' && { backgroundColor: '#DCFCE7' },
                        shop.status === 'Pending' && { backgroundColor: '#FEF3C7' },
                        shop.status === 'Rejected' && { backgroundColor: '#FEE2E2' },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          shop.status === 'Active' && { color: '#16A34A' },
                          shop.status === 'Pending' && { color: '#D97706' },
                          shop.status === 'Rejected' && { color: '#DC2626' },
                        ]}
                      >
                        {shop.status}
                      </Text>
                    </View>
                  </View>
                </View>

                {shop.status === 'Pending' && (
                  <View style={styles.pendingActionsRow}>
                    <TouchableOpacity
                      style={styles.rejectButton}
                      onPress={() => handleReject(shop.id ?? shop._id)}
                      disabled={actioningId === (shop.id ?? shop._id)}
                    >
                      {actioningId === (shop.id ?? shop._id) ? (
                        <ActivityIndicator color="#DC2626" size="small" />
                      ) : (
                        <>
                          <X size={14} color="#DC2626" />
                          <Text style={styles.rejectButtonText}>Reject</Text>
                        </>
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.approveButton}
                      onPress={() => handleApprove(shop.id ?? shop._id)}
                      disabled={actioningId === (shop.id ?? shop._id)}
                    >
                      {actioningId === (shop.id ?? shop._id) ? (
                        <ActivityIndicator color={colors.white} size="small" />
                      ) : (
                        <>
                          <Check size={14} color={colors.white} />
                          <Text style={styles.approveButtonText}>Approve</Text>
                        </>
                      )}
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: 20, paddingBottom: 40 },
  headerTitle: { fontSize: 24, fontWeight: '700', color: colors.navy, marginTop: 40 },
  headerSubtitle: { fontSize: 13, color: colors.textMuted, marginTop: 2, marginBottom: 16 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.mist,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
  },
  searchInput: { marginLeft: 8, flex: 1, fontSize: 14, color: colors.navy },
  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  filterPill: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: colors.mist },
  filterPillActive: { backgroundColor: colors.royalBlue },
  filterPillText: { fontSize: 12, fontWeight: '600', color: colors.slate },
  filterPillTextActive: { color: colors.white },
  list: { backgroundColor: colors.mist, borderRadius: 16, overflow: 'hidden' },
  shopRow: { padding: 14 },
  shopRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border + '22' },
  shopTopRow: { flexDirection: 'row', alignItems: 'center' },
  shopInfo: { flex: 1, marginLeft: 12 },
  shopName: { fontSize: 14, fontWeight: '600', color: colors.navy },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  shopLocation: { fontSize: 12, color: colors.textMuted, marginLeft: 3 },
  shopRight: { alignItems: 'flex-end' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  ratingText: { fontSize: 12, fontWeight: '600', color: colors.navy, marginLeft: 3 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  statusText: { fontSize: 11, fontWeight: '600' },
  pendingActionsRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  rejectButton: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    backgroundColor: colors.white, borderWidth: 1, borderColor: '#DC2626',
    borderRadius: 10, paddingVertical: 9,
  },
  rejectButtonText: { fontSize: 12, fontWeight: '700', color: '#DC2626' },
  approveButton: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    backgroundColor: '#16A34A', borderRadius: 10, paddingVertical: 9,
  },
  approveButtonText: { fontSize: 12, fontWeight: '700', color: colors.white },
  stateBox: { paddingVertical: 40, alignItems: 'center' },
  stateErrorText: { fontSize: 13, color: '#DC2626', marginBottom: 8 },
  stateRetryButton: { paddingHorizontal: 14, paddingVertical: 8, backgroundColor: colors.mist, borderRadius: 8 },
  stateRetryText: { fontSize: 13, fontWeight: '600', color: colors.navy },
  stateEmptyText: { fontSize: 13, color: colors.textMuted },
});