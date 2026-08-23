import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { ArrowLeft, Package, CheckCircle2, CreditCard, MessageSquare, Bell } from 'lucide-react-native';
import { colors } from '../../theme/colors';

const notifications = [
  { icon: Package, iconBg: '#DBEAFE', iconColor: '#2563EB', title: 'Order Shipped', message: 'Order #PG1234 is on its way. Tracking #TRK9981.', time: '2 hours ago', unread: true },
  { icon: CheckCircle2, iconBg: '#DCFCE7', iconColor: '#16A34A', title: 'Payment Confirmed', message: 'Your payment of PKR 1,250 was successful.', time: '1 day ago', unread: true },
  { icon: CreditCard, iconBg: '#FEF3C7', iconColor: '#D97706', title: 'Quote Ready', message: 'Your AI quote for Flyers A5 is ready to review.', time: '2 days ago', unread: false },
  { icon: MessageSquare, iconBg: '#DBEAFE', iconColor: '#2563EB', title: 'Shop Replied', message: 'ColorMax Press responded to your order query.', time: '3 days ago', unread: false },
];

export default function NotificationsScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack?.()}>
          <ArrowLeft size={18} color={colors.navy} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {notifications.map((n, i) => {
          const Icon = n.icon;
          return (
            <View
              key={n.title + i}
              style={[styles.notifRow, n.unread && styles.notifRowUnread]}
            >
              <View style={[styles.iconBox, { backgroundColor: n.iconBg }]}>
                <Icon size={18} color={n.iconColor} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.notifTitle}>{n.title}</Text>
                <Text style={styles.notifMessage}>{n.message}</Text>
                <Text style={styles.notifTime}>{n.time}</Text>
              </View>
              {n.unread && <View style={styles.unreadDot} />}
            </View>
          );
        })}
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
  notifRow: {
    flexDirection: 'row', alignItems: 'flex-start', backgroundColor: colors.white,
    borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: colors.border + '22',
  },
  notifRowUnread: { backgroundColor: colors.mist, borderColor: 'transparent' },
  iconBox: { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  notifTitle: { fontSize: 14, fontWeight: '700', color: colors.navy },
  notifMessage: { fontSize: 12, color: colors.slate, marginTop: 3, lineHeight: 17 },
  notifTime: { fontSize: 11, color: colors.textMuted, marginTop: 6 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.royalBlue, marginTop: 6, marginLeft: 8 },
});