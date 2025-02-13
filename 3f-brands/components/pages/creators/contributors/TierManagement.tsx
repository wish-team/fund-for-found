import React, { useEffect } from "react";
import { useTierStore } from "./store/tierStore";
import { AddTierButton } from "./components/AddTierButton";
import { TierList } from "./components/TierList";
import { TierModal } from "./components/TierModal";
import DeleteConfirmationModal from "@/components/shared/DeleteConfirmationModal";
import CreatorsTitle from "../title/CreatorsTitle";
import { AuthWrapper } from "@/components/auth/AuthWrapper";
import { useTranslation } from "react-i18next";
import { TierListSkeleton } from "./components/TierSkeleton";
import { Alert } from "@nextui-org/react";

export const TierManagement = () => {
  const { t } = useTranslation();
  const {
    tiers,
    isLoading,
    error,
    fetchTiers,
    editTier,
    deleteTier,
    deleteConfirmation,
    hideDeleteConfirmation,
    confirmDelete,
    setError,
  } = useTierStore();

  useEffect(() => {
    fetchTiers();
  }, []);

  return (
    <AuthWrapper>
      {(user) => (
        <div>
          <div className="max-w-[1240px] mx-auto">
            <CreatorsTitle
              title={t("translation:creators.tier.management.title")}
            />
            <h2 className="ps-2 mx-2 mb-6 text-lg text-gray2 border-s-4 border-primary">
              {t("translation:creators.tier.management.subtitle")}
            </h2>

            {error && (
              <Alert
                color="danger"
                className="mb-4"
                onClose={() => setError(null)}
              >
                  {t(['translation:creators.tier.errors', error].join('.'), 'An error occurred')}
              </Alert>
            )}

            <div className="flex flex-col md:flex-row gap-6">
              {user && (
                <div className="w-full md:w-80 md:flex-none">
                  <AddTierButton />
                </div>
              )}
              {isLoading ? (
                <TierListSkeleton />
              ) : (
                <TierList
                  tiers={tiers}
                  onEdit={editTier}
                  onDelete={(index: number) => deleteTier(index.toString())}
                />
              )}
            </div>
          </div>

          <TierModal />

          <DeleteConfirmationModal
            isOpen={deleteConfirmation.show}
            onClose={hideDeleteConfirmation}
            onConfirm={confirmDelete}
            title={t("translation:creators.tier.modal.deleteTitle")}
            message={t("translation:creators.tier.modal.deleteMessage")}
          />
        </div>
      )}
    </AuthWrapper>
  );
};
