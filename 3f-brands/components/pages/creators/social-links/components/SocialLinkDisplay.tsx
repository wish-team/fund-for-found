import React from "react";
import { Button } from "@nextui-org/react";
import { BsPencil } from "react-icons/bs";
import { AuthWrapper } from "@/components/auth/AuthWrapper";
import { useSocialLinksStore } from '../store/socialLinksStore';
import { getIcon } from "../utils/helpers";

interface SocialLinkDisplayProps {
  onEditClick: () => void;
}

export const SocialLinkDisplay: React.FC<SocialLinkDisplayProps> = ({
  onEditClick,
}) => {
  const { links } = useSocialLinksStore();

  return (
    <AuthWrapper>
      {(user) => (
        <div className="flex flex-row-reverse flex-wrap justify-between items-center">
          {user && (
            <Button
              variant="bordered"
              startContent={<BsPencil />}
              onPress={onEditClick}
              className="ml-6 bg-light3 border border-primary200 hover:bg-primary50 hover:border-purple-500 rounded-lg text-gray4 text-xs"
            >
              <span className="hidden md:block">Edit</span>
            </Button>
          )}
          <div className="flex flex-wrap space-x-4">
            {Object.entries(links).map(([type, url]) => (
              <a
                key={type}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray4 hover:text-primary transition-colors"
              >
                {getIcon(type)}
              </a>
            ))}
          </div>
        </div>
      )}
    </AuthWrapper>
  );
};