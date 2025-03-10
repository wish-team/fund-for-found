"use client";

import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { IoBagHandleSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import { useProfileStore } from "@/components/features/creators/profile-editor/store/profileStore";
import { getFirstLetter } from "@/components/features/creators/profile-editor/utils/imageUtils";
import { useEffect } from "react";

export const UserAvatar = () => {
  const { user, supabase } = useAuthStore();
  const router = useRouter();
  const { t } = useTranslation();
  const { selectedImage, subscribe } = useProfileStore();

  useEffect(() => {
    const unsubscribe = subscribe(() => {});
    return () => {
      unsubscribe();
    };
  }, [subscribe]);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      window.location.href = "https://auth.fundforfound.com/login";
    } catch (error) {
      console.error("Error signing out:", error);
      window.location.href = "https://auth.fundforfound.com/login";
    }
  };

  const handleNavigation = (userId: string, path: string) => {
    router.push(path.replace("[id]", userId).replace("[userId]", userId));
  };

  if (!user) return null;

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="primary"
          name={getFirstLetter(user.email || "")}
          size="sm"
          src={selectedImage || user?.user_metadata?.avatar_url}
          fallback={
            <div className="bg-primary text-primary200 text-sm font-bold w-full h-full flex items-center justify-center">
              {getFirstLetter(user.email || "")}
            </div>
          }
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label={t("translation:avatar.menuLabel")}
        variant="flat"
        className="w-[300px] p-4"
      >
        <DropdownItem key="email" className="h-14 gap-2" textValue={user.email}>
          <p className="font-semibold text-gray3">{user.email}</p>
        </DropdownItem>
        <DropdownItem
          key="my-profile"
          className="flex"
          textValue={t("translation:avatar.myProfile")}
          onPress={() => handleNavigation(user.id, "/creators/[id]")}
        >
          <div className="flex text-sm items-center space-x-2 text-gray3">
            <h6 className="flex">
              <FaUserCircle />
            </h6>
            <h6 className="flex">{t("translation:avatar.myProfile")}</h6>
          </div>
        </DropdownItem>
        <DropdownItem
          key="brand-organization"
          textValue={t("translation:avatar.brandOrganization")}
        >
          <div className="flex text-sm items-center space-x-2 text-gray3">
            <h6 className="flex">
              <IoBagHandleSharp />
            </h6>
            <h6 className="flex">
              {t("translation:avatar.brandOrganization")}
            </h6>
          </div>
        </DropdownItem>
        <DropdownItem
          key="settings"
          textValue={t("translation:avatar.settings")}
          onPress={() => handleNavigation(user.id, "/dashboard/[userId]")}
        >
          <div className="flex text-sm items-center space-x-2 text-gray3">
            <h6 className="flex">
              <IoMdSettings />
            </h6>
            <h6 className="flex">{t("translation:avatar.settings")}</h6>
          </div>
        </DropdownItem>
        <DropdownItem
          key="logout"
          textValue={t("translation:avatar.logOut")}
          onClick={handleSignOut}
        >
          <div className="flex text-sm items-center space-x-2 text-gray3">
            <h6 className="flex">
              <TbLogout />
            </h6>
            <h6 className="flex">{t("translation:avatar.logOut")}</h6>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
