import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { ArrowLeft, AlertTriangle } from 'lucide-react-native';
import { colors } from '../../theme/colors';

const issueTypes = ['Print Quality Issue', 'Wrong Item Delivered', 'Damaged in Transit', 'Late Delivery', 'Other'];

export default function ComplaintRefundScreen({ navigation }: any) {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [details, setDetails] = useState('');

  const handleSubmit = () => {
    // TODO: wire up to backend complaint/refund endpoint once available
    navigation?.goBack?.();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack?.()}>
          <ArrowLeft size={18} color={colors.navy} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report a Problem</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.orderRef}>Business Cards · Order #PG1234</Text>

        <View style={styles.warningCard}>
          <AlertTriangle size={16} color="#D97706" />
          <Text style={styles.warningText}>
            Refund requests are reviewed within 2-3 business days after submission.
          </Text>
        </View>

        <Text style={styles.label}>What went wrong?</Text>
        <View style={styles.issueList}>
          {issueTypes.map((issue) => (
            <TouchableOpacity
              key={issue}
              style={[styles.issueRow, selectedIssue === issue && styles.issueRowSelected]}
              onPress={() => setSelectedIssue(issue)}
            >
              <View style={[styles.radio, selectedIssue === issue && styles.radioSelected]} />
              <Text style={styles.issueLabel}>{issue}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Describe the issue</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Please provide as much detail as possible..."
          placeholderTextColor={colors.textMuted}
          value={details}
          onChangeText={setDetails}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={[styles.submitButton, !selectedIssue && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={!selectedIssue}
        >
          <Text style={styles.submitButtonText}>Submit Complaint</Text>
        </TouchableOpacity>
      </ScrollView>
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
  body: { paddingHorizontal: 20, paddingBottom: 40 },
  orderRef: { fontSize: 12, color: colors.textMuted, marginBottom: 16 },
  warningCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF3C7',
    borderRadius: 12, padding: 12, marginBottom: 24, gap: 8,
  },
  warningText: { flex: 1, fontSize: 12, color: '#92400E' },
  label: { fontSize: 14, fontWeight: '600', color: colors.slate, marginBottom: 10 },
  issueList: { marginBottom: 20 },
  issueRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.mist,
    borderRadius: 12, padding: 14, marginBottom: 8, gap: 12,
  },
  issueRowSelected: { backgroundColor: colors.royalBlue + '15' },
  radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: colors.border },
  radioSelected: { borderColor: colors.royalBlue, backgroundColor: colors.royalBlue },
  issueLabel: { fontSize: 14, color: colors.navy, fontWeight: '600' },
  textArea: {
    backgroundColor: colors.mist, borderRadius: 12, padding: 14, fontSize: 14,
    color: colors.navy, height: 120, marginBottom: 24,
  },
  submitButton: { backgroundColor: '#DC2626', borderRadius: 12, paddingVertical: 16, alignItems: 'center' },
  submitButtonDisabled: { opacity: 0.4 },
  submitButtonText: { color: colors.white, fontSize: 15, fontWeight: '700' },
});