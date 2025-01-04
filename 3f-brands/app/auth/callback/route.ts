import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseConfig } from "@/utils/supabase/config";

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const origin = requestUrl.origin;

    if (code) {
      // Await the cookies promise
      const cookieStore = await cookies();
      
      const supabase = createServerClient(
        supabaseConfig.url,
        supabaseConfig.anonKey,
        {
          cookies: {
            get(name: string) {
              return cookieStore.get(name)?.value;
            },
            set(name: string, value: string, options: any) {
              cookieStore.set({ name, value, ...options });
            },
            remove(name: string, options: any) {
              cookieStore.delete({ name });
            },
          },
        }
      );

      await supabase.auth.exchangeCodeForSession(code);
    }

    return NextResponse.redirect(`${origin}/protected`);
  } catch (error) {
    console.error('Auth callback error:', error);
    return NextResponse.redirect(`${origin}/auth/error`);
  }
}
