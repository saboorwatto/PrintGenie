import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { colors } from '../theme/colors';

const models = [
  { name: 'Quote Estimator', status: 'Operational', latency: '120 ms', accuracy: '97%' },
  { name: 'Design Analyzer', status: 'Operational', latency: '210 ms', accuracy: '94%' },
  { name: 'Press Matcher', status: 'Operational', latency: '85 ms', accuracy: '96%' },
];

export default function AIMonitoringScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation?.goBack?.()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>AI Monitoring</Text>
        </View>

        <View style={styles.statusCard}>
          <Text style={styles.statusLabel}>AI MODEL STATUS</Text>
          <Text style={styles.statusValue}>All systems operational</Text>
        </View>

        {models.map((model) => (
          <View key={model.name} style={styles.card}>
            <Text style={styles.cardTitle}>{model.name}</Text>
            <Text style={styles.cardMeta}>Status: {model.status}</Text>
            <Text style={styles.cardMeta}>Latency: {model.latency}</Text>
            <Text style={styles.cardMeta}>Accuracy: {model.accuracy}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: 20, paddingTop: 50, paddingBottom: 40 },
  headerRow: { marginBottom: 20 },
  backText: { fontSize: 14, fontWeight: '600', color: colors.royalBlue, marginBottom: 8 },
  headerTitle: { fontSize: 24, fontWeight: '700', color: colors.navy },
  statusCard: { backgroundColor: colors.navy, borderRadius: 16, padding: 16, marginBottom: 16 },
  statusLabel: { color: colors.gold, fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
  statusValue: { color: colors.white, fontSize: 16, fontWeight: '700' },
  card: { backgroundColor: colors.mist, borderRadius: 16, padding: 16, marginBottom: 12 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: colors.navy, marginBottom: 8 },
  cardMeta: { fontSize: 13, color: colors.slate, marginTop: 2 },
});
