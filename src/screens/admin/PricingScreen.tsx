import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { Layers, Sparkles, Percent, Wallet, TrendingDown } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { fetchPricingConfig, savePricingConfig } from '../../api/adminApi';

type PriceItem = { name: string; price: string };

const defaultConfig = {
  materialCosts: [
    { name: 'Matte 300gsm', price: 'PKR 250 /unit' },
    { name: 'Glossy 250gsm', price: 'PKR 220 /unit' },
    { name: 'Kraft Paper', price: 'PKR 300 /unit' },
  ],
  finishingCharges: [
    { name: 'UV Coating', price: 'PKR 150' },
    { name: 'Embossing', price: 'PKR 300' },
  ],
  taxRates: [
    { name: 'Standard Sales Tax', price: '17%' },
    { name: 'Punjab Service Tax', price: '5%' },
  ],
  commissionRules: [
    { name: 'Platform Commission (Standard)', price: '10%' },
    { name: 'Platform Commission (Premium Shop)', price: '7%' },
  ],
  quantityDiscounts: [
    { name: '50+ units', price: '5% off' },
    { name: '200+ units', price: '10% off' },
    { name: '500+ units', price: '15% off' },
  ],
};

export default function PricingScreen() {
  const [config, setConfig] = useState(defaultConfig);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadConfig = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchPricingConfig();
      setConfig(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConfig();
  }, []);

  const updateItem = (section: keyof typeof defaultConfig, index: number, newPrice: string) => {
    setConfig((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) => (i === index ? { ...item, price: newPrice } : item)),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await savePricingConfig(config);
      Alert.alert('Saved', 'Pricing configuration updated.');
    } catch (err) {
      Alert.alert('Save failed', 'Could not reach the server. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const renderSection = (
    title: string,
    Icon: any,
    iconColor: string,
    section: keyof typeof defaultConfig
  ) => (
    <View style={styles.card}>
      <View style={styles.cardHeaderRow}>
        <Icon size={16} color={iconColor} />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      {config[section].map((item: PriceItem, i: number) => (
        <View
          key={item.name}
          style={[styles.row, i !== config[section].length - 1 && styles.rowBorder]}
        >
          <Text style={styles.rowLabel}>{item.name}</Text>
          <View style={styles.pricePill}>
            <TextInput
              style={styles.pricePillInput}
              value={item.price}
              onChangeText={(v) => updateItem(section, i, v)}
            />
          </View>
        </View>
      ))}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.stateContainer}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
        <ActivityIndicator color={colors.royalBlue} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.stateContainer}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
        <Text style={styles.stateErrorText}>Could not load pricing configuration</Text>
        <TouchableOpacity onPress={loadConfig} style={styles.stateRetryButton}>
          <Text style={styles.stateRetryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerTitle}>Pricing Config</Text>
        <Text style={styles.headerSubtitle}>Global material costs & commission rules</Text>

        {renderSection('Material Base Costs', Layers, colors.royalBlue, 'materialCosts')}
        {renderSection('Finishing Charges', Sparkles, colors.gold, 'finishingCharges')}
        {renderSection('Tax Rates', Percent, colors.royalBlue, 'taxRates')}
        {renderSection('Commission Rules', Wallet, colors.gold, 'commissionRules')}
        {renderSection('Quantity Discounts', TrendingDown, '#16A34A', 'quantityDiscounts')}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={saving}>
          {saving ? (
            <ActivityIndicator color={colors.navy} />
          ) : (
            <Text style={styles.saveButtonText}>Save Configuration</Text>
          )}
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
  rowLabel: { fontSize: 14, color: colors.navy, flex: 1 },
  pricePill: { backgroundColor: colors.white, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  pricePillInput: { fontSize: 13, fontWeight: '600', color: colors.navy, minWidth: 80, textAlign: 'right' },
  saveButton: {
    backgroundColor: colors.gold,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: { color: colors.navy, fontSize: 15, fontWeight: '700' },
  stateContainer: { flex: 1, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  stateErrorText: { fontSize: 14, color: '#DC2626', marginBottom: 12, textAlign: 'center' },
  stateRetryButton: { paddingHorizontal: 16, paddingVertical: 10, backgroundColor: colors.mist, borderRadius: 10 },
  stateRetryText: { fontSize: 14, fontWeight: '600', color: colors.navy },
});