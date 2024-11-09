import React from 'react';
import { Button } from "@nextui-org/react";
import { SocialLinks } from '../types';
import { getIcon } from '../utils/helpers';

interface SocialLinkDisplayProps {
  links: SocialLinks;
  onEditClick: () => void;
}

export const SocialLinkDisplay: React.FC<SocialLinkDisplayProps> = ({
  links,
  onEditClick,
}) => {
  return (
    <div className="flex items-center space-x-4">
      {Object.entries(links).map(([type, url]) => (
        <a
          key={type}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
        >
          {getIcon(type)}
        </a>
      ))}
      <Button variant="bordered" onPress={onEditClick} className="ml-4">
        Edit
      </Button>
    </div>
  );
};