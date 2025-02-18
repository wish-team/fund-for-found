"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">{t("translation:notFound.title")}</h2>
      <p className="mb-4">{t("translation:notFound.message")}</p>
      <Link href="/" className="text-primary hover:underline">
        {t("translation:notFound.backHome")}
      </Link>
    </div>
  );
}
