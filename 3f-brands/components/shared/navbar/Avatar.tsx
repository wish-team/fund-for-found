import React from "react";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { FaUserCircle } from "react-icons/fa";
import { IoBagHandleSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { AuthWrapper } from "@/app/auth/callback/AuthWrapper";
import { createClient } from '@supabase/supabase-js';

interface AvatarDropdownProps {
  userName: string;
  userEmail: string;
}

const AvatarDropdown: React.FC<AvatarDropdownProps> = ({
  userName,
  userEmail,
}) => {
  const handleLogout = async () => {
    try {
      // Initialize Supabase client 
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      // Sign out from Supabase
      await supabase.auth.signOut();

      // Redirect to the auth project's login page
      window.location.href = 'http://localhost:3000/login';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthWrapper>
      {(user) => (
        <div>
          {user && (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="primary"
                  name={userName}
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Profile Actions"
                variant="flat"
                className="bg-white shadow rounded w-[300px] p-4"
              >
                <DropdownItem
                  key="email"
                  className="h-14 gap-2"
                  textValue={userEmail}
                >
                  <p className="font-semibold text-gray3">{userEmail}</p>
                </DropdownItem>
                <DropdownItem
                  key="my-profile"
                  className="flex"
                  textValue="My Profile"
                >
                  <div className="flex text-sm items-center space-x-2 text-gray3">
                    <h6 className="flex">
                      <FaUserCircle />
                    </h6>
                    <h6 className="flex">My profile</h6>
                  </div>
                </DropdownItem>
                <DropdownItem
                  key="brand-organization"
                  textValue="My Brand and Organization"
                >
                  <div className="flex text-sm items-center space-x-2 text-gray3">
                    <h6 className="flex">
                      <IoBagHandleSharp />
                    </h6>
                    <h6 className="flex">My brand and organization</h6>
                  </div>
                </DropdownItem>
                <DropdownItem key="settings" textValue="Settings">
                  <div className="flex text-sm items-center space-x-2 text-gray3">
                    <h6 className="flex">
                      <IoMdSettings />
                    </h6>
                    <h6 className="flex">Setting</h6>
                  </div>
                </DropdownItem>
                <DropdownItem 
                  key="logout" 
                  textValue="Log Out"
                  onClick={handleLogout}
                >
                  <div className="flex text-sm items-center space-x-2 text-gray3">
                    <h6 className="flex">
                      <TbLogout />
                    </h6>
                    <h6 className="flex">Log Out</h6>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
      )}
    </AuthWrapper>
  );
};

export default AvatarDropdown;