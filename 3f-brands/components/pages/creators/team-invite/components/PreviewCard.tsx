import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { FaUser } from "react-icons/fa";
import { DescriptionText } from "./DescriptionText";
import { PreviewCardProps } from "../types/team";
import { LuPencil, LuTrash } from "react-icons/lu";
import { DeleteConfirmationModal } from "../../../../shared/DeleteConfirmationModal";
import { AdminDeletePopover } from "./AdminDeletePopover";
import { AuthWrapper } from "@/components/auth/AuthWrapper";
import { useTranslation } from "react-i18next";

export const PreviewCard: React.FC<PreviewCardProps> = ({
  member,
  index,
  showEdit = true,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = () => {
    if (member.role === "Admin") return;
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete && index !== undefined) {
      onDelete(index);
    }
    setIsDeleteModalOpen(false);
  };

  // Translate the role
  const getTranslatedRole = (role: string) => {
    return t(`teamMember.roles.${role.toLowerCase()}`);
  };

  return (
    <AuthWrapper>
      {(user) => (
        <div>
          <div className="bg-white flex flex-col justify-between rounded-lg border border-gray-200 overflow-hidden hover:border-purple-500 w-[280px] md:min-w-[280px]">
            <div className="p-6">
              <div className="flex justify-end">
                {user && showEdit && (
                  <div className="flex gap-2">
                    <Button
                      isIconOnly
                      variant="light"
                      onPress={() => onEdit?.(member, index ?? -1)}
                      className="text-gray-400 hover:text-gray-600 text-right"
                    >
                      <LuPencil className="w-4 h-4" />
                    </Button>
                    {member.role === "Admin" ? (
                      <AdminDeletePopover />
                    ) : (
                      <Button
                        isIconOnly
                        variant="light"
                        onPress={handleDeleteClick}
                        className="text-gray-400 hover:text-gray-600 -z-0 text-right"
                      >
                        <LuTrash className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
              <div className="w-16 mx-auto h-16 bg-light4 border-4 border-primary100 rounded-2xl flex items-center justify-center">
                <FaUser className="w-6 h-6 text-primary100" />
              </div>

              <div className="flex flex-col items-center">
                <h3 className="text-xl py-2 text-center font-medium text-gray2">
                  {member.name || t("teamMember.preview.defaultName")}
                </h3>
                <span className="text-sm bg-light3 px-3 py-1 rounded-full text-gray4 font-light">
                  {member.role ? getTranslatedRole(member.role) : t("teamMember.preview.defaultRole")}
                </span>
              </div>

              <DescriptionText
                description={member.description || t("teamMember.preview.defaultDescription")}
                index={index}
              />
            </div>

            <div className="bg-light3 px-6 py-4">
              <div className="flex justify-between border-b border-light2 pb-2 text-sm mb-2">
                <span className="text-gray2 font-medium">
                  {t("teamMember.card.created")}
                </span>
                <span className="font-light">
                  {member.role === "Admin"
                    ? `1 ${t("teamMember.card.brands")}`
                    : `0 ${t("teamMember.card.brands")}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray2 font-medium">
                  {t("teamMember.card.contributed")}
                </span>
                <span className="font-light">
                  {`0 ${t("teamMember.card.projects")}`}
                </span>
              </div>
            </div>
          </div>

          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleConfirmDelete}
          />
        </div>
      )}
    </AuthWrapper>
  );
};