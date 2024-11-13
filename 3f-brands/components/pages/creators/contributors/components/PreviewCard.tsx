import React from 'react';
import { Button } from "@nextui-org/react";
import { Edit, Trash2 } from "lucide-react";
import { Tier } from '../types/tier';
import { DEFAULT_IMAGE } from '../utils/constants';

interface PreviewCardProps {
  data: Partial<Tier>;
  preview?: boolean;
  onEdit?: (index: number) => void;
  onDelete?: (index: number) => void;
  index?: number;
  imagePreview?: string | null;
}

export const PreviewCard: React.FC<PreviewCardProps> = ({
  data,
  preview = false,
  onEdit,
  onDelete,
  index = 0,
  imagePreview,
}) => (
  <div className="border rounded-lg overflow-hidden shadow-sm w-full relative">
    <div className="bg-primary text-white p-2 text-center relative">
      {data.name || "Silver Sponsor"}
      {!preview && index !== undefined && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
          <Button
            isIconOnly
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(index);
            }}
          >
            <Edit size={16} />
          </Button>
          <Button
            isIconOnly
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(index);
            }}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      )}
    </div>
    <div className="p-6 space-y-4">
      <h2 className="py-1 text-center text-gray2 font-light text-xl">You are on the list</h2>
      <div className="bg-primary50 rounded-lg p-4 mb-4">
        <img
          src={preview ? imagePreview || DEFAULT_IMAGE : data.imagePreview || DEFAULT_IMAGE}
          alt="Silver Sponsor"
          className="w-full h-36 object-cover rounded-lg text-2xl text-primary100 flex items-center justify-center"
        />
      </div>
      <div className="text-gray-500">
        Start at <span className="text-primary font-semibold">{data.amount || "20 USD"}$</span>
      </div>
      <p className="text-light1 text-sm text-justify">
        {data.rewardDescription || "Join the guest list and be the first to know major updates about our project events. Plus, enjoy some digital gift card to be invited to the  events."}
      </p>
      {preview && <Button color="primary" className="w-full bg-primary text-white rounded-lg mt-4">Contribute</Button>}
    </div>
  </div>
);
