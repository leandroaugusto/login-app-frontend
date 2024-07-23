let authToken: string | null = null;
const storageKey: string = '[APP]: token';

export const setAuthToken = (token: string) => {
  authToken = token;
  localStorage.setItem(storageKey, token);
};

export const getAuthToken = (): string | null => {
  if (!authToken) {
    authToken = localStorage.getItem(storageKey);
  }
  return authToken;
};

export const removeAuthToken = () => {
  authToken = null;
  localStorage.removeItem(storageKey);
};
