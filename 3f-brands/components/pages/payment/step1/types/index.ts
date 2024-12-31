export interface Tier {
  id: string;
  name: string;
  rewardDescription: string;
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