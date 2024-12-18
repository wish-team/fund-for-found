import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies(); // Await the promise

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => {
          const cookie = cookieStore.get(name); 
          return cookie ? cookie.value : null;
        },
        set: (name: string, value: string, options: any) => {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            console.error('Cookie set error:', error);
          }
        },
        remove: (name: string, options: any) => {
          try {
            cookieStore.delete({ name, ...options });
          } catch (error) {
            console.error('Cookie remove error:', error);
          }
        },
      },
    }
  );
}
