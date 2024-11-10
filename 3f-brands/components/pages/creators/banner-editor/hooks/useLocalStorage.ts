import { useState, useEffect } from 'react';

interface StoredImageData {
  image: string;
  title: string;
  zoom: number;
}

export const useLocalStorage = (key: string, initialValue: StoredImageData) => {
  // Get initial value from localStorage or use provided initialValue
  const [storedValue, setStoredValue] = useState<StoredImageData>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
};