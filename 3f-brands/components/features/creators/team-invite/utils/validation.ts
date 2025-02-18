import { EMAIL_REGEX, MIN_DESCRIPTION_LENGTH } from "./constants";

export const validateDescription = (description: string): string | null => {
  return description.length < MIN_DESCRIPTION_LENGTH
    ? `Description must be at least ${MIN_DESCRIPTION_LENGTH} characters long`
    : null;
};

export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};
