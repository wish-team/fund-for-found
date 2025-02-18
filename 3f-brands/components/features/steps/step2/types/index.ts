import { IconType } from 'react-icons';

export interface SocialMediaOption {
  key: string;
  label: string;
  Icon: IconType;
  baseUrl: string;
}

export interface SocialInput {
  id: number;
  platform: string;
  url: string;
}

export interface Step2FormData {
  socialLinks: SocialInput[];
}

export interface SocialInputFieldProps {
  id: number;
  onRemove: (id: number) => void;
  onChange: (id: number, platform: string, url: string) => void;
  initialPlatform?: string;
  initialUrl?: string;
}