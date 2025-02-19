export interface BannerImage {
  url: string;
  zoom: number;
  title: string;
}

export interface CoverImageEditorProps {
  defaultImage?: string;
  defaultTitle?: string;
  onSave?: (imageData: BannerImage) => void;
  className?: string;
  maxSizeMB?: number;
}
