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

export const UserAvatar = () => {
  const { user, supabase } = useAuthStore();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="primary"
          name={user?.email?.charAt(0).toUpperCase()}
          size="sm"
          src={user?.user_metadata?.avatar_url}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user?.email}</p>
        </DropdownItem>
        <DropdownItem key="settings" href="/settings">
          Settings
        </DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={handleSignOut}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
