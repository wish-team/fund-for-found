import { useState, useEffect, useRef, RefObject } from "react";
import { DropdownState } from "../types";

interface UseDropdownProps {
  initialState: DropdownState;
}

interface UseDropdownReturn {
  state: DropdownState;
  dropdownRef: RefObject<HTMLDivElement>;
  toggleDropdown: (isOpen: boolean) => void;
  handleClickOutside: (event: MouseEvent) => void;
  filterItems: (items: string[], searchValue: string) => void;
}

export const useDropdown = ({
  initialState,
}: UseDropdownProps): UseDropdownReturn => {
  const [state, setState] = useState<DropdownState>(initialState);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (isOpen: boolean) => {
    setState((prev) => ({ ...prev, isOpen }));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      toggleDropdown(false);
    }
  };

  const filterItems = (items: string[], searchValue: string) => {
    const filtered = items.filter((item) =>
      item.toLowerCase().includes(searchValue.toLowerCase())
    );
    setState((prev) => ({ ...prev, filteredItems: filtered }));
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return {
    state,
    dropdownRef,
    toggleDropdown,
    handleClickOutside,
    filterItems,
  };
};
