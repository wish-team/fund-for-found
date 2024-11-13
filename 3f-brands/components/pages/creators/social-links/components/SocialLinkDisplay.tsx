import React from 'react';
import { Button } from "@nextui-org/react";
import { SocialLinks } from '../types';
import { getIcon } from '../utils/helpers';
import { BsPencil } from 'react-icons/bs';

interface SocialLinkDisplayProps {
  links: SocialLinks;
  onEditClick: () => void;
}

export const SocialLinkDisplay: React.FC<SocialLinkDisplayProps> = ({
  links,
  onEditClick,
}) => {
  return (
    <div className="flex items-center mt-4 space-x-4">
      {Object.entries(links).map(([type, url]) => (
        <a
          key={type}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-gray4 hover:text-purple-600 transition-colors"
        >
          {getIcon(type)}
        </a>
      ))}
      <Button variant="bordered" startContent={<BsPencil />} onPress={onEditClick} className="ml-6 bg-light3 border border-primary200 hover:bg-primary50 hover:border-purple-500 rounded-lg text-gray4 text-xs">
        Edit
      </Button>
    </div>
  );
};