"use client";
import React from "react";
import Image from "next/image";
import logo from "@/app/images/logo.svg";
import AvatarDropdown from "./Avatar";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import Inputs from "../Input";
import { AuthWrapper } from "@/app/auth/callback/AuthWrapper";
import { useRouter } from "next/navigation";

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();

  const handleStartClick = () => {
    router.push("/login");
  };

  const menuItems = [
    "Explore",
    "Home",
    "About us",
    "Help & Support",
    "Login/signup",
    "Start",
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered>
      <NavbarContent>
        <Image src={logo} alt="Logo" />
      </NavbarContent>

      <NavbarContent
        className="hidden text-sm text-gray3 lg:pe-20 space-x-3 sm:flex justify-start gap-4"
        justify="center"
      >
        <NavbarItem>
          <Link color="foreground" href="#">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Explore
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            About us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Help & Support
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <div className="hidden md:block">
          <Inputs
            placeholder="Search brand, category, tag or..."
            onChange={() => {}} // Add your onChange handler here
            value="" // Set the value accordingly
          />
        </div>
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
                  Sign in
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
  );
}
