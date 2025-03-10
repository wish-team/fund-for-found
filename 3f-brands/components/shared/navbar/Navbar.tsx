"use client";
import React, { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalBody,
  Spinner,
} from "@nextui-org/react";
import { LuX } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { User, SupabaseClient } from "@supabase/supabase-js";

import logo from "@/app/images/logo.svg";
import AvatarDropdown from "./Avatar";
import { AuthWrapper } from "@/components/auth/AuthWrapper";
import { useAuthStore } from "@/store/authStore";

// Type definitions
interface NavigationBarProps {
  className?: string;
}

interface AuthStore {
  user: User | null;
  supabase: SupabaseClient;
  initialLoading: boolean;
}

interface MenuItem {
  key: string;
  label: string;
  href: string;
}

// Component definition
const NavigationBar: React.FC<NavigationBarProps> = ({ className = "" }) => {
  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Hooks
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();
  const { user, supabase, initialLoading } = useAuthStore() as AuthStore;

  // Authentication handlers
  const handleStartClick = useCallback(async () => {
    try {
      setIsLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        router.push(process.env.NEXT_PUBLIC_APP_URL || "/dashboard");
      } else {
        window.location.href = "https://auth.fundforfound.com/login";
      }
    } catch (error) {
      console.error("Authentication error:", error);
      window.location.href = "https://auth.fundforfound.com/login";
    } finally {
      setIsLoading(false);
    }
  }, [router, supabase.auth]);

  const handleLogout = useCallback(async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      router.push(process.env.NEXT_PUBLIC_APP_URL || "/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [supabase.auth, router]);

  // Search handler
  const handleSearch = useCallback(
    (term: string) => {
      if (!term.trim()) return;

      const searchQuery = encodeURIComponent(term.trim());
      router.push(`/explore?q=${searchQuery}`);
      setIsSearchModalOpen(false);
      setIsSearchFocused(false);
      setSearchTerm("");
    },
    [router]
  );

  // Menu items
  const menuItems = useMemo<MenuItem[]>(
    () => [
      {
        key: "home",
        label: t("translation:navbar.home"),
        href: process.env.NEXT_PUBLIC_APP_URL || "/",
      },
      {
        key: "explore",
        label: t("translation:navbar.explore"),
        href: "/explore",
      },
      {
        key: "aboutUs",
        label: t("translation:navbar.aboutUs"),
        href: "/about",
      },
      {
        key: "helpSupport",
        label: t("translation:navbar.helpSupport"),
        href: "/help",
      },
      {
        key: "loginSignup",
        label: t("translation:navbar.loginSignup"),
        href: "https://auth.fundforfound.com/login",
      },
    ],
    [t]
  );

  // Show search functionality except on explore page
  const showSearchFunctionality = useMemo(() => {
    return pathname !== "/explore";
  }, [pathname]);

  // Render functions
  const renderLogo = () => (
    <NavbarContent>
      <Link href={process.env.NEXT_PUBLIC_APP_URL || "/"}>
        <Image src={logo} alt="Logo" priority className="h-8 w-auto" />
      </Link>
    </NavbarContent>
  );

  const renderDesktopNav = () => (
    <NavbarContent
      className="hidden text-sm text-gray3 lg:pe-20 space-x-3 sm:flex justify-start gap-4"
      justify="center"
    >
      {menuItems.slice(0, 4).map((item) => (
        <NavbarItem key={item.key} isActive={pathname === item.href}>
          <Link
            color="foreground"
            href={item.href}
            aria-current={pathname === item.href ? "page" : undefined}
            className={pathname === item.href ? "font-semibold" : ""}
          >
            {item.label}
          </Link>
        </NavbarItem>
      ))}
    </NavbarContent>
  );

  const renderSearchInput = () => (
    <Input
      classNames={{
        input: [
          "bg-transparent",
          "text-black/90 dark:text-white/90",
          "placeholder:text-default-700/50 dark:placeholder:text-white/60",
        ],
        innerWrapper: "bg-transparent",
        inputWrapper: [
          "shadow-small",
          "bg-default-200/50",
          "dark:bg-default/60",
          "backdrop-blur-xl",
          "hover:bg-default-200/70",
          "dark:hover:bg-default/70",
          "group-data-[focused=true]:bg-default-200/50",
          "dark:group-data-[focused=true]:bg-default/60",
          "!cursor-text",
        ],
      }}
      placeholder={t("translation:navbar.searchPlaceholder")}
      size="sm"
      startContent={
        <FiSearch className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
      }
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSearch(searchTerm);
        }
      }}
    />
  );

  const renderFullScreenSearch = () => {
    if (!showSearchFunctionality) return null;

    return (
      <div
        className={`
          fixed inset-0 z-50 transition-all duration-300 ease-in-out
          ${
            isSearchFocused
              ? "opacity-100 visible bg-black/50 backdrop-blur-sm flex items-start pt-32 justify-center"
              : "opacity-0 invisible"
          }
          max-md:hidden
        `}
      >
        <div className="relative w-full max-w-4xl px-4">
          <Button
            isIconOnly
            variant="light"
            className="absolute -top-16 right-4"
            onPress={() => {
              setIsSearchFocused(false);
              setSearchTerm("");
            }}
          >
            <LuX className="w-8 h-8" />
          </Button>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4">
            {renderSearchInput()}
          </div>
        </div>
      </div>
    );
  };

  const renderMobileSearchModal = () => {
    if (!showSearchFunctionality) return null;

    return (
      <Modal
        isOpen={isSearchModalOpen}
        onOpenChange={setIsSearchModalOpen}
        size="full"
        classNames={{
          base: "m-0",
          wrapper: "items-start pt-16",
        }}
      >
        <ModalContent>
          <ModalBody className="p-4">{renderSearchInput()}</ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  const renderSearchAndAuth = () => (
    <NavbarContent justify="end" className="gap-2">
      {showSearchFunctionality && (
        <>
          <div className="hidden md:block relative">
            <Input
              isClearable
              classNames={{
                input: [
                  "bg-transparent",
                  "text-black/90 dark:text-white/90",
                  "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                ],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                  "shadow-small",
                  "bg-default-200/50",
                  "dark:bg-default/60",
                  "backdrop-blur-xl",
                  "hover:bg-default-200/70",
                  "dark:hover:bg-default/70",
                  "group-data-[focused=true]:bg-default-200/50",
                  "dark:group-data-[focused=true]:bg-default/60",
                  "!cursor-text",
                ],
              }}
              placeholder={t("translation:navbar.searchPlaceholder")}
              radius="lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              startContent={
                <FiSearch className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
              }
            />
          </div>
          <div className="md:hidden">
            <Button
              isIconOnly
              variant="light"
              onPress={() => setIsSearchModalOpen(true)}
            >
              <FiSearch className="w-5 h-5" />
            </Button>
          </div>
        </>
      )}

      <NavbarItem>
        <AuthWrapper
          loadingComponent={
            <Button isLoading variant="flat" className="min-w-[120px]">
              <Spinner size="sm" />
            </Button>
          }
        >
          {(user: User | null) =>
            user ? (
              <AvatarDropdown
                userName={
                  user.user_metadata?.name ||
                  t("translation:navbar.defaultUser")
                }
                userEmail={user.email || ""}
                onLogout={handleLogout}
                isLoading={isLoading}
              />
            ) : (
              <Button
                color="primary"
                variant="solid"
                onClick={handleStartClick}
                isLoading={isLoading}
                className="font-medium"
              >
                {t("translation:navbar.signIn")}
              </Button>
            )
          }
        </AuthWrapper>
      </NavbarItem>

      <NavbarMenuToggle
        aria-label={
          isMenuOpen
            ? t("translation:navbar.closeMenu")
            : t("translation:navbar.openMenu")
        }
        className="sm:hidden"
      />
    </NavbarContent>
  );

  const renderMobileMenu = () => (
    <NavbarMenu>
      {menuItems.map((item, index) => (
        <NavbarMenuItem key={item.key}>
          <Link
            color={
              index === menuItems.length - 1
                ? "danger"
                : pathname === item.href
                ? "primary"
                : "foreground"
            }
            className="w-full"
            href={item.href}
            size="lg"
          >
            {item.label}
          </Link>
        </NavbarMenuItem>
      ))}
    </NavbarMenu>
  );

  return (
    <>
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        isBordered
        className={`${className} rtl:space-x-reverse`}
        classNames={{
          wrapper: "px-4 sm:px-6",
        }}
      >
        {renderLogo()}
        {renderDesktopNav()}
        {renderSearchAndAuth()}
        {renderMobileMenu()}
      </Navbar>

      {renderFullScreenSearch()}
      {renderMobileSearchModal()}
    </>
  );
};

export default NavigationBar;
