import { create } from 'zustand';

interface ProfileState {
  selectedImage: string | null;
  tempImage: string | null;
  setTempImage: (image: string | null) => void;
  saveImage: (image: string | null) => void;
  subscribers: Set<() => void>;
  subscribe: (callback: () => void) => () => void;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  selectedImage: typeof window !== 'undefined' ? localStorage.getItem('profileImage') : null,
  tempImage: null,
  subscribers: new Set(),
  setTempImage: (image) => set({ tempImage: image }),
  saveImage: (image) => {
    set({ selectedImage: image });
    if (image) {
      localStorage.setItem('profileImage', image);
    } else {
      localStorage.removeItem('profileImage');
    }
    // Notify all subscribers
    get().subscribers.forEach(callback => callback());
  },
  subscribe: (callback) => {
    get().subscribers.add(callback);
    return () => {
      get().subscribers.delete(callback);
    };
  }
}));