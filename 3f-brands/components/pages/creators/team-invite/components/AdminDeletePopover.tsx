import React from 'react';
import { 
  Popover, 
  PopoverTrigger, 
  PopoverContent, 
  Button,
} from '@nextui-org/react';
import { FiTrash , FiAlertCircle} from "react-icons/fi";

export const AdminDeletePopover: React.FC = () => {
  return (
    <Popover placement="top" showArrow >
      <PopoverTrigger>
        <Button 
          isIconOnly 
          variant="light" 
          className="text-gray-400 hover:text-gray-600 text-right"
        >
          <FiTrash className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-white p-2 rounded-lg shadow-md border border-gray-200 max-w-[250px]">
        <div className="flex items-center gap-2">
          <FiAlertCircle className="text-yellow-500 w-4 h-54" />
          <p className="text-xs text-gray-700">Admin cannot be deleted</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};