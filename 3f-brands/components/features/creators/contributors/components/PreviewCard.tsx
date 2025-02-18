
import React, { memo, useState } from "react";
import { Button } from "@nextui-org/react";
import { Tier } from "../types/tier";
import { MdEdit, MdDelete, MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { DEFAULT_IMAGE } from "../utils/constants";
import { AuthWrapper } from "@/components/auth/AuthWrapper";
import { ContributeButton } from "./ContributeButton";
import { useTranslation } from "react-i18next";


interface PreviewCardProps {
  data: Partial<Tier>;
  preview?: boolean;
  onEdit?: (index: number) => void;
  onDelete?: (index: number) => void;
  index?: number;
  imagePreview?: string | null;
}

export const PreviewCard= React.memo<PreviewCardProps> (({
  data,
  preview = false,
  onEdit,
  onDelete,
  index = 0,
  imagePreview,
}) => {
  const {t} = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false);
  
  const description = data.rewardDescription || 
    "Join the guest list and be the first to know major updates about our project events. Plus, enjoy some digital gift card to be invited to the events.";

  const shouldShowReadMore = description.length > 60;
  
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <AuthWrapper>
      {(user) => (
        <div className={`border hover:shadow-shadow1 rounded-lg overflow-hidden shadow-sm w-full relative 
          ${isExpanded ? 'z-50' : 'z-0'} transition-all duration-300 ease-in-out`}
        >
          <div className="bg-primary text-white p-2 text-center relative">
          {data.name || t('translation:creators.tier.card.defaultTitle')}
            {!preview && index !== undefined && user && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  className="text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.(index);
                  }}
                >
                  <MdEdit size={16} />
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  className="text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.(index);
                  }}
                >
                  <MdDelete size={16} />
                </Button>
              </div>
            )}
          </div>
          <div className="p-6 space-y-4">
            <h2 className="py-1 text-center text-gray2 font-light text-xl">
            {t('translation:creators.tier.card.subtitle')}
            </h2>
            <div className="bg-primary50 rounded-lg p-4 mb-4">
              <img
                src={
                  preview
                    ? imagePreview || DEFAULT_IMAGE
                    : data.imagePreview || DEFAULT_IMAGE
                }
                loading="lazy"
                alt="Silver Sponsor"
                className="w-full h-36 object-cover rounded-lg text-2xl text-primary100 flex items-center justify-center"
              />
            </div>
            <div className="text-gray-500">
              {t('translation:creators.tier.card.startAt')}{" "}
              <span className="text-primary font-semibold">
                {data.amount || "20"} {t('translation:creators.tier.card.currency')}
              </span>
            </div>
            <div className="relative">
              <div 
                className={`text-light1 text-sm text-justify overflow-hidden transition-all duration-300 ease-in-out
                  ${!isExpanded && shouldShowReadMore ? 'h-[60px]' : 'h-auto'}`}
              >
                {description}
                {!isExpanded && shouldShowReadMore && (
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-white to-transparent"
                    aria-hidden="true"
                  />
                )}
              </div>
              {shouldShowReadMore && (
              <button
                onClick={handleToggle}
                className="mt-2 text-primary hover:text-primary-dark flex items-center gap-1"
              >
                {isExpanded ? (
                  <>
                    {t('translation:creators.tier.card.buttons.showLess')}
                    <MdArrowDropUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    {t('translation:creators.tier.card.buttons.showMore')}
                    <MdArrowDropDown className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
            </div>
            <ContributeButton 
              tierId={data.id || ''} 
              preview={preview} 
            />
          </div>
        </div>
      )}
    </AuthWrapper>
  );
});