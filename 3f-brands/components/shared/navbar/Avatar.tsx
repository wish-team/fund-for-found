import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Avatar,
} from "@nextui-org/react";
import { FaUserCircle } from "react-icons/fa";
import { IoBagHandleSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { AuthWrapper } from "@/components/auth/AuthWrapper";
import { useAuthStore } from "@/store/authStore";
import { useProfileStore } from "../../pages/creators/profile-editor/store/profileStore";
import { getFirstLetter } from "../../pages/creators/profile-editor/utils/imageUtils";
import { useTranslation } from "react-i18next";

interface AvatarDropdownProps {
  userName: string;
  userEmail: string;
}

const AvatarDropdown: React.FC<AvatarDropdownProps> = ({
  userName,
  userEmail,
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { selectedImage, subscribe } = useProfileStore();
  const { supabase } = useAuthStore();
  
  useEffect(() => {
    const unsubscribe = subscribe(() => {});
    return () => {
      unsubscribe();
    };
  }, [subscribe]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      window.location.href = "http://localhost:3000/login";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleNavigation = (userId: string, path: string) => {
    router.push(path.replace("[id]", userId).replace("[userId]", userId));
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
                  name={getFirstLetter(userEmail)}
                  size="sm"
                  src={selectedImage || undefined}
                  fallback={
                    <div className="bg-primary text-primary200 text-sm font-bold w-full h-full flex items-center justify-center">
                      {getFirstLetter(userEmail)}
                    </div>
                  }
                />
              </DropdownTrigger>
              <DropdownMenu
                aria-label={t('translation:avatar.menuLabel')}
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
                  textValue={t('translation:avatar.myProfile')}
                  onPress={() => handleNavigation(user.id, "/creators/[id]")}
                >
                  <div className="flex text-sm items-center space-x-2 text-gray3">
                    <h6 className="flex">
                      <FaUserCircle />
                    </h6>
                    <h6 className="flex">{t('translation:avatar.myProfile')}</h6>
                  </div>
                </DropdownItem>
                <DropdownItem
                  key="brand-organization"
                  textValue={t('translation:avatar.brandOrganization')}
                >
                  <div className="flex text-sm items-center space-x-2 text-gray3">
                    <h6 className="flex">
                      <IoBagHandleSharp />
                    </h6>
                    <h6 className="flex">{t('translation:avatar.brandOrganization')}</h6>
                  </div>
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  textValue={t('translation:avatar.settings')}
                  onPress={() => handleNavigation(user.id, "/dashboard/[userId]")}
                >
                  <div className="flex text-sm items-center space-x-2 text-gray3">
                    <h6 className="flex">
                      <IoMdSettings />
                    </h6>
                    <h6 className="flex">{t('translation:avatar.settings')}</h6>
                  </div>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  textValue={t('translation:avatar.logOut')}
                  onClick={handleLogout}
                >
                  <div className="flex text-sm items-center space-x-2 text-gray3">
                    <h6 className="flex">
                      <TbLogout />
                    </h6>
                    <h6 className="flex">{t('translation:avatar.logOut')}</h6>
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