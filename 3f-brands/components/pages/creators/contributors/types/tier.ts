export interface Tier {
  id: string;
  name: string;
  rewardDescription: string;
  amount: string;
  imagePreview: string;
}

export interface TierFormData {
  name: string;
  rewardDescription: string;
  amount: string;
  coverPhoto: File | null;
}

export type TierError =
  | "fetchFailed"
  | "createFailed"
  | "updateFailed"
  | "deleteFailed"
  | "networkError"
  | "serverError";
