import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { LineChart, XAxis, YAxis, Grid } from 'react-native-svg-charts';
import { Circle } from 'react-native-svg';
import * as shape from 'd3-shape';
import { colors } from '../theme/colors';
import { fetchRevenue } from '../api/adminApi';

type RevenuePoint = { label: string; amount: number };

const Decorator = ({ x, y, data }: any) =>
  data.map((value: number, index: number) => (
    <Circle
      key={index}
      cx={x(index)}
      cy={y(value)}
      r={4}
      stroke={colors.royalBlue}
      fill={colors.white}
      strokeWidth={2}
    />
  ));

export default function RevenueChart({ period = 'monthly' }: { period?: string }) {
  const [data, setData] = useState<RevenuePoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRevenue = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchRevenue(period);
      setData(result);
    } catch (err: any) {
      setError(err?.message || 'Could not load revenue data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRevenue();
  }, [period]);

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
        <TouchableOpacity onPress={loadRevenue} style={styles.retryButton}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View style={styles.stateBox}>
        <Text style={styles.emptyText}>No revenue data for this period</Text>
      </View>
    );
  }

  const amounts = data.map((d) => d.amount);
  // Show every label if there are few points, otherwise thin them out so text doesn't overlap
  const labelStep = Math.max(1, Math.ceil(data.length / 5));
  const xLabels = data.map((d, i) => {
    if (i % labelStep !== 0) return '';
    const parts = d.label.split('-');
    return `${parts[1]}/${parts[2]}`; // MM/DD
  });

  return (
    <View>
      <View style={styles.chartRow}>
        <YAxis
          data={amounts}
          contentInset={{ top: 16, bottom: 16 }}
          svg={{ fill: colors.textMuted, fontSize: 10 }}
          numberOfTicks={4}
          formatLabel={(value: number) =>
            value >= 1000 ? `${(value / 1000).toFixed(0)}k` : `${value}`
          }
        />
        <View style={styles.chartBody}>
          <LineChart
            style={{ height: 130 }}
            data={amounts}
            svg={{ stroke: colors.royalBlue, strokeWidth: 2 }}
            curve={shape.curveMonotoneX}
            contentInset={{ top: 16, bottom: 16, left: 8, right: 8 }}
          >
            <Grid svg={{ stroke: colors.border, strokeOpacity: 0.3 }} />
            <Decorator />
          </LineChart>
          <XAxis
            style={{ marginTop: 6 }}
            data={amounts}
            formatLabel={(_value: number, index: number) => xLabels[index]}
            contentInset={{ left: 8, right: 8 }}
            svg={{ fill: colors.textMuted, fontSize: 10 }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stateBox: { height: 120, marginTop: 12, alignItems: 'center', justifyContent: 'center' },
  errorText: { fontSize: 12, color: '#DC2626', marginBottom: 8 },
  retryButton: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: colors.mist, borderRadius: 8 },
  retryText: { fontSize: 12, fontWeight: '600', color: colors.navy },
  emptyText: { fontSize: 12, color: colors.textMuted },
  chartRow: { flexDirection: 'row', marginTop: 12 },
  chartBody: { flex: 1, marginLeft: 8 },
});