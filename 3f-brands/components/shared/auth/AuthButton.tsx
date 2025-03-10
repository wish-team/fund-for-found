"use client";

import { Button } from "@nextui-org/react";
import { useCallback } from "react";
import { useAuthStore } from "@/store/authStore";

export const AuthButton = () => {
  const { supabase } = useAuthStore();

  const handleAuth = useCallback(async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
        },
      });

      if (error) {
        console.error("Auth error:", error.message);
      }
    } catch (error) {
      console.error("Failed to sign in:", error);
    }
  }, [supabase]);

  return (
    <Button
      onClick={handleAuth}
      color="primary"
      variant="solid"
      className="font-medium"
    >
      Sign In
    </Button>
  );
};
