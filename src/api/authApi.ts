import { API_BASE_URL } from './config';

// Shared across Admin, Customer, and Shop Owner — there's only one
// /api/auth/login endpoint per the SDS, the role comes back in the response.
export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `Server responded ${res.status}`);
  return data;
}
export async function register(
  name: string,
  email: string,
  password: string,
  phone: string,
  role: string
) {
  const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, phone, role }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `Server responded ${res.status}`);
  return data;
}
export async function forgotPassword(email: string) {
  const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `Server responded ${res.status}`);
  return data;
}

export async function resetPassword(email: string, code: string, newPassword: string) {
  const res = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code, newPassword }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `Server responded ${res.status}`);
  return data;
}