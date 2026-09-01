// Simple in-memory token store. Swap this for expo-secure-store later
// if you want the token to persist across app restarts.
let currentToken: string | null = null;

export function setToken(token: string) {
  currentToken = token;
}

export function getToken(): string | null {
  return currentToken;
}

export function clearToken() {
  currentToken = null;
}