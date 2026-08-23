import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { Search, Star, MapPin } from 'lucide-react-native';
import { colors } from '../theme/colors';
import Avatar from '../components/Avatar';

const shops = [
  { initial: 'P', color: '#DCFCE7', textColor: '#16A34A', name: 'Print Palace', location: 'Lahore, Pun...', rating: '4.8', status: 'Active', imageUrl: null },
  { initial: 'C', color: '#FEF3C7', textColor: '#D97706', name: 'ColorMax ...', location: 'Karachi, Sin...', rating: '4.3', status: 'Active', imageUrl: null },
  { initial: 'Q', color: '#DBEAFE', textColor: '#2563EB', name: 'Quality Pri...', location: 'Multan, Pun...', rating: '4.5', status: 'Active', imageUrl: null },
  { initial: 'C', color: '#FEE2E2', textColor: '#DC2626', name: 'Creative ...', location: 'Faisalabad...', rating: '4.2', status: 'Inactive', imageUrl: null },
];

export default function ShopsScreen() {
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
          />
        </View>

        <View style={styles.list}>
          {shops.map((shop, i) => (
            <View
              key={shop.name + i}
              style={[styles.shopRow, i !== shops.length - 1 && styles.shopRowBorder]}
            >
                              <Avatar
                imageUrl={shop.imageUrl}
                initials={shop.initial}
                bgColor={shop.color}
                textColor={shop.textColor}
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
  avatar: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontWeight: '700', fontSize: 14 },
  shopInfo: { flex: 1, marginLeft: 12 },
  shopName: { fontSize: 14, fontWeight: '600', color: colors.navy },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  shopLocation: { fontSize: 12, color: colors.textMuted, marginLeft: 3 },
  shopRight: { alignItems: 'flex-end' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  ratingText: { fontSize: 12, fontWeight: '600', color: colors.navy, marginLeft: 3 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  statusText: { fontSize: 11, fontWeight: '600' },
});