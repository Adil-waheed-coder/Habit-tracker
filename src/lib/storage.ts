export const MAX_SIZE = 5 * 1024 * 1024; // 5MB in bytes

export const getStorageSize = (): number => {
  let total = 0;
  for (const key in window.localStorage) {
    if (window.localStorage.hasOwnProperty(key)) {
      total += (window.localStorage[key].length + key.length) * 2;
    }
  }
  return total;
};

export const safeSetStorage = (key: string, value: string): boolean => {
  try {
    const currentValStr = window.localStorage.getItem(key) || '';
    const sizeDiff = (value.length - currentValStr.length) * 2;
    const currentSize = getStorageSize();

    if (currentSize + sizeDiff > MAX_SIZE) {
      window.dispatchEvent(new CustomEvent('storageLimitReached'));
      console.error('LocalStorage limit of 5MB reached.');
      return false;
    }

    window.localStorage.setItem(key, value);
    return true;
  } catch (e) {
    if (e instanceof DOMException && e.name === 'QuotaExceededError') {
      window.dispatchEvent(new CustomEvent('storageLimitReached'));
      return false;
    }
    console.error('Error writing to localStorage:', e);
    return false;
  }
};
