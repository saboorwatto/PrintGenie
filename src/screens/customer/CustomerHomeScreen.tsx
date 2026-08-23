import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Upload, FileText, Package, Sparkles, ChevronRight, Bell } from 'lucide-react-native';
import { colors } from '../../theme/colors';

export default function CustomerHomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView contentContainerStyle={styles.content}>
               <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Hello, Ali 👋</Text>
            <Text style={styles.subGreeting}>What are we printing today?</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity
              style={styles.bellButton}
              onPress={() => navigation?.navigate?.('Notifications')}
            >
              <Bell size={20} color={colors.navy} />
              <View style={styles.bellDot} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.avatar}
              onPress={() => navigation?.navigate?.('ProfileMenu')}
            >
              <Text style={styles.avatarText}>AH</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.uploadCard}
          onPress={() => navigation?.navigate?.('UploadDesign')}
        >
          <View style={styles.uploadIconBox}>
            <Upload size={20} color={colors.white} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.uploadTitle}>Start a New Quote</Text>
            <Text style={styles.uploadSubtitle}>Upload your design & get an AI price instantly</Text>
          </View>
          <Sparkles size={18} color={colors.gold} />
        </TouchableOpacity>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Active Orders</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>Pending Quotes</Text>
          </View>
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity onPress={() => navigation?.navigate?.('Orders')}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.activityRow}
          onPress={() => navigation?.navigate?.('OrderTracking')}
        >
          <View style={styles.activityIconBox}>
            <Package size={16} color={colors.royalBlue} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.activityTitle}>Business Cards · Order #PG1234</Text>
            <Text style={styles.activitySubtitle}>In Production</Text>
          </View>
          <ChevronRight size={16} color={colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.activityRow}
          onPress={() => navigation?.navigate?.('QuoteResult')}
        >
          <View style={styles.activityIconBox}>
            <FileText size={16} color={colors.royalBlue} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.activityTitle}>Flyers · Quote #Q4521</Text>
            <Text style={styles.activitySubtitle}>Awaiting your response</Text>
          </View>
          <ChevronRight size={16} color={colors.textMuted} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: 20, paddingTop: 50, paddingBottom: 40 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  greeting: { fontSize: 20, fontWeight: '700', color: colors.navy },
  subGreeting: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.gold, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.navy, fontWeight: '800', fontSize: 13 },
  uploadCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.navy,
    borderRadius: 16, padding: 16, marginBottom: 16, gap: 12,
  },
  uploadIconBox: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: colors.royalBlue,
    alignItems: 'center', justifyContent: 'center',
  },
  uploadTitle: { color: colors.white, fontSize: 14, fontWeight: '700' },
  uploadSubtitle: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  statBox: { flex: 1, backgroundColor: colors.mist, borderRadius: 12, padding: 14 },
  statValue: { fontSize: 20, fontWeight: '800', color: colors.navy },
  statLabel: { fontSize: 12, color: colors.slate, marginTop: 4 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.navy },
  seeAll: { fontSize: 12, fontWeight: '600', color: colors.royalBlue },
  activityRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.mist,
    borderRadius: 12, padding: 12, marginBottom: 10, gap: 10,
  },
  activityIconBox: {
    width: 34, height: 34, borderRadius: 10, backgroundColor: colors.white,
    alignItems: 'center', justifyContent: 'center',
  },
  activityTitle: { fontSize: 13, fontWeight: '600', color: colors.navy },
  activitySubtitle: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
    headerIcons: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  bellButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.mist, alignItems: 'center', justifyContent: 'center' },
  bellDot: { position: 'absolute', top: 9, right: 10, width: 8, height: 8, borderRadius: 4, backgroundColor: '#DC2626' },
});