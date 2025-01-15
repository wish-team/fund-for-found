import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaAngleDown, FaTrashCan } from 'react-icons/fa6';
import { SOCIAL_MEDIA_OPTIONS } from '../utils/constants';
import { dropdownVariants, arrowVariants, listItemVariants } from '../utils/animations';
import { SocialMediaOption, SocialInputFieldProps } from '../types/index';

export const SocialInputField: React.FC<SocialInputFieldProps> = ({
  id,
  onRemove,
  onChange,
  initialPlatform = 'instagram',
  initialUrl = 'http://instagram.com/',
}) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState<string>(initialUrl);
  const [selectedKey, setSelectedKey] = useState<string>(initialPlatform);
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const handleSelectChange = (key: string) => {
    const selected = SOCIAL_MEDIA_OPTIONS.find((option) => option.key === key);
    if (selected) {
      const newUrl = selected.baseUrl;
      setInputValue(newUrl);
      setSelectedKey(key);
      setDropdownOpen(false);
      onChange(id, key, newUrl);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setInputValue(newUrl);
    onChange(id, selectedKey, newUrl);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
  };

  const SelectedIcon = SOCIAL_MEDIA_OPTIONS.find(
    (option: SocialMediaOption) => option.key === selectedKey
  )?.Icon;

  return (
    <div className="flex flex-col md:flex-row items-center mb-2 relative w-full gap-2">
      <div className="relative w-full md:w-4/12">
        <button
          type="button"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
          onBlur={handleBlur}
          className="border border-light3 text-sm text-gray4 bg-white rounded-lg shadow hover:border-purple-500 flex items-center justify-between w-full p-2"
        >
          <span className="flex items-center gap-2">
            {SelectedIcon && <SelectedIcon className="text-gray4" size={20} />}
            {t(`social.platforms.${selectedKey}`)}
          </span>
          <motion.span
            variants={arrowVariants}
            animate={isDropdownOpen ? 'open' : 'closed'}
            initial="closed"
            className="ml-2"
          >
            <FaAngleDown />
          </motion.span>
        </button>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.ul
              variants={dropdownVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute text-gray4 w-full text-sm max-h-[200px] overflow-auto z-50 bg-white border border-light3 rounded-lg shadow mt-1"
            >
              {SOCIAL_MEDIA_OPTIONS.map(({ key, Icon }) => (
                <motion.li
                  key={key}
                  variants={listItemVariants}
                  onClick={() => handleSelectChange(key)}
                  className="flex items-center gap-2 cursor-pointer p-2 hover:bg-primary50"
                >
                  <Icon className="text-gray4" size={20} />
                  {t(`social.platforms.${key}`)}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <input
        type="url"
        value={inputValue}
        onChange={handleUrlChange}
        placeholder={t('translation:social.urlPlaceholder')}
        className="border border-light3 text-sm text-gray4 bg-white rounded-lg shadow hover:border-purple-500 focus:border-purple-500 focus:outline-none w-full md:w-7/12 p-2"
      />

      <button
        type="button"
        onClick={() => onRemove(id)}
        className="p-2 text-gray4 hover:text-red-500 transition-colors duration-200"
        aria-label={t('translation:social.removeButton')}
      >
        <FaTrashCan />
      </button>
    </div>
  );
};