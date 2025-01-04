export interface RewardTier {
  id: string;
  name: string;
  rewardDescription: string;
  amount: string;  // Add this line
  imagePreview?: string;  // This property is also used in RewardCard but missing
}

export interface CompanyInfoType {
  name: string;
  joinDate: string;
  tierImage?: string; 
}

export interface AdminInfo {
  name: string;
  role: string;
}