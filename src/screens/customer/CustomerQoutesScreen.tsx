import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { FileText, ChevronRight } from 'lucide-react-native';
import { colors } from '../../theme/colors';

const quotes = [
  { id: 'Q4521', title: 'Flyers A5', price: 'PKR 780', status: 'Pending', color: '#D97706', bg: '#FEF3C7' },
  { id: 'Q4498', title: 'Business Cards', price: 'PKR 1,250', status: 'Accepted', color: '#16A34A', bg: '#DCFCE7' },
  { id: 'Q4410', title: 'Roll-up Banner', price: 'PKR 2,100', status: 'Expired', color: '#DC2626', bg: '#FEE2E2' },
];

export default function CustomerQuotesScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerTitle}>My Quotes</Text>

        <View style={styles.list}>
          {quotes.map((quote, i) => (
            <TouchableOpacity
              key={quote.id}
              style={[styles.quoteRow, i !== quotes.length - 1 && styles.quoteRowBorder]}
              onPress={() => navigation?.navigate?.('QuoteResult')}
            >
              <View style={styles.quoteIconBox}>
                <FileText size={18} color={colors.royalBlue} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.quoteTitle}>{quote.title}</Text>
                <Text style={styles.quoteMeta}>#{quote.id} · {quote.price}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: quote.bg }]}>
                <Text style={[styles.statusText, { color: quote.color }]}>{quote.status}</Text>
              </View>
              <ChevronRight size={16} color={colors.textMuted} style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: 20, paddingTop: 50, paddingBottom: 40 },
  headerTitle: { fontSize: 24, fontWeight: '700', color: colors.navy, marginBottom: 16 },
  list: { backgroundColor: colors.mist, borderRadius: 16, overflow: 'hidden' },
  quoteRow: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  quoteRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border + '22' },
  quoteIconBox: {
    width: 38, height: 38, borderRadius: 10, backgroundColor: colors.white,
    alignItems: 'center', justifyContent: 'center',
  },
  quoteTitle: { fontSize: 14, fontWeight: '600', color: colors.navy },
  quoteMeta: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  statusText: { fontSize: 10, fontWeight: '700' },
});