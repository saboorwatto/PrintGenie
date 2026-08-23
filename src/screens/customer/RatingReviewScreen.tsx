import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, StatusBar } from 'react-native';
import { ArrowLeft, Star } from 'lucide-react-native';
import { colors } from '../../theme/colors';

export default function RatingReviewScreen({ navigation }: any) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = () => {
    // TODO: wire up to POST /api/feedback (Feedbacks table) from the SDS
    navigation?.goBack?.();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack?.()}>
          <ArrowLeft size={18} color={colors.navy} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rate & Review</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.orderRef}>Business Cards · Order #PG1234</Text>
        <Text style={styles.prompt}>How was your experience with this order?</Text>

        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <Star
                size={36}
                color={colors.gold}
                fill={star <= rating ? colors.gold : 'transparent'}
                style={{ marginHorizontal: 4 }}
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Write a review (optional)</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Tell us about the print quality, delivery time, and packaging..."
          placeholderTextColor={colors.textMuted}
          value={review}
          onChangeText={setReview}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={[styles.submitButton, rating === 0 && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={rating === 0}
        >
          <Text style={styles.submitButtonText}>Submit Review</Text>
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
  orderRef: { fontSize: 12, color: colors.textMuted, marginBottom: 4 },
  prompt: { fontSize: 16, fontWeight: '700', color: colors.navy, marginBottom: 20 },
  starsRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 28 },
  label: { fontSize: 14, fontWeight: '600', color: colors.slate, marginBottom: 8 },
  textArea: {
    backgroundColor: colors.mist, borderRadius: 12, padding: 14, fontSize: 14,
    color: colors.navy, height: 120, marginBottom: 24,
  },
  submitButton: { backgroundColor: colors.gold, borderRadius: 12, paddingVertical: 16, alignItems: 'center' },
  submitButtonDisabled: { opacity: 0.4 },
  submitButtonText: { color: colors.navy, fontSize: 15, fontWeight: '700' },
});