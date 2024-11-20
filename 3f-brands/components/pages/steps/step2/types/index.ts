import React from 'react';
import { IconType } from 'react-icons';
import { BlockToolConstructable, ToolConstructable } from '@editorjs/editorjs';

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

export interface EditorData {
  blocks: any[];
  time: number;
  version: string;
}

export interface Step2FormData {
  content: EditorData;
  socialLinks: SocialInput[];
}

export interface SocialInputFieldProps {
  id: number;
  onRemove: (id: number) => void;
  onChange: (id: number, platform: string, url: string) => void;
  initialPlatform?: string;
  initialUrl?: string;
}

// New type definitions for Editor.js
export interface HeaderConfig {
  levels?: number[];
  defaultLevel?: number;
}

export interface HeaderToolConfig {
  class: BlockToolConstructable;
  inlineToolbar?: boolean;
  config?: HeaderConfig;
}

export interface EditorJSTools {
  [key: string]: {
    class: ToolConstructable | BlockToolConstructable;
    inlineToolbar?: boolean;
    config?: any;
  };
}