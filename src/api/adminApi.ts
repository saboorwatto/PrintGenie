import { API_BASE_URL } from './config';
import { getToken } from './authToken';

// Centralizes every Admin panel API call in one place.
// Each function throws on failure so screens can catch it and show
// their existing loading/error/retry UI — same pattern as RevenueChart.

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}


export async function fetchDashboardStats() {
  const res = await fetch(`${API_BASE_URL}/api/admin/dashboard/stats`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`Server responded ${res.status}`);
  return res.json(); // expected: { totalOrders, customers, totalRevenue }
}

export async function fetchRevenue() {
  const res = await fetch(`${API_BASE_URL}/api/admin/reports/revenue`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`Server responded ${res.status}`);
  return res.json(); // expected: [{ label, amount }, ...]
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

export async function fetchAIModelStatus() {
  const res = await fetch(`${API_BASE_URL}/api/admin/ai-monitoring`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`Server responded ${res.status}`);
  return res.json();
}