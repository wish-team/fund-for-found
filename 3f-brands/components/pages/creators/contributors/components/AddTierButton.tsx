// components/AddTierButton.tsx
import React from "react";
import { useTierStore } from "../store/tierStore";

export const AddTierButton: React.FC = () => {
  const { openModal } = useTierStore();

  return (
    <div
      className="h-full border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors p-6"
      onClick={openModal}
    >
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-light2 mb-4">Add Tier</h3>
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto ">
          <span className="text-white text-4xl">+</span>
        </div>
      </div>
    </div>
  );
};