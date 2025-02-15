import React from "react";
import { Button } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface AddMemberCardProps {
  onAddMember: () => void;
}

export const AddMemberCard: React.FC<AddMemberCardProps> = ({
  onAddMember,
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="min-w-[250px] md:min-w-[250px] h-[420px] flex-shrink-0">
      <Button
        onPress={onAddMember}
        className="w-full h-full min-h-[400px] bg-white rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-4 hover:border-purple-300 hover:bg-purple-50 transition-colors"
      >
        <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
          <FaPlus className="w-8 h-8 text-white" />
        </div>
        <span className="text-xl font-medium text-gray-900">
          {t('translation:teamMember.form.title.add')}
        </span>
      </Button>
    </div>
  );
};