import React from "react";

export interface ToggleSwitchProps {
  value: boolean;
  onToggle: (newValue: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ value, onToggle }) => {
  return (
    <div
      onClick={() => onToggle(!value)}
      className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors duration-200 ${value ? "bg-blue-500" : "bg-gray-300"}`}
    >
      <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${value ? "transform translate-x-6" : ""}`}></div>
    </div>
  );
};

export default ToggleSwitch;
