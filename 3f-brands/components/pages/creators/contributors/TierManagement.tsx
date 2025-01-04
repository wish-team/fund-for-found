import React, { useEffect } from "react";
import { useTierStore } from "./store/tierStore";
import { AddTierButton } from "./components/AddTierButton";
import { TierList } from "./components/TierList";
import { TierModal } from "./components/TierModal";
import DeleteConfirmationModal from "@/components/shared/DeleteConfirmationModal";
import CreatorsTitle from "../title/CreatorsTitle";
import { AuthWrapper } from "@/components/auth/AuthWrapper";

export const TierManagement = () => {
  const { 
    tiers,
    initializeTiers,
    editTier,
    deleteTier,
    deleteConfirmation,
    hideDeleteConfirmation,
    confirmDelete
  } = useTierStore();

  useEffect(() => {
    initializeTiers();
  }, []);

  return (
    <AuthWrapper>
      {(user) => (
        <div>
          <div className="max-w-[1240px] mx-auto">
            <CreatorsTitle title="Contribution Tier" />
            <h2 className="ps-2 mx-2 mb-6 text-lg text-gray2 border-s-4 border-primary">
              Recurring or One time
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              {user && (
                <div className="w-full md:w-80 md:flex-none">
                  <AddTierButton />
                </div>
              )}
              <TierList
                tiers={tiers}
                onEdit={editTier}
                onDelete={deleteTier}
              />
            </div>
          </div>

          <TierModal />

          <DeleteConfirmationModal
            isOpen={deleteConfirmation.show}
            onClose={hideDeleteConfirmation}
            onConfirm={confirmDelete}
            title="Delete Tier"
            message="This tier will be deleted. Are you sure you want to proceed?"
          />
        </div>
      )}
    </AuthWrapper>
  );
};