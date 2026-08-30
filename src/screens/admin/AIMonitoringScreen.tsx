import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { Cpu, Zap, AlertTriangle, CheckCircle2 } from 'lucide-react-native';
import { colors } from '../../theme/colors';

const models = [
  { name: 'YOLOv8 — Shape Detection', status: 'Healthy', accuracy: '94.2%', avgTime: '1.8s' },
  { name: 'CNN — Material Classifier', status: 'Healthy', accuracy: '91.7%', avgTime: '2.1s' },
];

const recentIssues = [
  { time: '2 hours ago', message: 'Microservice response time spiked to 6.2s (above 5s target)' },
  { time: '1 day ago', message: 'Fallback triggered — AI service unavailable for 4 minutes' },
];

export default function AIMonitoringScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerTitle}>AI Model Monitoring</Text>
        <Text style={styles.headerSubtitle}>Python microservice · YOLOv8 + CNN pipeline</Text>

        <View style={styles.statusBanner}>
          <CheckCircle2 size={16} color="#16A34A" />
          <Text style={styles.statusBannerText}>All systems operational</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>2.1s</Text>
            <Text style={styles.statLabel}>Avg Response Time</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>99.4%</Text>
            <Text style={styles.statLabel}>Uptime (30d)</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Model Health</Text>
        <View style={styles.modelList}>
          {models.map((m, i) => (
            <View
              key={m.name}
              style={[styles.modelRow, i !== models.length - 1 && styles.modelRowBorder]}
            >
              <View style={styles.modelIconBox}>
                <Cpu size={18} color={colors.royalBlue} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.modelName}>{m.name}</Text>
                <Text style={styles.modelMeta}>Accuracy {m.accuracy} · Avg {m.avgTime}</Text>
              </View>
              <View style={styles.healthBadge}>
                <Text style={styles.healthBadgeText}>{m.status}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Recent Issues</Text>
        <View style={styles.issueList}>
          {recentIssues.map((issue, i) => (
            <View
              key={issue.time + i}
              style={[styles.issueRow, i !== recentIssues.length - 1 && styles.issueRowBorder]}
            >
              <AlertTriangle size={16} color="#D97706" />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.issueMessage}>{issue.message}</Text>
                <Text style={styles.issueTime}>{issue.time}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.fallbackNote}>
          <Zap size={14} color={colors.gold} />
          <Text style={styles.fallbackText}>
            Manual quotation fallback is active whenever the AI microservice is unreachable, so customers can still receive pricing.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: 20, paddingBottom: 40 },
  headerTitle: { fontSize: 24, fontWeight: '700', color: colors.navy, marginTop: 40 },
  headerSubtitle: { fontSize: 13, color: colors.textMuted, marginTop: 4, marginBottom: 16 },
  statusBanner: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#DCFCE7',
    borderRadius: 12, padding: 12, marginBottom: 20, gap: 8,
  },
  statusBannerText: { fontSize: 13, fontWeight: '700', color: '#166534' },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  statBox: { flex: 1, backgroundColor: colors.mist, borderRadius: 12, padding: 14 },
  statValue: { fontSize: 20, fontWeight: '800', color: colors.navy },
  statLabel: { fontSize: 12, color: colors.slate, marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.navy, marginBottom: 10 },
  modelList: { backgroundColor: colors.mist, borderRadius: 16, overflow: 'hidden', marginBottom: 20 },
  modelRow: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  modelRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border + '22' },
  modelIconBox: {
    width: 38, height: 38, borderRadius: 10, backgroundColor: colors.white,
    alignItems: 'center', justifyContent: 'center',
  },
  modelName: { fontSize: 13, fontWeight: '700', color: colors.navy },
  modelMeta: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  healthBadge: { backgroundColor: '#DCFCE7', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  healthBadgeText: { fontSize: 11, fontWeight: '700', color: '#16A34A' },
  issueList: { backgroundColor: colors.mist, borderRadius: 16, overflow: 'hidden', marginBottom: 20 },
  issueRow: { flexDirection: 'row', alignItems: 'flex-start', padding: 14 },
  issueRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border + '22' },
  issueMessage: { fontSize: 12, color: colors.navy, lineHeight: 17 },
  issueTime: { fontSize: 11, color: colors.textMuted, marginTop: 4 },
  fallbackNote: {
    flexDirection: 'row', backgroundColor: colors.navy, borderRadius: 12,
    padding: 14, gap: 10, alignItems: 'flex-start',
  },
  fallbackText: { flex: 1, fontSize: 12, color: colors.textMuted, lineHeight: 17 },
});