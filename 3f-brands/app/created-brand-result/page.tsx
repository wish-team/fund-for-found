"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import CheckIcon from "@/public/images/check-circle.svg";

export default function CreatedBrandResultPage() {
  const { t } = useTranslation();
  const router = useRouter();

  // Redirect if accessed directly without coming from the form submission
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // This will prevent the browser from showing a confirmation dialog
      delete e.returnValue;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="container mx-auto py-20 px-4 flex flex-col items-center">
      <div className="w-24 h-24 mb-8 relative">
        <svg 
          width="96" 
          height="96" 
          viewBox="0 0 96 96" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-green-500"
        >
          <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="6" fill="none" />
          <path d="M32 48L44 60L64 36" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        Brand Created Successfully!
      </h1>
      
      <p className="text-lg text-center text-gray-600 max-w-2xl mb-10">
        Your brand has been created and is now ready. You can continue to set up your profile
        and start receiving contributions.
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        <Button
          onClick={() => router.push("/step/3")}
          className="px-8 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          size="lg"
        >
          Continue to Next Step
        </Button>
        
        <Button
          onClick={() => router.push("/explore")}
          className="px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          size="lg"
        >
          Explore Brands
        </Button>
      </div>
    </div>
  );
}
