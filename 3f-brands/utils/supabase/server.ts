import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseConfig } from "./config";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseConfig.url, supabaseConfig.anonKey, {
    cookies: {
      get: (name: string) => {
        return cookieStore.get(name)?.value ?? null;
      },
      set: (name: string, value: string, options: any) => {
        try {
          cookieStore.set({ name, value, ...options });
        } catch (error) {
          console.error("Cookie set error:", error);
        }
      },
      remove: (name: string, options: any) => {
        try {
          cookieStore.delete({ name, ...options });
        } catch (error) {
          console.error("Cookie remove error:", error);
        }
      },
    },
  });
}
