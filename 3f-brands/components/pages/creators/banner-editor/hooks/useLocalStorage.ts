// import { useState, useEffect } from "react";

// interface StoredImageData {
//   image: string;
//   title: string;
//   zoom: number;
// }

// export const useLocalStorage = (key: string, initialValue: StoredImageData) => {
//   // Get initial value from localStorage or use provided initialValue
//   const [storedValue, setStoredValue] = useState<StoredImageData>(() => {
//     try {
//       if (typeof window !== "undefined") {
//         const item = window.localStorage.getItem(key);
//         return item ? JSON.parse(item) : initialValue;
//       }
//     } catch (error) {
//       console.error("Error reading from localStorage:", error);
//       return initialValue;
//     }
//   });

//   // Update localStorage when state changes
//   useEffect(() => {
//     try {
//       window.localStorage.setItem(key, JSON.stringify(storedValue));
//     } catch (error) {
//       console.error("Error writing to localStorage:", error);
//     }
//   }, [key, storedValue]);

//   return [storedValue, setStoredValue] as const;
// };



import { useState, useEffect } from "react";

interface StoredImageData {
  image: string;
  title: string;
  zoom: number;
}

export const useLocalStorage = (key: string, initialValue: StoredImageData) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<StoredImageData>(initialValue);

  // Only try to get from localStorage after component mounts (client-side)
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }
  }, [key]);

  // Update localStorage when state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
};
