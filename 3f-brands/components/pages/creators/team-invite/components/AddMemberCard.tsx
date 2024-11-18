import React from "react";
import { Button } from "@nextui-org/react";
import { Plus } from "lucide-react";

interface AddMemberCardProps {
  onAddMember: () => void;
}

export const AddMemberCard: React.FC<AddMemberCardProps> = ({
  onAddMember,
}) => (
  <div className="min-w-[250px] md:min-w-[250px] flex-shrink-0">
    <Button
      onPress={onAddMember}
      className="w-full h-full min-h-[400px] bg-white rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-4 hover:border-purple-300 hover:bg-purple-50 transition-colors"
    >
      <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
        <Plus className="w-8 h-8 text-white" />
      </div>
      <span className="text-xl font-medium text-gray-900">
        Invite team member
      </span>
    </Button>
  </div>
);
