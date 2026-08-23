import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { ArrowLeft, UploadCloud, Sparkles } from 'lucide-react-native';
import { colors } from '../../theme/colors';

export default function UploadDesignScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack?.()}>
          <ArrowLeft size={18} color={colors.navy} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upload Your Design</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.uploadBox}>
          <View style={styles.uploadIconCircle}>
            <UploadCloud size={22} color={colors.royalBlue} />
          </View>
          <Text style={styles.uploadTitle}>Drag & drop your file here</Text>
          <Text style={styles.uploadSubtitle}>or browse from your device</Text>
          <Text style={styles.uploadHint}>PDF, PNG, JPG · up to 10MB</Text>
        </View>

        <View style={styles.aiCard}>
          <View style={styles.aiIconBox}>
            <Sparkles size={18} color={colors.gold} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.aiTitle}>AI Detecting Features...</Text>
            <Text style={styles.aiSubtitle}>Analyzing your uploaded design</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.analyzeButton}
          onPress={() => navigation?.navigate?.('DesignEditor')}
        >
          <Sparkles size={16} color={colors.navy} />
          <Text style={styles.analyzeButtonText}>Analyze & Get Quote</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingTop: 50, paddingHorizontal: 20, paddingBottom: 16 },
  backButton: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: colors.mist,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.navy },
  body: { flex: 1, paddingHorizontal: 20 },
  uploadBox: {
    borderWidth: 1.5, borderColor: colors.royalBlue + '55', borderStyle: 'dashed',
    borderRadius: 16, alignItems: 'center', justifyContent: 'center', paddingVertical: 36, marginBottom: 16,
  },
  uploadIconCircle: {
    width: 52, height: 52, borderRadius: 26, backgroundColor: colors.mist,
    alignItems: 'center', justifyContent: 'center', marginBottom: 14,
  },
  uploadTitle: { fontSize: 15, fontWeight: '700', color: colors.navy },
  uploadSubtitle: { fontSize: 13, color: colors.textMuted, marginTop: 4 },
  uploadHint: { fontSize: 11, color: colors.textMuted, marginTop: 10 },
  aiCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.navy,
    borderRadius: 14, padding: 14, marginBottom: 20,
  },
  aiIconBox: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: colors.white + '15',
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  aiTitle: { color: colors.white, fontSize: 14, fontWeight: '700' },
  aiSubtitle: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  analyzeButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.gold, borderRadius: 12, paddingVertical: 16, gap: 8,
  },
  analyzeButtonText: { color: colors.navy, fontSize: 15, fontWeight: '700' },
});