"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { IoSettings } from "react-icons/io5";

export default function DashboardButton() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/dashboard/userId");
  };

  return (
    <Button color="primary" startContent={<IoSettings />} onClick={handleNavigate} className="px-8 py-2 text-white rounded-lg">
      Setting
    </Button>
  );
}
