import { SocialOption, SocialLink } from '../types';
import { SOCIAL_OPTIONS } from '../constants';
import { FaGlobe } from "react-icons/fa";

export const getIcon = (type: string) => {
  const option = SOCIAL_OPTIONS.find((opt) => opt.value === type);
  return option?.icon ?? <FaGlobe size={17} />;
};

export const getDefaultUrl = (type: string): string => {
  const option = SOCIAL_OPTIONS.find((opt) => opt.value === type);
  return option?.defaultUrl ?? 'https://';
};