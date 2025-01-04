"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useState, useMemo } from "react";
import { User } from "@supabase/supabase-js";
import { supabaseConfig } from "@/utils/supabase/config";

export interface AuthUser {
  id: string;
  email?: string;
  name?: string;
  role?: string;
  avatar_url?: string;
  [key: string]: any;
}

// Create a single instance of the Supabase client outside of the component
const supabase = createBrowserClient(
  supabaseConfig.url,
  supabaseConfig.anonKey
);

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Initial user fetch
    const initializeAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setInitialLoading(false);
      }
    };

    initializeAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Memoize the return value to prevent unnecessary re-renders
  return useMemo(() => ({
    user,
    initialLoading,
    supabase // Export supabase instance if needed elsewhere
  }), [user, initialLoading]);
}