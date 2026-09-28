import { API_BASE_URL } from './config';
import { getToken } from './authToken';

// Centralizes every Admin panel API call in one place.
// Each function throws on failure so screens can catch it and show
// their existing loading/error/retry UI — same pattern as RevenueChart.

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}


export async function fetchDashboardStats(period: string = 'monthly') {
  const res = await fetch(`${API_BASE_URL}/api/admin/dashboard/stats?period=${period}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`Server responded ${res.status}`);
  return res.json();
}

export async function fetchRevenue(period: string = 'monthly') {
  const res = await fetch(`${API_BASE_URL}/api/admin/reports/revenue?period=${period}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`Server responded ${res.status}`);
  return res.json();
}
export async function fetchReportsSummary(period: string = 'monthly') {
  const res = await fetch(`${API_BASE_URL}/api/admin/reports/summary?period=${period}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`Server responded ${res.status}`);
  return res.json();
}

export async function fetchUsers() {
  const res = await fetch(`${API_BASE_URL}/api/admin/users`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`Server responded ${res.status}`);
  return res.json(); // expected: [{ id, name, email, role, status, imageUrl }, ...]
}

export async function fetchShops() {
  const res = await fetch(`${API_BASE_URL}/api/admin/shops`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`Server responded ${res.status}`);
  return res.json(); // expected: [{ id, name, location, rating, status, imageUrl }, ...]
}

export async function fetchPricingConfig() {
  const res = await fetch(`${API_BASE_URL}/api/admin/pricing`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`Server responded ${res.status}`);
  return res.json();
}

export async function savePricingConfig(config: unknown) {
  const res = await fetch(`${API_BASE_URL}/api/admin/pricing`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(config),
  });
  if (!res.ok) throw new Error(`Server responded ${res.status}`);
  return res.json();
}


export async function promoteUserToAdmin(userId: string) {
  const res = await fetch(`${API_BASE_URL}/api/admin/users/${userId}/promote`, {
    method: 'PUT',
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `Server responded ${res.status}`);
  return data;
}
export async function approveShop(shopId: string) {
  const res = await fetch(`${API_BASE_URL}/api/admin/shops/${shopId}/approve`, {
    method: 'PUT',
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `Server responded ${res.status}`);
  return data;
}

export async function rejectShop(shopId: string) {
  const res = await fetch(`${API_BASE_URL}/api/admin/shops/${shopId}/reject`, {
    method: 'PUT',
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `Server responded ${res.status}`);
  return data;
}
export async function deleteUser(userId: string) {
  const res = await fetch(`${API_BASE_URL}/api/admin/users/${userId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `Server responded ${res.status}`);
  return data;
}