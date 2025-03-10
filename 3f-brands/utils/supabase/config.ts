export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  authRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
} as const;
