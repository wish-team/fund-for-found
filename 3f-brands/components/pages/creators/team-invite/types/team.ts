
export interface TeamMember {
  name: string;
  role: "Admin" | "Teammate";
  email: string;
  description: string;
}

export interface FormData extends TeamMember {}

export interface PreviewCardProps {
  member: TeamMember;
  index?: number;
  showEdit?: boolean;
  onEdit?: (member: TeamMember, index: number) => void;
  onDelete?: (index: number) => void;
}