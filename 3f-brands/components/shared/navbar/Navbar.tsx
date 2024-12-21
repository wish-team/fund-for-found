"use client";
import React, { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
import { AuthWrapper } from "@/app/auth/callback/AuthWrapper";
import { Search, X } from "lucide-react";

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
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const searchFromUrl = searchParams.get("search") || "";
    setSearchTerm(searchFromUrl);
  }, [searchParams]);

  const handleStartClick = useCallback(() => {
    router.push("http://localhost:3000/login");
  }, [router]);

  const handleSearch = useCallback(
    (term: string) => {
      if (term.trim()) {
        router.push(`/explore?search=${encodeURIComponent(term.trim())}`);
        setIsSearchFocused(false);
        setIsSearchModalOpen(false);
      }
    },
    [router]
  );

  const menuItems = [
    "Explore",
    "Home",
    "About us",
    "Help & Support",
    "Login/signup",
    "Start",
  ];

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
            <X className="w-8 h-8" />
          </Button>
          <div className="bg-white p-2 rounded-full border shadow-md">
            <Input
              className="py-0 px-2 text-base w-full shadow-none"
              placeholder="Search brand, category, tag or..."
              startContent={<Search className="w-8 h-8 mr-4 text-light1" />}
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
        backdrop="blur"
        className="bg-white pt-6"
      >
        <ModalContent>
          <ModalBody className="p-4">
            <Input
              className="w-full px-4 py-2"
              placeholder="Search brand, category, tag or..."
              startContent={<Search className="w-5 h-5 text-light1" />}
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

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen} isBordered>
        <NavbarContent>
          <Image src={logo} alt="found for fund Logo" />
        </NavbarContent>

        <NavbarContent
          className="hidden text-sm text-gray3 lg:pe-20 space-x-3 sm:flex justify-start gap-4"
          justify="center"
        >
          <NavbarItem>
            <Link color="foreground" href="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive={pathname === "/explore"}>
            <Link
              href="/explore"
              aria-current={pathname === "/explore" ? "page" : undefined}
            >
              Explore
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/about">
              About us
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/help">
              Help & Support
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          {/* Desktop Search */}
          {showSearchFunctionality && (
            <div className="hidden md:block relative">
              <Input
                className="rounded-lg border border-light3 shadow-shadow1 text-xs font-extralight hover:border-purple-500 focus:outline-none"
                placeholder="Search brand, category, tag or..."
                startContent={<Search className="w-5 h-5 text-light1" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(searchTerm);
                  }
                }}
              />
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
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className="w-full"
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      {/* Full Screen Search for Larger Screens */}
      {renderFullScreenSearch()}

      {/* Mobile Search Modal */}
      {renderMobileSearchModal()}
    </>
  );
};

export default NavigationBar;