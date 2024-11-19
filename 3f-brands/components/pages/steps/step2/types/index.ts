export interface SocialMediaOption {
  key: string;
  label: string;
  Icon: React.ComponentType;
  baseUrl: string;
}

export interface SocialInput {
  id: number;
  platform: string;
  url: string;
}

export interface EditorData {
  blocks: any[];
  time: number;
  version: string;
}

export interface Step2FormData {
  content: EditorData;
  socialLinks: SocialInput[];
}
