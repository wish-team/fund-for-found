import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAngleDown, FaAngleUp, FaTrashCan } from "react-icons/fa6";
import { SOCIAL_MEDIA_OPTIONS, ANIMATION_VARIANTS } from "../utils/constants";
import { SocialInputData } from "../types";

interface SocialInputProps {
  id: number;
  value: SocialInputData;
  onUpdate: (id: number, data: Partial<SocialInputData>) => void;
  onRemove: (id: number) => void;
}

export const SocialInput: React.FC<SocialInputProps> = ({
  id,
  value,
  onUpdate,
  onRemove,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleSelectChange = (platform: string) => {
    const selected = SOCIAL_MEDIA_OPTIONS.find(
      (option) => option.key === platform
    );
    if (selected) {
      onUpdate(id, {
        platform,
        url: selected.baseUrl,
      });
      setDropdownOpen(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center mb-2 relative">
      <div className="relative w-full md:w-4/12">
        <button
          onClick={() => setDropdownOpen(!isDropdownOpen)}
          onBlur={() => setDropdownOpen(false)}
          className="border border-light3 text-sm text-gray4 bg-white rounded-lg shadow hover:border-purple-500 flex items-center justify-between w-full p-2"
        >
          <span>
            {
              SOCIAL_MEDIA_OPTIONS.find(
                (option) => option.key === value.platform
              )?.label
            }
          </span>
          <motion.span
            variants={ANIMATION_VARIANTS.arrow}
            animate={isDropdownOpen ? "open" : "closed"}
            initial={false}
            className="ml-2"
          >
            {isDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
          </motion.span>
        </button>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.ul
              variants={ANIMATION_VARIANTS.dropdown}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute text-gray4 w-full text-sm max-h-[200px] overflow-auto z-50 bg-white border border-light3 rounded-lg shadow mt-1"
            >
              {SOCIAL_MEDIA_OPTIONS.map(({ key, label, Icon }) => (
                <motion.li
                  key={key}
                  onClick={() => handleSelectChange(key)}
                  variants={ANIMATION_VARIANTS.listItem}
                  className="flex items-center cursor-pointer p-2 hover:bg-primary50"
                >
                  <Icon className="mr-2" />
                  {label}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <input
        type="text"
        value={value.url}
        onChange={(e) => onUpdate(id, { url: e.target.value })}
        className="border border-light3 text-sm text-gray4 bg-white rounded-lg shadow hover:border-purple-500 focus:border-purple-500 focus:outline-none mt-2 md:mt-0 w-full md:w-7/12 p-2 md:ml-2"
      />

      <button
        onClick={() => onRemove(id)}
        className="mt-2 md:mt-0 md:w-1/12 md:ml-2 p-2 text-gray4 hover:text-red-500"
      >
        <FaTrashCan />
      </button>
    </div>
  );
};
