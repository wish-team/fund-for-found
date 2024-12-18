import { ACCEPTED_IMAGE_TYPES } from './constants';

// Create a type from the constant array
type AcceptedImageType = typeof ACCEPTED_IMAGE_TYPES[number];

export const validateImage = (
  file: File,
  maxSizeMB: number
): { isValid: boolean; error?: string } => {
  if (file.size > maxSizeMB * 1024 * 1024) {
    return {
      isValid: false,
      error: `File size must be less than ${maxSizeMB}MB`,
    };
  }

  if (!ACCEPTED_IMAGE_TYPES.includes(file.type as AcceptedImageType)) {
    return {
      isValid: false,
      error: "Please upload a valid image file (JPEG, PNG, GIF, or WebP)",
    };
  }

  return { isValid: true };
};