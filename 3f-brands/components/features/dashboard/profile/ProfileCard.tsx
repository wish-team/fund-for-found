import React from 'react';
import { Avatar, Button } from "@nextui-org/react";
import { FaChevronRight } from "react-icons/fa6";

interface ProfileCardProps {
  email: string;
  onSettingsClick?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  email,
  onSettingsClick 
}) => {
  return (
    <div className="border rounded-2xl shadow-shadow1 p-4  bg-white">
      <div className="flex items-center gap-4">
        {/* Profile Avatar */}
        <Avatar 
          name={email.split('@')[0]}
          showFallback
          size="md"
          classNames={{
            base: "bg-primary text-white uppercase",
            fallback: "font-medium"
          }}
        />
        
        {/* Profile Info */}
        <div className="flex flex-col">
          <h2 className="text-base text-gray-700 font-medium">
            Wish work profile
          </h2>
          <span className="text-gray-500 text-sm">
            {email}
          </span>
        </div>
      {/* Action Buttons */}
      
        <Button
          isIconOnly
          variant="light"
          className="text-gray-500"
          onPress={onSettingsClick}
        >
        <FaChevronRight className="text-primary" size={24} />
        </Button>
      
      </div>

    </div>
  );
};

export default ProfileCard;

