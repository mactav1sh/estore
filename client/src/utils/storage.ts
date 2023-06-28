const STORAGE_PREFIX = '__estore__';

export const storage = {
  setItem(key: string, value: any) {
    window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  },

  getItem(key: string) {
    return JSON.parse(
      window.localStorage.getItem(STORAGE_PREFIX + key) as string
    );
  },

  removeItem(key: string) {
    return window.localStorage.removeItem(STORAGE_PREFIX + key);
  },
};
