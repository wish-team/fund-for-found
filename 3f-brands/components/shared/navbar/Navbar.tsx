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
} from "@nextui-org/react";

import logo from "@/app/images/logo.svg";
import AvatarDropdown from "./Avatar";
import { AuthWrapper } from "@/components/auth/AuthWrapper";
// import { Search, X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface NavigationBarProps {
  // Add any external props if needed
}

const NavigationBar: React.FC<NavigationBarProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();

  const handleStartClick = useCallback(() => {
    router.push("http://localhost:3000/login");
  }, [router]);

  const handleSearch = useCallback(
    (term: string) => {
      if (term.trim()) {
        router.push("/explore");
      }
    },
    [router]
  );

  const menuItems = useMemo(
    () => [
      {
        key: "explore",
        label: t("translation:navbar.explore"),
        href: "/explore",
      },
      { key: "home", label: t("translation:navbar.home"), href: "/" },
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
        href: "/login",
      },
    ],
    [t]
  );

  const showSearchFunctionality = useMemo(() => {
    return pathname !== "/explore";
  }, [pathname]);

  const renderFullScreenSearch = () => {
    if (!showSearchFunctionality) return null;

    return (
      <div
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
          ${
            isSearchFocused
              ? "opacity-100 visible bg-black/50 backdrop-blur-sm h-screen w-screen flex pt-32 justify-center"
              : "opacity-0 invisible h-0"
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
            {/* <X className="w-8 h-8" /> */}
          </Button>
          <div>
            <Input
              size="lg"
              placeholder={t("translation:navbar.searchPlaceholder")}
              // startContent={<Search className="w-8 h-8 mr-4 text-light1" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
              onBlur={() => {
                setTimeout(() => setIsSearchFocused(false), 200);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(searchTerm);
                }
                if (e.key === "Escape") {
                  setIsSearchFocused(false);
                  setSearchTerm("");
                }
              }}
            />
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
      >
        <ModalContent>
          <ModalBody className="p-4">
            <Input
              className="w-full px-4 py-2"
              placeholder={t("translation:navbar.searchPlaceholder")}
              // startContent={<Search className="w-5 h-5 text-light1" />}
              value={searchTerm}
              autoFocus
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(searchTerm);
                  setIsSearchModalOpen(false);
                }
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

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
          >
            {item.label}
          </Link>
        </NavbarItem>
      ))}
    </NavbarContent>
  );

  const renderSearchAndAuth = () => (
    <NavbarContent justify="end">
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
                  "shadow-shadow1",
                  "bg-default-200/50",
                  "dark:bg-default/60",
                  "hover:bg-default-200/70",
                  "dark:hover:bg-default/70",
                  "group-data-[focus=true]:bg-default-200/50",
                  "dark:group-data-[focus=true]:bg-default/60",
                  "!cursor-text",
                ],
              }}
              placeholder={t("translation:navbar.searchPlaceholder")}
              radius="lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              // startContent={
              //   <Search className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
              // }
            />
          </div>
          <div className="md:hidden">
            <Button
              isIconOnly
              variant="light"
              onPress={() => setIsSearchModalOpen(true)}
            >
              {/* <Search className="w-5 h-5" /> */}
            </Button>
          </div>
        </>
      )}

      <NavbarItem>
        <AuthWrapper>
          {(user) =>
            user ? (
              <AvatarDropdown
                userName={
                  user.user_metadata?.name ||
                  t("translation:navbar.defaultUser")
                }
                userEmail={user.email || ""}
              />
            ) : (
              <Button
                color="secondary"
                variant="solid"
                onClick={handleStartClick}
                className="font-light bg-primary mb-1 text-white rounded-lg border-light2"
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
              index === 2
                ? "primary"
                : index === menuItems.length - 1
                ? "danger"
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
        className="rtl:space-x-reverse"
      >
        <NavbarContent>
          <Link href="/">
            <Image src={logo} alt="Logo" priority />
          </Link>
        </NavbarContent>

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
