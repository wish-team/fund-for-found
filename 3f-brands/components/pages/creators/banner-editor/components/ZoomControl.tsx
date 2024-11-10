import React from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import { ZOOM_SETTINGS } from "../utils/constants";

interface ZoomControlProps {
  value: number;
  onChange: (value: number) => void;
}

export const ZoomControl: React.FC<ZoomControlProps> = ({
  value,
  onChange,
}) => (
  <div className="flex items-center gap-4 mt-4 px-2">
    <ZoomOut size={20} className="text-gray-500" />
    <div className="flex-1 relative">
      <input
        type="range"
        min={ZOOM_SETTINGS.min}
        max={ZOOM_SETTINGS.max}
        step={ZOOM_SETTINGS.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-purple-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-purple-600 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer"
      />
    </div>
    <ZoomIn size={20} className="text-gray-500" />
  </div>
);