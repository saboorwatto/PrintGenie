import { API_BASE_URL } from './config';

// Shared across Admin, Customer, and Shop Owner — there's only one
// /api/auth/login endpoint per the SDS, the role comes back in the response.
export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(`Server responded ${res.status}`);
  return res.json(); // expected: { success, token, user: { id, role, name } }
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
  if (!res.ok) throw new Error(`Server responded ${res.status}`);
  return res.json(); // expected: { success, message, userId }
}