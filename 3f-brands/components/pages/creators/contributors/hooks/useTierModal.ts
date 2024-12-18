import { useState } from "react";
import { Tier } from "../types/tier";

export const useTierModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setEditingIndex(null);
  };

  const editTier = (index: number, tier: Tier) => {
    setEditingIndex(index);
    setIsOpen(true);
    return tier;
  };

  return {
    isOpen,
    editingIndex,
    openModal,
    closeModal,
    editTier,
  };
};
