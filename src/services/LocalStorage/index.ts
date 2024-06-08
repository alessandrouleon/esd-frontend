const TOKEN_NAME = '@auth:esd';
const USER_NAME = '@username:esd';

export const UserToken = {
  setLocalStorageToken: (token: string) => localStorage.setItem(TOKEN_NAME, token),
  setLocalStorageName: (name: string) => localStorage.setItem(USER_NAME, name),

  getLocalStorageToken: (): string | null => localStorage.getItem(TOKEN_NAME),
  getLocalStorageName: (): string | null => localStorage.getItem(USER_NAME),

  removeLocalStorageToken: () => localStorage.removeItem(TOKEN_NAME),
  removeLocalStorageName: () => localStorage.removeItem(USER_NAME),
};
