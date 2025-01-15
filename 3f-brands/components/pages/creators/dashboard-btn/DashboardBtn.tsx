"use client";
import { AuthWrapper } from "@/components/auth/AuthWrapper";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { IoSettings } from "react-icons/io5";

export default function DashboardButton() {
  const router = useRouter();
  const { t } = useTranslation();

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
              <span className="hidden md:inline">
                {t("translation:banner.dashboard.settings")}
              </span>
            </Button>
          )}
        </div>
      )}
    </AuthWrapper>
  );
}
