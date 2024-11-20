import React from "react";
import { Button } from "@nextui-org/react";
import { FaUser } from "react-icons/fa";
import { Pencil, Trash } from "lucide-react";
import { DescriptionText } from "./DescriptionText";
import { PreviewCardProps } from "../types/team";

export const PreviewCard: React.FC<PreviewCardProps> = ({
  member,
  index,
  showEdit = true,
  onEdit,
  onDelete,
}) => (
  <div className="bg-white flex flex-col justify-between rounded-lg border border-gray-200 overflow-hidden h-[400px] hover:border-purple-500 w-[250px] md:min-w-[250px]">
    <div className="p-6">
      <div className="flex justify-end">
        {showEdit && typeof index === "number" && (
          <div className="flex gap-2">
            <Button
              isIconOnly
              variant="light"
              onPress={() => onEdit?.(member, index)}
              className="text-gray-400 hover:text-gray-600 text-right"
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              isIconOnly
              variant="light"
              onPress={() => onDelete?.(index)}
              className="text-gray-400 hover:text-gray-600 text-right"
              disabled={member.role === "Admin"}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
      <div className="w-16 mx-auto h-16 bg-light4 border-4 border-primary100 rounded-2xl flex items-center justify-center">
        <FaUser className="w-6 h-6 text-primary100" />
      </div>

      <div className="flex flex-col items-center">
        <h3 className="text-xl py-2 text-center font-medium text-gray2">
          {member.name || "Name"}
        </h3>
        <span className="text-sm bg-light3 px-3 py-1 rounded-full text-gray4 font-light">
          {member.role || "Role"}
        </span>
      </div>

      <DescriptionText
        description={member.description || "Description"}
        index={typeof index === "number" ? index : undefined}
      />
    </div>

    <div className="bg-light3 px-6 py-4">
      <div className="flex justify-between border-b border-light2 pb-2 text-sm mb-2">
        <span className="text-gray2 font-medium">Created</span>
        <span className="font-light">
          {member.role === "Admin" ? "1 brands" : "0 brands"}
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray2 font-medium">Contributed</span>
        <span className="font-light">0 projects</span>
      </div>
    </div>
  </div>
);
