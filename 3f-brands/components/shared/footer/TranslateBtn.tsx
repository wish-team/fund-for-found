'use client';
import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { HiTranslate } from "react-icons/hi";
import {Selection} from "@nextui-org/react"
export default function TranslateBtn() {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(["English (100%)"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <Dropdown className="text-sm bg-white rounded-lg shadow">
      <DropdownTrigger>
        <Button 
          variant="bordered" 
          className="capitalize text-sm bg-white text-gray2 rounded-lg shadow"
        >
          <HiTranslate />
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key="English (100%)">English (100%)</DropdownItem>
        <DropdownItem key="Persian">Persian</DropdownItem>
        <DropdownItem key="Germany">Germany</DropdownItem>
        <DropdownItem key="Arabic">Arabic</DropdownItem>
        <DropdownItem key="France">France</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
