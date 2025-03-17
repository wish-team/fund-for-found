"use server";

import { BrandFormData } from "../types/brandForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { createServerClient } from "@supabase/ssr";
import { supabaseConfig } from "@/utils/supabase/config";

export async function createBrand(formData: BrandFormData) {
  try {
    // Use the API from the environment variable
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    
    // Check if we have auth tokens and user info
    const cookieStore = await cookies();
    
    // Debug: Log all available cookies
    console.log("Available cookies:", cookieStore.getAll().map(c => c.name));
    
    // Get auth tokens
    const authToken0 = cookieStore.get("sb-ginjmrvsyfbvxccpdqhq-auth-token")?.value;
    const accessToken = cookieStore.get("sb-ginjmrvsyfbvxccpdqhq-auth-token.0")?.value;
    const refreshToken = cookieStore.get("sb-ginjmrvsyfbvxccpdqhq-auth-token.1")?.value;
    
    
    console.log("Auth tokens:", { 
      hasAuthToken0: !!authToken0,
      hasAccessToken: !!accessToken, 
      hasRefreshToken: !!refreshToken 
    });

    // Create Supabase client to get session
    const supabase = createServerClient(
      supabaseConfig.url,
      supabaseConfig.anonKey,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            // This won't be used in this function, but required for the client
          },
          remove(name: string, options: any) {
            // This won't be used in this function, but required for the client
          },
        },
      }
    );
    
    // Get user session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!baseUrl) {
      throw new Error("API base URL is not defined");
    }
    
    // Get access token from session if available
    const sessionToken = session?.access_token;
    console.log("Has session token:", !!sessionToken);
    
    // Use the most reliable token source
    const token = sessionToken || accessToken || authToken0;
    
    if (!token) {
      throw new Error("Authentication tokens are missing. Please log in again.");
    }

    // Generate a UUID for the brand
    const brandId = uuidv4();
    
    // Format the data according to the expected API format
    const brandData = {
      brand_id: brandId,
      brand_name: formData.brand_name,
      brand_image: formData.brand_image,
      about_brand: formData.about_brand,
      brand_country: formData.brand_country,
      owner_id: formData.owner_id,
      brand_tags: formData.brand_tags,
      social_media: formData.social_media,
    };

    // Make the API request
    const response = await fetch(`${baseUrl}/brand`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "sb-ginjmrvsyfbvxccpdqhq-auth-token-0": accessToken,
        "sb-ginjmrvsyfbvxccpdqhq-auth-token-1": refreshToken,
      },
      body: JSON.stringify(brandData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create brand");
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Error creating brand:", error);
    return { 
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred" 
    };
  }
}
