export const ZOOM_SETTINGS = {
    min: 1,
    max: 2,
    step: 0.1,
    default: 1,
  } as const;
  
  export const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg',
  ] as const;
  
  export const DEFAULT_IMAGE = 'https://dummyjson.com/image/200x100';