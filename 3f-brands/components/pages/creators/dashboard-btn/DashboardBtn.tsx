"use client";
import { AuthWrapper } from "@/components/auth/AuthWrapper";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { IoSettings } from "react-icons/io5";

export default function DashboardButton() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/dashboard/userId");
  };

  return (
    <AuthWrapper>
      {(user) => (
        <div>
          {user && (
            <Button
              color="primary"
              startContent={<IoSettings />}
              onClick={handleNavigate}
              className="px-2 md:px-8 py-2 text-white rounded-lg"
            >
              <span className="hidden md:inline">Setting</span>
            </Button>
          )}
        </div>
      )}
    </AuthWrapper>
  );
}
