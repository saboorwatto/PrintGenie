import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { colors } from '../../theme/colors';
import { API_BASE_URL } from '../../api/config';

const topProducts = [
  { name: 'Business Cards', orders: '520 Orders' },
  { name: 'Flyers', orders: '300 Orders' },
  { name: 'Brochures', orders: '210 Orders' },
];

export default function ReportsScreen() {
  const [exporting, setExporting] = useState<'pdf' | 'csv' | null>(null);

  const handleExport = async (format: 'pdf' | 'csv') => {
    setExporting(format);
    try {
      const url = `${API_BASE_URL}/api/admin/reports/export?format=${format}`;
      const fileUri = FileSystem.documentDirectory + `report.${format}`;
      const { uri } = await FileSystem.downloadAsync(url, fileUri);

      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert('Downloaded', `Report saved to ${uri}`);
      }
    } catch (err) {
      Alert.alert('Export failed', 'Could not reach the server. Please try again.');
    } finally {
      setExporting(null);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Reports</Text>
          <View style={styles.filterPill}>
            <Text style={styles.filterText}>This Month ▾</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardTopRow}>
            <Text style={styles.cardLabel}>Sales Overview</Text>
            <Text style={styles.percentUp}>+15%</Text>
          </View>
          <Text style={styles.salesValue}>PKR 1,250,000</Text>
          <Text style={styles.vsLastMonth}>vs last month</Text>

          <View style={styles.barsRow}>
            {[60, 90, 45, 75, 55, 80, 65, 70].map((h, i) => (
              <View key={i} style={[styles.bar, { height: h }]} />
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Top Products</Text>
        <View style={styles.list}>
          {topProducts.map((p, i) => (
            <View
              key={p.name}
              style={[styles.productRow, i !== topProducts.length - 1 && styles.productRowBorder]}
            >
              <Text style={styles.productName}>{p.name}</Text>
              <Text style={styles.productOrders}>{p.orders}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Export Report</Text>
        <View style={styles.exportRow}>
          <TouchableOpacity
            style={[styles.exportButton, styles.exportOutline]}
            onPress={() => handleExport('pdf')}
            disabled={exporting !== null}
          >
            {exporting === 'pdf' ? (
              <ActivityIndicator color={colors.navy} size="small" />
            ) : (
              <Text style={styles.exportOutlineText}>PDF</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.exportButton, styles.exportFilled]}
            onPress={() => handleExport('csv')}
            disabled={exporting !== null}
          >
            {exporting === 'csv' ? (
              <ActivityIndicator color={colors.white} size="small" />
            ) : (
              <Text style={styles.exportFilledText}>CSV</Text>
            )}
          </TouchableOpacity>
        </View>
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
    marginBottom: 16,
  },
  headerTitle: { fontSize: 24, fontWeight: '700', color: colors.navy },
  filterPill: { backgroundColor: colors.mist, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  filterText: { fontSize: 12, color: colors.slate, fontWeight: '600' },
  card: { backgroundColor: colors.mist, borderRadius: 16, padding: 16, marginBottom: 20 },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardLabel: { fontSize: 13, color: colors.slate },
  percentUp: { fontSize: 13, fontWeight: '700', color: '#16A34A' },
  salesValue: { fontSize: 22, fontWeight: '700', color: colors.navy, marginTop: 6 },
  vsLastMonth: { fontSize: 12, color: colors.textMuted, marginTop: 2, marginBottom: 16 },
  barsRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 90 },
  bar: { width: 18, backgroundColor: colors.royalBlue, borderRadius: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.navy, marginBottom: 10 },
  list: { backgroundColor: colors.mist, borderRadius: 16, overflow: 'hidden', marginBottom: 20 },
  productRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 14 },
  productRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border + '22' },
  productName: { fontSize: 14, color: colors.navy, fontWeight: '600' },
  productOrders: { fontSize: 13, color: colors.textMuted },
  exportRow: { flexDirection: 'row', gap: 10 },
  exportButton: { flex: 1, borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  exportOutline: { borderWidth: 1, borderColor: colors.border },
  exportOutlineText: { color: colors.navy, fontWeight: '600', fontSize: 14 },
  exportFilled: { backgroundColor: colors.navy },
  exportFilledText: { color: colors.white, fontWeight: '600', fontSize: 14 },
});