import { create } from "zustand";
import { createBrowserClient } from "@supabase/ssr";
import { User } from "@supabase/supabase-js";
import { supabaseConfig } from "@/utils/supabase/config";

interface AuthState {
  user: User | null;
  initialLoading: boolean;
  supabase: ReturnType<typeof createBrowserClient>;
  initializeAuth: () => Promise<void>;
  setUser: (user: User | null) => void;
  setInitialLoading: (loading: boolean) => void;
}

const supabase = createBrowserClient(
  supabaseConfig.url,
  supabaseConfig.anonKey
);

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  initialLoading: true,
  supabase,

  initializeAuth: async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      set({ user });
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      set({ initialLoading: false });
    }
  },

  setUser: (user) => set({ user }),
  setInitialLoading: (loading) => set({ initialLoading: loading }),
}));

// Setup auth state listener
if (typeof window !== "undefined") {
  supabase.auth.onAuthStateChange((event, session) => {
    useAuthStore.getState().setUser(session?.user || null);
  });
}
