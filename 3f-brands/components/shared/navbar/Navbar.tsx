'use client';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import Image from "next/image";
import logo from "@/app/images/logo.svg";
import { LuSearch } from "react-icons/lu";
import Search from "../Search";
import { useState } from "react";
import User from "./User"

type NavigationBarProps = {};

const NavigationBar: React.FC<NavigationBarProps> = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage the dropdown

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Image src={logo} alt="Logo" />
        </NavbarBrand>
        <div className="hidden md:flex md:justify-center md:gap-3">
          {["Home", "Explore", "About Us", "Help & Support"].map((item, index) => (
            <NavbarItem key={index} isActive={item === "Customers"}>
              <Link
                className="px-2 text-gray-500"
                color={item === "Customers" ? "secondary" : "foreground"}
                href="#"
              >
                {item}
              </Link>
            </NavbarItem>
          ))}
        </div>
        {/* Hamburger Menu for mobile */}
        <button className="md:hidden" onClick={toggleMenu}>
          <LuSearch size={24} />
        </button>
      </NavbarContent>

      {/* Dropdown for mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white p-4 absolute top-full left-0 right-0 shadow-lg">
          {["Home", "Explore", "About Us", "Help & Support"].map((item, index) => (
            <NavbarItem key={index}>
              <Link
                className="block px-2 py-1 text-gray-500"
                href="#"
                onClick={toggleMenu} // Close menu on item click
              >
                {item}
              </Link>
            </NavbarItem>
          ))}
        </div>
      )}

      <NavbarContent as="div" className="items-center" justify="end">
        <Search />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name="Jason Hughes"
              size="sm"
              src="https://avatars.githubusercontent.com/u/30373425?v=4"
            />
          </DropdownTrigger>
          <DropdownMenu className="bg-white border rounded-xl w-[350px]" aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile"><User /></DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="logout" color="danger">Log Out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default NavigationBar;

  