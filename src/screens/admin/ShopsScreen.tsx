import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, StatusBar, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Search, Star, MapPin } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import Avatar from '../../components/Avatar';
import { fetchShops } from '../../api/adminApi';

export default function ShopsScreen() {
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');

  const loadShops = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchShops();
      setShops(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShops();
  }, []);

  const filteredShops = shops.filter((s) =>
    s.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerTitle}>Shops</Text>

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

        {loading ? (
          <View style={styles.stateBox}>
            <ActivityIndicator color={colors.royalBlue} />
          </View>
        ) : error ? (
          <View style={styles.stateBox}>
            <Text style={styles.stateErrorText}>Could not load shops</Text>
            <TouchableOpacity onPress={loadShops} style={styles.stateRetryButton}>
              <Text style={styles.stateRetryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : filteredShops.length === 0 ? (
          <View style={styles.stateBox}>
            <Text style={styles.stateEmptyText}>No shops found</Text>
          </View>
        ) : (
          <View style={styles.list}>
            {filteredShops.map((shop, i) => (
              <View
                key={shop.id ?? shop.name + i}
                style={[styles.shopRow, i !== filteredShops.length - 1 && styles.shopRowBorder]}
              >
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
                    <Text style={styles.ratingText}>{shop.rating}</Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: shop.status === 'Active' ? '#DCFCE7' : colors.mist },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        { color: shop.status === 'Active' ? '#16A34A' : colors.slate },
                      ]}
                    >
                      {shop.status}
                    </Text>
                  </View>
                </View>
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
  headerTitle: { fontSize: 24, fontWeight: '700', color: colors.navy, marginTop: 40, marginBottom: 16 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.mist,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchInput: { marginLeft: 8, flex: 1, fontSize: 14, color: colors.navy },
  list: { backgroundColor: colors.mist, borderRadius: 16, overflow: 'hidden' },
  shopRow: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  shopRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border + '22' },
  shopInfo: { flex: 1, marginLeft: 12 },
  shopName: { fontSize: 14, fontWeight: '600', color: colors.navy },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  shopLocation: { fontSize: 12, color: colors.textMuted, marginLeft: 3 },
  shopRight: { alignItems: 'flex-end' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  ratingText: { fontSize: 12, fontWeight: '600', color: colors.navy, marginLeft: 3 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  statusText: { fontSize: 11, fontWeight: '600' },
  stateBox: { paddingVertical: 40, alignItems: 'center' },
  stateErrorText: { fontSize: 13, color: '#DC2626', marginBottom: 8 },
  stateRetryButton: { paddingHorizontal: 14, paddingVertical: 8, backgroundColor: colors.mist, borderRadius: 8 },
  stateRetryText: { fontSize: 13, fontWeight: '600', color: colors.navy },
  stateEmptyText: { fontSize: 13, color: colors.textMuted },
});