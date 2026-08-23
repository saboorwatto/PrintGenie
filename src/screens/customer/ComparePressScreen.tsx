import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { ArrowLeft, Star, ChevronDown } from 'lucide-react-native';
import { colors } from '../../theme/colors';

const presses = [
  { initial: 'C', color: '#DBEAFE', textColor: '#2563EB', name: 'ColorMax Press', rating: '4.8', reviews: '120', time: '2 days', price: 'PKR 1,200', badge: 'Best Value' },
  { initial: 'P', color: '#DCFCE7', textColor: '#16A34A', name: 'Print Palace', rating: '4.7', reviews: '89', time: '3 days', price: 'PKR 1,250' },
  { initial: 'Q', color: '#FEF3C7', textColor: '#D97706', name: 'Quality Prints', rating: '4.5', reviews: '76', time: '2 days', price: 'PKR 1,300' },
];

export default function ComparePressesScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack?.()}>
          <ArrowLeft size={18} color={colors.navy} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Compare Presses</Text>
      </View>

      <View style={styles.subHeaderRow}>
        <Text style={styles.foundText}>{presses.length} presses found</Text>
        <View style={styles.sortRow}>
          <Text style={styles.sortText}>Sort by: Price (Low to High)</Text>
          <ChevronDown size={14} color={colors.royalBlue} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {presses.map((press) => (
          <View key={press.name} style={styles.pressCard}>
            <View style={styles.pressTopRow}>
              <View style={[styles.avatar, { backgroundColor: press.color }]}>
                <Text style={[styles.avatarText, { color: press.textColor }]}>{press.initial}</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <View style={styles.nameRow}>
                  <Text style={styles.pressName}>{press.name}</Text>
                  {press.badge && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{press.badge}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.ratingRow}>
                  <Star size={12} color={colors.gold} fill={colors.gold} />
                  <Text style={styles.ratingText}>{press.rating} ({press.reviews})</Text>
                  <Text style={styles.dot}>·</Text>
                  <Text style={styles.timeText}>{press.time}</Text>
                </View>
              </View>
            </View>

            <View style={styles.pressBottomRow}>
              <Text style={styles.pressPrice}>{press.price}</Text>
              <TouchableOpacity style={styles.selectButton}>
                <Text style={styles.selectButtonText}>Select</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation?.navigate?.('Payment')}
        >
          <Text style={styles.continueButtonText}>Continue to Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingTop: 50, paddingHorizontal: 20, paddingBottom: 12 },
  backButton: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: colors.mist,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.navy },
  subHeaderRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, marginBottom: 12,
  },
  foundText: { fontSize: 12, color: colors.textMuted },
  sortRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  sortText: { fontSize: 12, color: colors.royalBlue, fontWeight: '600' },
  body: { paddingHorizontal: 20, paddingBottom: 20 },
  pressCard: { backgroundColor: colors.mist, borderRadius: 16, padding: 14, marginBottom: 12 },
  pressTopRow: { flexDirection: 'row' },
  avatar: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontWeight: '700', fontSize: 15 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  pressName: { fontSize: 14, fontWeight: '700', color: colors.navy },
  badge: { backgroundColor: '#FEF3C7', borderRadius: 20, paddingHorizontal: 8, paddingVertical: 2 },
  badgeText: { fontSize: 10, fontWeight: '700', color: '#D97706' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 3 },
  ratingText: { fontSize: 12, color: colors.slate },
  dot: { fontSize: 12, color: colors.textMuted },
  timeText: { fontSize: 12, color: colors.textMuted },
  pressBottomRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginTop: 14, paddingTop: 14, borderTopWidth: 1, borderTopColor: colors.border + '22',
  },
  pressPrice: { fontSize: 18, fontWeight: '800', color: colors.navy },
  selectButton: { backgroundColor: colors.royalBlue, borderRadius: 10, paddingHorizontal: 18, paddingVertical: 9 },
  selectButtonText: { color: colors.white, fontSize: 13, fontWeight: '700' },
  footer: { paddingHorizontal: 20, paddingBottom: 24, paddingTop: 8 },
  continueButton: { backgroundColor: colors.gold, borderRadius: 12, paddingVertical: 16, alignItems: 'center' },
  continueButtonText: { color: colors.navy, fontSize: 15, fontWeight: '700' },
});