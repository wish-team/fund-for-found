export interface BrandTag {
  tag_name: string;
}

export interface SocialMedia {
  name: string;
  link: string;
}

export interface BrandFormData {
  brand_name: string;
  brand_image: string;
  about_brand: string;
  brand_country: string;
  owner_id: string;
  brand_tags: BrandTag[];
  social_media: SocialMedia[];
}
