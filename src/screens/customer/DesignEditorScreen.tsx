import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { ArrowLeft, Type, Undo2, Redo2, Save } from 'lucide-react-native';
import { colors } from '../../theme/colors';

const colorSwatches = [colors.navy, colors.royalBlue, colors.gold, '#DC2626', '#16A34A', '#0EA5E9'];

export default function DesignEditorScreen({ navigation }: any) {
  const [canvasText, setCanvasText] = useState('Your Company Name');
  const [textColor, setTextColor] = useState(colors.navy);
  const [fontSize, setFontSize] = useState(24);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack?.()}>
          <ArrowLeft size={18} color={colors.navy} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Customize Design</Text>
        <View style={styles.historyRow}>
          <TouchableOpacity style={styles.historyButton}>
            <Undo2 size={16} color={colors.slate} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.historyButton}>
            <Redo2 size={16} color={colors.slate} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Canvas preview */}
      <View style={styles.canvas}>
        <Text style={[styles.canvasText, { color: textColor, fontSize }]}>{canvasText}</Text>
      </View>

      <ScrollView style={styles.controls} contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={styles.controlGroup}>
          <View style={styles.controlLabelRow}>
            <Type size={14} color={colors.slate} />
            <Text style={styles.controlLabel}>Text</Text>
          </View>
          <TextInput
            style={styles.textInput}
            value={canvasText}
            onChangeText={setCanvasText}
            placeholder="Enter your text"
            placeholderTextColor={colors.textMuted}
          />
        </View>

        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Color</Text>
          <View style={styles.swatchRow}>
            {colorSwatches.map((c) => (
              <TouchableOpacity
                key={c}
                onPress={() => setTextColor(c)}
                style={[
                  styles.swatch,
                  { backgroundColor: c },
                  textColor === c && styles.swatchSelected,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Size</Text>
          <View style={styles.sizeRow}>
            {[16, 24, 32, 40].map((size) => (
              <TouchableOpacity
                key={size}
                onPress={() => setFontSize(size)}
                style={[styles.sizePill, fontSize === size && styles.sizePillSelected]}
              >
                <Text style={[styles.sizePillText, fontSize === size && styles.sizePillTextSelected]}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => navigation?.navigate?.('QuoteResult')}
        >
          <Save size={16} color={colors.navy} />
          <Text style={styles.saveButtonText}>Save Design & Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingTop: 50, paddingHorizontal: 20, paddingBottom: 12 },
  backButton: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: colors.mist,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.navy, flex: 1 },
  historyRow: { flexDirection: 'row', gap: 8 },
  historyButton: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: colors.mist,
    alignItems: 'center', justifyContent: 'center',
  },
  canvas: {
    height: 200, marginHorizontal: 20, borderRadius: 16, backgroundColor: colors.mist,
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
    borderWidth: 1, borderColor: colors.border + '33',
  },
  canvasText: { fontWeight: '700' },
  controls: { flex: 1, paddingHorizontal: 20 },
  controlGroup: { marginBottom: 20 },
  controlLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  controlLabel: { fontSize: 13, fontWeight: '700', color: colors.slate, marginBottom: 8 },
  textInput: {
    backgroundColor: colors.mist, borderRadius: 10, paddingHorizontal: 14,
    paddingVertical: 12, fontSize: 14, color: colors.navy,
  },
  swatchRow: { flexDirection: 'row', gap: 10 },
  swatch: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: 'transparent' },
  swatchSelected: { borderColor: colors.navy },
  sizeRow: { flexDirection: 'row', gap: 8 },
  sizePill: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: colors.mist,
  },
  sizePillSelected: { backgroundColor: colors.navy },
  sizePillText: { fontSize: 13, fontWeight: '600', color: colors.slate },
  sizePillTextSelected: { color: colors.white },
  footer: { paddingHorizontal: 20, paddingBottom: 24, paddingTop: 8 },
  saveButton: {
    flexDirection: 'row', backgroundColor: colors.gold, borderRadius: 12,
    paddingVertical: 15, alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  saveButtonText: { color: colors.navy, fontSize: 15, fontWeight: '700' },
});