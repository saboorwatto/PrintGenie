import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { ArrowLeft, UploadCloud, CheckCircle2, Info, X } from 'lucide-react-native';
import { colors } from '../../theme/colors';

const activeOrders = [
  { id: 'PG1234', customer: 'Ali Khan', product: 'Business Cards' },
  { id: 'PG1198', customer: 'Sara Ahmed', product: 'A3 Posters' },
];

export default function OwnerDesignProofScreen({ navigation }: any) {
  const [selectedOrderId, setSelectedOrderId] = useState(activeOrders[0]?.id ?? '');
  const [fileName, setFileName] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const selectedOrder = activeOrders.find((o) => o.id === selectedOrderId);

  const handlePickFile = () => {
    // TODO: wire up expo-document-picker or expo-image-picker here
    setFileName('design-proof-v1.pdf');
    setSent(false);
  };

  const handleSend = () => {
    if (!fileName) return;
    // TODO: wire up to POST /api/orders/:id/design-proof from the SDS
    setSent(true);
    setFileName(null);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack?.()}>
            <ArrowLeft size={18} color={colors.navy} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Upload Design Proof</Text>
        </View>
        <Text style={styles.headerSubtitle}>Share a preview with the customer before you print</Text>

        <Text style={styles.sectionLabel}>ORDER</Text>
        <View style={styles.orderPickerRow}>
          {activeOrders.map((order) => (
            <TouchableOpacity
              key={order.id}
              style={[styles.orderPill, selectedOrderId === order.id && styles.orderPillSelected]}
              onPress={() => { setSelectedOrderId(order.id); setSent(false); }}
            >
              <Text style={[styles.orderPillText, selectedOrderId === order.id && styles.orderPillTextSelected]}>
                #{order.id} · {order.product}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.uploadBox} onPress={handlePickFile}>
          {!fileName ? (
            <>
              <View style={styles.uploadIconCircle}>
                <UploadCloud size={22} color={colors.royalBlue} />
              </View>
              <Text style={styles.uploadTitle}>Tap to select the proof</Text>
              <Text style={styles.uploadHint}>PDF, PNG, JPG · up to 10MB</Text>
            </>
          ) : (
            <View style={styles.selectedFileRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.selectedFileName}>{fileName}</Text>
                <Text style={styles.selectedFileHint}>Ready to send</Text>
              </View>
              <TouchableOpacity onPress={() => setFileName(null)}>
                <X size={16} color="#DC2626" />
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>

        {selectedOrder && (
          <View style={styles.infoRow}>
            <Info size={14} color={colors.textMuted} />
            <Text style={styles.infoText}>Sending to {selectedOrder.customer} for order #{selectedOrder.id}</Text>
          </View>
        )}

        {sent && (
          <View style={styles.sentRow}>
            <CheckCircle2 size={14} color="#16A34A" />
            <Text style={styles.sentText}>Proof sent — the customer has been notified.</Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.sendButton, !fileName && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!fileName}
        >
          <Text style={styles.sendButtonText}>Send to customer</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: 20, paddingTop: 50, paddingBottom: 40 },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  backButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.mist, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.navy },
  headerSubtitle: { fontSize: 12, color: colors.textMuted, marginTop: 8, marginBottom: 20 },
  sectionLabel: { fontSize: 11, fontWeight: '700', color: colors.textMuted, letterSpacing: 0.5, marginBottom: 10 },
  orderPickerRow: { gap: 8, marginBottom: 20 },
  orderPill: { backgroundColor: colors.mist, borderRadius: 12, padding: 14 },
  orderPillSelected: { backgroundColor: colors.royalBlue + '15', borderWidth: 1.5, borderColor: colors.royalBlue },
  orderPillText: { fontSize: 13, fontWeight: '600', color: colors.slate },
  orderPillTextSelected: { color: colors.royalBlue },
  uploadBox: {
    borderWidth: 1.5, borderColor: colors.royalBlue + '55', borderStyle: 'dashed', borderRadius: 16,
    alignItems: 'center', justifyContent: 'center', paddingVertical: 32, marginBottom: 16,
  },
  uploadIconCircle: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.mist, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  uploadTitle: { fontSize: 14, fontWeight: '700', color: colors.navy },
  uploadHint: { fontSize: 11, color: colors.textMuted, marginTop: 6 },
  selectedFileRow: { flexDirection: 'row', alignItems: 'center', width: '100%', paddingHorizontal: 20 },
  selectedFileName: { fontSize: 13, fontWeight: '700', color: colors.navy },
  selectedFileHint: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  infoRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.mist, borderRadius: 10, padding: 12, marginBottom: 12, gap: 8 },
  infoText: { fontSize: 11, color: colors.slate, flex: 1 },
  sentRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#DCFCE7', borderRadius: 10, padding: 12, marginBottom: 16, gap: 8 },
  sentText: { fontSize: 12, color: '#166534', flex: 1 },
  sendButton: { backgroundColor: colors.gold, borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
  sendButtonDisabled: { opacity: 0.4 },
  sendButtonText: { color: colors.navy, fontSize: 15, fontWeight: '700' },
});