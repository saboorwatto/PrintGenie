import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, StatusBar, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Search, MoreVertical } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import Avatar from '../../components/Avatar';
import { fetchUsers } from '../../api/adminApi';

export default function UsersScreen() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');

  const loadUsers = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = users.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerTitle}>Users</Text>

        <View style={styles.searchBox}>
          <Search size={18} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search users..."
            placeholderTextColor={colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {loading ? (
          <View style={styles.stateBox}>
            <ActivityIndicator color={colors.royalBlue} />
          </View>
        ) : error ? (
          <View style={styles.stateBox}>
            <Text style={styles.stateErrorText}>Could not load users</Text>
            <TouchableOpacity onPress={loadUsers} style={styles.stateRetryButton}>
              <Text style={styles.stateRetryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : filteredUsers.length === 0 ? (
          <View style={styles.stateBox}>
            <Text style={styles.stateEmptyText}>No users found</Text>
          </View>
        ) : (
          <View style={styles.list}>
            {filteredUsers.map((user, i) => (
              <View
                key={user.id ?? user.initials + i}
                style={[styles.userRow, i !== filteredUsers.length - 1 && styles.userRowBorder]}
              >
                <Avatar
                  imageUrl={user.imageUrl}
                  initials={user.initials ?? user.name?.charAt(0) ?? '?'}
                  bgColor={colors.royalBlue + '22'}
                  textColor={colors.royalBlue}
                  size={40}
                />

                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                </View>

                <View style={styles.userRight}>
                  <Text style={styles.userRole}>{user.role}</Text>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: user.status === 'Active' ? '#DCFCE7' : colors.mist },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        { color: user.status === 'Active' ? '#16A34A' : colors.slate },
                      ]}
                    >
                      {user.status}
                    </Text>
                  </View>
                </View>

                <MoreVertical size={18} color={colors.textMuted} style={{ marginLeft: 8 }} />
              </View>
            ))}
          </View>
        )}

        {!loading && !error && filteredUsers.length > 0 && (
          <Text style={styles.hint}>
            Tap ⋮ to promote, deactivate, or manage a user's role
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: 20, paddingBottom: 40 },
  headerTitle: { fontSize: 24, fontWeight: '700', color: colors.navy, marginTop: 40, marginBottom: 16 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.mist,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchInput: { marginLeft: 8, flex: 1, fontSize: 14, color: colors.navy },
  list: { backgroundColor: colors.mist, borderRadius: 16, overflow: 'hidden' },
  userRow: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  userRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border + '22' },
  userInfo: { flex: 1, marginLeft: 12 },
  userName: { fontSize: 14, fontWeight: '600', color: colors.navy },
  userEmail: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  userRight: { alignItems: 'flex-end' },
  userRole: { fontSize: 12, color: colors.slate, marginBottom: 4 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  statusText: { fontSize: 11, fontWeight: '600' },
  hint: { fontSize: 12, color: colors.textMuted, textAlign: 'center', marginTop: 16 },
  stateBox: { paddingVertical: 40, alignItems: 'center' },
  stateErrorText: { fontSize: 13, color: '#DC2626', marginBottom: 8 },
  stateRetryButton: { paddingHorizontal: 14, paddingVertical: 8, backgroundColor: colors.mist, borderRadius: 8 },
  stateRetryText: { fontSize: 13, fontWeight: '600', color: colors.navy },
  stateEmptyText: { fontSize: 13, color: colors.textMuted },
});