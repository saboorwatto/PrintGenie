import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Alert,
  Modal,
  Platform,
} from 'react-native';
import { Check } from 'lucide-react-native';
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { colors } from '../../theme/colors';
import { API_BASE_URL } from '../../api/config';
import { fetchReportsSummary } from '../../api/adminApi';
import { getToken } from '../../api/authToken';

const periods = [
  { key: 'daily', label: 'Today' },
  { key: 'weekly', label: 'This Week' },
  { key: 'monthly', label: 'This Month' },
];

export default function ReportsScreen() {
  const [exporting, setExporting] = useState<'pdf' | 'csv' | null>(null);
  const [period, setPeriod] = useState('monthly');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [summary, setSummary] = useState<{ salesTotal: number; percentChange: number; topProducts: { name: string; orders: number }[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadSummary = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchReportsSummary(period);
      setSummary(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSummary();
  }, [period]);

  const currentPeriodLabel = periods.find((p) => p.key === period)?.label ?? 'This Month';

    const handleExport = async (format: 'pdf' | 'csv') => {
    setExporting(format);
    try {
      const url = `${API_BASE_URL}/api/admin/reports/export?format=${format}`;

      if (Platform.OS === 'web') {
        // Browser download — expo-file-system doesn't work on web at all
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        if (!response.ok) throw new Error(`Server responded ${response.status}`);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `report.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      } else {
        const file = await File.downloadFileAsync(url, new File(Paths.document, `report.${format}`), {
          headers: { Authorization: `Bearer ${getToken()}` },
        });

        const canShare = await Sharing.isAvailableAsync();
        if (canShare) {
          await Sharing.shareAsync(file.uri);
        }
      }
    } catch (err) {
      console.log('Export failed:', err);
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
          <TouchableOpacity style={styles.filterPill} onPress={() => setPickerOpen(true)}>
            <Text style={styles.filterText}>{currentPeriodLabel} ▾</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.card}>
            <ActivityIndicator color={colors.royalBlue} />
          </View>
        ) : error ? (
          <View style={styles.card}>
            <Text style={styles.errorText}>Could not load report data</Text>
            <TouchableOpacity onPress={loadSummary} style={styles.retryButton}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.card}>
              <View style={styles.cardTopRow}>
                <Text style={styles.cardLabel}>Sales Overview</Text>
                <Text style={[styles.percentChange, (summary?.percentChange ?? 0) < 0 && styles.percentChangeNegative]}>
                  {(summary?.percentChange ?? 0) >= 0 ? '+' : ''}{summary?.percentChange}%
                </Text>
              </View>
              <Text style={styles.salesValue}>PKR {summary?.salesTotal.toLocaleString()}</Text>
              <Text style={styles.vsLastMonth}>vs previous {period === 'daily' ? 'day' : period === 'weekly' ? 'week' : 'month'}</Text>
            </View>

            <Text style={styles.sectionTitle}>Top Products</Text>
            {summary?.topProducts.length === 0 ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>No orders in this period yet</Text>
              </View>
            ) : (
              <View style={styles.list}>
                {summary?.topProducts.map((p, i) => (
                  <View
                    key={p.name + i}
                    style={[styles.productRow, i !== (summary?.topProducts.length ?? 0) - 1 && styles.productRowBorder]}
                  >
                    <Text style={styles.productName}>{p.name}</Text>
                    <Text style={styles.productOrders}>{p.orders} Orders</Text>
                  </View>
                ))}
              </View>
            )}
          </>
        )}

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
  card: { backgroundColor: colors.mist, borderRadius: 16, padding: 16, marginBottom: 20, minHeight: 90 },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardLabel: { fontSize: 13, color: colors.slate },
  percentChange: { fontSize: 13, fontWeight: '700', color: '#16A34A' },
  percentChangeNegative: { color: '#DC2626' },
  salesValue: { fontSize: 22, fontWeight: '700', color: colors.navy, marginTop: 6 },
  vsLastMonth: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  errorText: { fontSize: 13, color: '#DC2626', marginBottom: 8, textAlign: 'center' },
  retryButton: { paddingHorizontal: 14, paddingVertical: 8, backgroundColor: colors.white, borderRadius: 8, alignSelf: 'center' },
  retryText: { fontSize: 13, fontWeight: '600', color: colors.navy },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.navy, marginBottom: 10 },
  emptyBox: { backgroundColor: colors.mist, borderRadius: 16, padding: 24, alignItems: 'center', marginBottom: 20 },
  emptyText: { fontSize: 13, color: colors.textMuted },
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
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  pickerSheet: { backgroundColor: colors.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingBottom: 36 },
  pickerTitle: { fontSize: 13, fontWeight: '700', color: colors.textMuted, marginBottom: 12 },
  pickerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border + '22' },
  pickerRowText: { fontSize: 15, fontWeight: '600', color: colors.navy },
});