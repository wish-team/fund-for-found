export interface SocialMediaOption {
  key: string;
  label: string;
  Icon: React.ComponentType;
  baseUrl: string;
}

export interface SocialInputData {
  id: number;
  platform: string;
  url: string;
}

export interface Step2FormData {
  mission: string;
  socialLinks: SocialInputData[];
}
