export function setTokens(access: string, refresh: string) {
  localStorage.setItem('accessToken', access);
  localStorage.setItem('refreshToken', refresh);
}

export function getAccessToken(): string {
  return localStorage.getItem('accessToken');
}

export function getRefreshToken(): string {
  return localStorage.getItem('refreshToken');
}
