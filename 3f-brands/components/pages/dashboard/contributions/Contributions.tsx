import React, { useEffect } from "react";
import { useTierStore } from "../../creators/contributors/store/tierStore";
import { AddTierButton } from "../../creators/contributors/components/AddTierButton";
import { TierList } from "../../creators/contributors/components/TierList";
import { TierModal } from "../../creators/contributors/components/TierModal";
import DeleteConfirmationModal from "@/components/shared/DeleteConfirmationModal";
import CreatorsTitle from "../../../pages/creators/title/CreatorsTitle";
import { AuthWrapper } from "@/components/auth/AuthWrapper";

export const Contributions = () => {
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
        <div className="md:p-6">
          <div>
            <CreatorsTitle title="Contribution Tier" />
            <div>
              {user && (
                <div className="mb-6">
                  <AddTierButton />
                </div>
              )}
              <TierList
                layout="vertical"
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