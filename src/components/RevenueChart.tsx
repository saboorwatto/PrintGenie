import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { colors } from '../theme/colors';
import { API_BASE_URL } from '../api/config';

type RevenuePoint = { label: string; amount: number };

export default function RevenueChart() {
  const [data, setData] = useState<RevenuePoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRevenue = async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: swap this path once the real endpoint exists,
      // e.g. `${API_BASE_URL}/api/admin/reports/revenue?range=monthly`
      const response = await fetch(`${API_BASE_URL}/api/admin/reports/revenue`);
      if (!response.ok) throw new Error(`Server responded ${response.status}`);
      const json = await response.json();
      setData(json);
    } catch (err: any) {
      setError('Could not load revenue data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenue();
  }, []);

  if (loading) {
    return (
      <View style={styles.stateBox}>
        <ActivityIndicator color={colors.royalBlue} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.stateBox}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={fetchRevenue} style={styles.retryButton}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View style={styles.stateBox}>
        <Text style={styles.emptyText}>No revenue data yet</Text>
      </View>
    );
  }

  return (
    <LineChart
      style={{ height: 120, marginTop: 12 }}
      data={data.map((d) => d.amount)}
      svg={{ stroke: colors.royalBlue, strokeWidth: 2 }}
      curve={shape.curveMonotoneX}
      contentInset={{ top: 10, bottom: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  stateBox: { height: 120, marginTop: 12, alignItems: 'center', justifyContent: 'center' },
  errorText: { fontSize: 12, color: '#DC2626', marginBottom: 8 },
  retryButton: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: colors.mist, borderRadius: 8 },
  retryText: { fontSize: 12, fontWeight: '600', color: colors.navy },
  emptyText: { fontSize: 12, color: colors.textMuted },
});