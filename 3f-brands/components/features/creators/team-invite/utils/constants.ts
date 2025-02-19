 export const STORAGE_KEY = "teamMembers";

export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const ROLE_OPTIONS = [
  { label: "Admin", value: "Admin" },
  { label: "Teammate", value: "Teammate" },
] as const;

export const MIN_DESCRIPTION_LENGTH = 80;
