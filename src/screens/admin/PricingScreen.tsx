import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Layers, Sparkles, Percent, Wallet, TrendingDown } from 'lucide-react-native';
import { colors } from '../../theme/colors';

const materialCosts = [
  { name: 'Matte 300gsm', price: 'PKR 250 /unit' },
  { name: 'Glossy 250gsm', price: 'PKR 220 /unit' },
  { name: 'Kraft Paper', price: 'PKR 300 /unit' },
];

const finishingCharges = [
  { name: 'UV Coating', price: 'PKR 150' },
  { name: 'Embossing', price: 'PKR 300' },
];

const taxRates = [
  { name: 'Standard Sales Tax', price: '17%' },
  { name: 'Punjab Service Tax', price: '5%' },
];

const commissionRules = [
  { name: 'Platform Commission (Standard)', price: '10%' },
  { name: 'Platform Commission (Premium Shop)', price: '7%' },
];

const quantityDiscounts = [
  { name: '50+ units', price: '5% off' },
  { name: '200+ units', price: '10% off' },
  { name: '500+ units', price: '15% off' },
];

export default function PricingScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerTitle}>Pricing Config</Text>
        <Text style={styles.headerSubtitle}>Global material costs & commission rules</Text>

        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Layers size={16} color={colors.royalBlue} />
            <Text style={styles.cardTitle}>Material Base Costs</Text>
          </View>
          {materialCosts.map((item, i) => (
            <View
              key={item.name}
              style={[styles.row, i !== materialCosts.length - 1 && styles.rowBorder]}
            >
              <Text style={styles.rowLabel}>{item.name}</Text>
              <View style={styles.pricePill}>
                <Text style={styles.pricePillText}>{item.price}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Sparkles size={16} color={colors.gold} />
            <Text style={styles.cardTitle}>Finishing Charges</Text>
          </View>
          {finishingCharges.map((item, i) => (
            <View
              key={item.name}
              style={[styles.row, i !== finishingCharges.length - 1 && styles.rowBorder]}
            >
              <Text style={styles.rowLabel}>{item.name}</Text>
              <View style={styles.pricePill}>
                <Text style={styles.pricePillText}>{item.price}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Percent size={16} color={colors.royalBlue} />
            <Text style={styles.cardTitle}>Tax Rates</Text>
          </View>
          {taxRates.map((item, i) => (
            <View
              key={item.name}
              style={[styles.row, i !== taxRates.length - 1 && styles.rowBorder]}
            >
              <Text style={styles.rowLabel}>{item.name}</Text>
              <View style={styles.pricePill}>
                <Text style={styles.pricePillText}>{item.price}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Wallet size={16} color={colors.gold} />
            <Text style={styles.cardTitle}>Commission Rules</Text>
          </View>
          {commissionRules.map((item, i) => (
            <View
              key={item.name}
              style={[styles.row, i !== commissionRules.length - 1 && styles.rowBorder]}
            >
              <Text style={styles.rowLabel}>{item.name}</Text>
              <View style={styles.pricePill}>
                <Text style={styles.pricePillText}>{item.price}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <TrendingDown size={16} color="#16A34A" />
            <Text style={styles.cardTitle}>Quantity Discounts</Text>
          </View>
          {quantityDiscounts.map((item, i) => (
            <View
              key={item.name}
              style={[styles.row, i !== quantityDiscounts.length - 1 && styles.rowBorder]}
            >
              <Text style={styles.rowLabel}>{item.name}</Text>
              <View style={styles.pricePill}>
                <Text style={styles.pricePillText}>{item.price}</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Configuration</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: 20, paddingBottom: 60 },
  headerTitle: { fontSize: 24, fontWeight: '700', color: colors.navy, marginTop: 40 },
  headerSubtitle: { fontSize: 13, color: colors.textMuted, marginTop: 4, marginBottom: 20 },
  card: { backgroundColor: colors.mist, borderRadius: 16, padding: 16, marginBottom: 16 },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: colors.navy, marginLeft: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border + '22' },
  rowLabel: { fontSize: 14, color: colors.navy },
  pricePill: { backgroundColor: colors.white, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6 },
  pricePillText:{ fontSize: 13, fontWeight: '600', color: colors.navy },
  saveButton: {
    backgroundColor: colors.gold,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: { color: colors.navy, fontSize: 15, fontWeight: '700' },
});