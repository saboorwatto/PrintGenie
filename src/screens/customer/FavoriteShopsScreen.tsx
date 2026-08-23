import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { ArrowLeft, Heart, Star, MapPin } from 'lucide-react-native';
import { colors } from '../../theme/colors';

const favorites = [
  { initial: 'C', color: '#DBEAFE', textColor: '#2563EB', name: 'ColorMax Press', location: 'Karachi, Sindh', rating: '4.8' },
  { initial: 'P', color: '#DCFCE7', textColor: '#16A34A', name: 'Print Palace', location: 'Lahore, Punjab', rating: '4.7' },
];

export default function FavoriteShopsScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack?.()}>
          <ArrowLeft size={18} color={colors.navy} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorite Print Shops</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {favorites.length === 0 ? (
          <Text style={styles.emptyText}>No favorite shops yet — tap the heart icon on any press to save it here.</Text>
        ) : (
          <View style={styles.list}>
            {favorites.map((shop, i) => (
              <View
                key={shop.name}
                style={[styles.shopRow, i !== favorites.length - 1 && styles.shopRowBorder]}
              >
                <View style={[styles.avatar, { backgroundColor: shop.color }]}>
                  <Text style={[styles.avatarText, { color: shop.textColor }]}>{shop.initial}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.shopName}>{shop.name}</Text>
                  <View style={styles.metaRow}>
                    <MapPin size={11} color={colors.textMuted} />
                    <Text style={styles.shopLocation}>{shop.location}</Text>
                    <Text style={styles.dot}>·</Text>
                    <Star size={11} color={colors.gold} fill={colors.gold} />
                    <Text style={styles.rating}>{shop.rating}</Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <Heart size={20} color="#DC2626" fill="#DC2626" />
                </TouchableOpacity>
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
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingTop: 50, paddingHorizontal: 20, paddingBottom: 16 },
  backButton: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: colors.mist,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.navy },
  body: { paddingHorizontal: 20, paddingBottom: 40 },
  emptyText: { fontSize: 13, color: colors.textMuted, textAlign: 'center', marginTop: 40, lineHeight: 20 },
  list: { backgroundColor: colors.mist, borderRadius: 16, overflow: 'hidden' },
  shopRow: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  shopRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border + '22' },
  avatar: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontWeight: '700', fontSize: 15 },
  shopName: { fontSize: 14, fontWeight: '700', color: colors.navy },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 3 },
  shopLocation: { fontSize: 12, color: colors.textMuted },
  dot: { fontSize: 12, color: colors.textMuted },
  rating: { fontSize: 12, color: colors.slate, fontWeight: '600' },
});