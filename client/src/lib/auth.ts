export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  age?: number;
}

export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
};

export const getAuthUser = (): AuthUser | null => {
  const userStr = localStorage.getItem('authUser');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const setAuthUser = (user: AuthUser): void => {
  localStorage.setItem('authUser', JSON.stringify(user));
};

export const removeAuthUser = (): void => {
  localStorage.removeItem('authUser');
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

export const logout = (): void => {
  removeAuthToken();
  removeAuthUser();
};
