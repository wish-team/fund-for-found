"use client";
import React, { useState, useCallback, useMemo, Suspense } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import NextLink from "next/link";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalBody,
} from "@nextui-org/react";

import logo from "@/app/images/logo.svg";
import AvatarDropdown from "./Avatar";
import { AuthWrapper } from "@/components/auth/AuthWrapper";
import { Search, X } from "lucide-react";

interface NavigationBarProps {
  // Add any external props if needed
}

interface NavigationItem {
  label: string;
  path: string;
  external?: boolean;
}

const LOGIN_URL = "http://localhost:3000/login";

// Separate search component that uses useSearchParams
const SearchComponent = ({
  onSearch,
}: {
  onSearch: (term: string) => void;
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(inputValue);
    }
  };

  return (
    <Input
      className="rounded-lg border border-light3 shadow-shadow1 text-xs font-extralight hover:border-purple-500 focus:outline-none"
      placeholder="Search brand, category, tag or..."
      startContent={<Search className="w-5 h-5 text-light1" />}
      value={inputValue}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
    />
  );
};

const NavigationBar: React.FC<NavigationBarProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const navigationItems: NavigationItem[] = [
    { label: "Home", path: "/" },
    { label: "Explore", path: "/explore" },
    { label: "About us", path: "/about" },
    { label: "Help & Support", path: "/help" },
  ];

  const menuItems: NavigationItem[] = [
    ...navigationItems,
    { label: "Login/signup", path: LOGIN_URL, external: true },
    { label: "Start", path: LOGIN_URL, external: true },
  ];

  const handleStartClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = LOGIN_URL;
  }, []);

  const handleSearch = useCallback(
    (term: string) => {
      if (term.trim()) {
        router.push(`/explore?search=${encodeURIComponent(term.trim())}`, {
          scroll: false,
        });
        setIsSearchFocused(false);
        setIsSearchModalOpen(false);
      }
    },
    [router]
  );

  const showSearchFunctionality = useMemo(() => {
    return pathname !== "/explore";
  }, [pathname]);

  const NavLink: React.FC<NavigationItem> = ({ path, label, external }) => {
    const isActive = pathname === path;

    if (external) {
      return (
        <a
          href={path}
          className="text-gray3 hover:text-primary transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          {label}
        </a>
      );
    }

    return (
      <NextLink
        href={path}
        className={`${
          isActive ? "text-primary font-medium" : "text-gray3"
        } hover:text-primary transition-colors`}
        onClick={() => setIsMenuOpen(false)}
      >
        {label}
      </NextLink>
    );
  };

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
            onPress={() => setIsSearchFocused(false)}
          >
            <X className="w-8 h-8" />
          </Button>
          <div className="bg-white p-2 rounded-full border shadow-md">
            <Suspense fallback={<div>Loading...</div>}>
              <SearchComponent onSearch={handleSearch} />
            </Suspense>
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
        backdrop="blur"
        className="bg-white pt-6"
      >
        <ModalContent>
          <ModalBody className="p-4">
            <Suspense fallback={<div>Loading...</div>}>
              <SearchComponent
                onSearch={(term) => {
                  handleSearch(term);
                  setIsSearchModalOpen(false);
                }}
              />
            </Suspense>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen} isBordered>
        <NavbarContent>
          <NextLink href="/">
            <Image src={logo} alt="found for fund Logo" />
          </NextLink>
        </NavbarContent>

        <NavbarContent
          className="hidden text-sm text-gray3 lg:pe-20 space-x-3 sm:flex justify-start gap-4"
          justify="center"
        >
          {navigationItems.map((item) => (
            <NavbarItem key={item.path}>
              <NavLink {...item} />
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end">
          {/* Desktop Search */}
          {showSearchFunctionality && (
            <div className="hidden md:block relative">
              <Suspense fallback={<div>Loading...</div>}>
                <SearchComponent onSearch={handleSearch} />
              </Suspense>
            </div>
          )}

          {/* Mobile Search Icon */}
          {showSearchFunctionality && (
            <div className="md:hidden">
              <Button
                isIconOnly
                variant="light"
                onPress={() => setIsSearchModalOpen(true)}
              >
                <Search className="w-5 h-5" />
              </Button>
            </div>
          )}

          <NavbarItem>
            <AuthWrapper>
              {(user) =>
                user ? (
                  <AvatarDropdown
                    userName={user.name || "User"}
                    userEmail={user.email || ""}
                  />
                ) : (
                  <Button
                    color="secondary"
                    variant="solid"
                    onClick={handleStartClick}
                    className="font-light bg-primary mb-1 text-white rounded-lg border-light2"
                  >
                    Login
                  </Button>
                )
              }
            </AuthWrapper>
          </NavbarItem>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item) => (
            <NavbarMenuItem key={item.path}>
              <NavLink {...item} />
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      {renderFullScreenSearch()}
      {renderMobileSearchModal()}
    </>
  );
};

export default NavigationBar;
