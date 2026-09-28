import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, StatusBar, ActivityIndicator, TouchableOpacity, RefreshControl, Modal } from 'react-native';
import { Search, MoreVertical, UserCheck, UserX, Shield, Trash2, ArrowLeft } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import Avatar from '../../components/Avatar';
import { fetchUsers, toggleUserStatus, promoteUserToAdmin, deleteUser } from '../../api/adminApi';

const roleColors: Record<string, { bg: string; text: string }> = {
  customer: { bg: '#DBEAFE', text: '#2563EB' },
  shopOwner: { bg: '#FEF3C7', text: '#D97706' },
  admin: { bg: '#EDE9FE', text: '#7C3AED' },
};

const roleLabels: Record<string, string> = {
  customer: 'Customer',
  shopOwner: 'Shop Owner',
  admin: 'Admin',
};

export default function UsersScreen() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [menuUserId, setMenuUserId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const loadUsers = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true); else setLoading(true);
    setError(false);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = users
    .filter((u) => u.name?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (a.role === 'admin' && b.role !== 'admin') return -1;
      if (a.role !== 'admin' && b.role === 'admin') return 1;
      return 0;
    });

  const activeMenuUser = users.find((u) => (u.id ?? u._id) === menuUserId);

  const closeMenu = () => {
    setMenuUserId(null);
    setConfirmingDelete(false);
  };

  const handleToggleStatus = async () => {
    if (!activeMenuUser) return;
    setActionLoading(true);
    try {
      await toggleUserStatus(activeMenuUser.id ?? activeMenuUser._id);
      closeMenu();
      loadUsers();
    } catch (err) {
      console.log('Toggle status failed:', err);
      closeMenu();
    } finally {
      setActionLoading(false);
    }
  };

  const handlePromote = async () => {
    if (!activeMenuUser) return;
    setActionLoading(true);
    try {
      await promoteUserToAdmin(activeMenuUser.id ?? activeMenuUser._id);
      closeMenu();
      loadUsers();
    } catch (err) {
      console.log('Promote failed:', err);
      closeMenu();
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!activeMenuUser) return;
    setActionLoading(true);
    try {
      await deleteUser(activeMenuUser.id ?? activeMenuUser._id);
      closeMenu();
      loadUsers();
    } catch (err) {
      console.log('Delete failed:', err);
      closeMenu();
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => loadUsers(true)} tintColor={colors.royalBlue} />
        }
      >
        <Text style={styles.headerTitle}>Users</Text>
        <Text style={styles.headerSubtitle}>{users.length} total accounts</Text>

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
            <TouchableOpacity onPress={() => loadUsers()} style={styles.stateRetryButton}>
              <Text style={styles.stateRetryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : filteredUsers.length === 0 ? (
          <View style={styles.stateBox}>
            <Text style={styles.stateEmptyText}>
              {search ? `No users matching "${search}"` : 'No users yet'}
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            {filteredUsers.map((user, i) => {
              const roleStyle = roleColors[user.role] ?? { bg: colors.mist, text: colors.slate };
              return (
                <View
                  key={user.id ?? user._id ?? user.initials + i}
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
                    <View style={[styles.roleBadge, { backgroundColor: roleStyle.bg }]}>
                      <Text style={[styles.roleBadgeText, { color: roleStyle.text }]}>
                        {roleLabels[user.role] ?? user.role}
                      </Text>
                    </View>
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

                  <TouchableOpacity onPress={() => setMenuUserId(user.id ?? user._id)}>
                    <MoreVertical size={18} color={colors.textMuted} style={{ marginLeft: 8 }} />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}

        {!loading && !error && filteredUsers.length > 0 && (
          <Text style={styles.hint}>
            Tap ⋮ to promote, deactivate, delete, or manage a user's role
          </Text>
        )}
      </ScrollView>

      <Modal visible={!!menuUserId} transparent animationType="fade" onRequestClose={closeMenu}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={closeMenu} />
          <View style={styles.actionSheet}>
            {confirmingDelete ? (
              <>
                <View style={styles.confirmHeaderRow}>
                  <TouchableOpacity onPress={() => setConfirmingDelete(false)}>
                    <ArrowLeft size={18} color={colors.navy} />
                  </TouchableOpacity>
                  <Text style={styles.actionSheetTitle}>Delete {activeMenuUser?.name}?</Text>
                </View>
                <Text style={styles.confirmText}>
                  This permanently removes the account and cannot be undone.
                </Text>
                <TouchableOpacity
                  style={styles.confirmDeleteButton}
                  onPress={handleDelete}
                  disabled={actionLoading}
                >
                  {actionLoading ? (
                    <ActivityIndicator color={colors.white} />
                  ) : (
                    <Text style={styles.confirmDeleteButtonText}>Yes, delete permanently</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionCancel} onPress={() => setConfirmingDelete(false)}>
                  <Text style={styles.actionCancelText}>Cancel</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.actionSheetTitle}>{activeMenuUser?.name}</Text>
                <TouchableOpacity style={styles.actionRow} onPress={handlePromote} disabled={actionLoading}>
                  <Shield size={18} color={colors.royalBlue} />
                  <Text style={styles.actionLabel}>Promote to Admin</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionRow} onPress={handleToggleStatus} disabled={actionLoading}>
                  {activeMenuUser?.status === 'Active' ? (
                    <UserX size={18} color="#DC2626" />
                  ) : (
                    <UserCheck size={18} color="#16A34A" />
                  )}
                  <Text style={styles.actionLabel}>
                    {activeMenuUser?.status === 'Active' ? 'Deactivate account' : 'Reactivate account'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionRow}
                  onPress={() => setConfirmingDelete(true)}
                  disabled={actionLoading}
                >
                  <Trash2 size={18} color="#DC2626" />
                  <Text style={[styles.actionLabel, { color: '#DC2626' }]}>Delete account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionCancel} onPress={closeMenu}>
                  <Text style={styles.actionCancelText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: 20, paddingBottom: 40 },
  headerTitle: { fontSize: 24, fontWeight: '700', color: colors.navy, marginTop: 40 },
  headerSubtitle: { fontSize: 13, color: colors.textMuted, marginTop: 2, marginBottom: 16 },
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
  roleBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20, marginBottom: 4 },
  roleBadgeText: { fontSize: 10, fontWeight: '700' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  statusText: { fontSize: 11, fontWeight: '600' },
  hint: { fontSize: 12, color: colors.textMuted, textAlign: 'center', marginTop: 16 },
  stateBox: { paddingVertical: 40, alignItems: 'center' },
  stateErrorText: { fontSize: 13, color: '#DC2626', marginBottom: 8 },
  stateRetryButton: { paddingHorizontal: 14, paddingVertical: 8, backgroundColor: colors.mist, borderRadius: 8 },
  stateRetryText: { fontSize: 13, fontWeight: '600', color: colors.navy },
  stateEmptyText: { fontSize: 13, color: colors.textMuted },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  actionSheet: { backgroundColor: colors.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingBottom: 36 },
  actionSheetTitle: { fontSize: 15, fontWeight: '700', color: colors.navy, marginBottom: 16, textAlign: 'center' },
  actionRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border + '22' },
  actionLabel: { fontSize: 14, fontWeight: '600', color: colors.navy },
  actionCancel: { paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  actionCancelText: { fontSize: 14, fontWeight: '700', color: colors.textMuted },
  confirmHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 4 },
  confirmText: { fontSize: 13, color: colors.textMuted, textAlign: 'center', marginVertical: 16, lineHeight: 19 },
  confirmDeleteButton: { backgroundColor: '#DC2626', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginBottom: 8 },
  confirmDeleteButtonText: { color: colors.white, fontSize: 14, fontWeight: '700' },
});