import { ReactElement } from 'react';

export interface SocialOption {
  label: string;
  value: string;
  defaultUrl: string;
  icon: ReactElement;
}

export interface SocialLink {
  type: string;
  url: string;
}

export interface SocialLinks {
  [key: string]: string;
}

export interface SocialLinkFormData {
  socialLinks: SocialLink[];
}