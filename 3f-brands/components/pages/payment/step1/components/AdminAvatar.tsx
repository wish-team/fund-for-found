import { memo } from "react";
import { User } from "lucide-react";
import { AdminInfo } from "../types";

interface AdminAvatarProps {
  admin: AdminInfo;
  className?: string;
}

export const AdminAvatar = memo(function AdminAvatar({
  admin,
  className = "",
}: AdminAvatarProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
        <User className="w-6 h-6 text-gray-400" aria-hidden="true" />
      </div>
      <div>
        <h3 className="text-base font-medium">{admin.name}</h3>
        <p className="text-gray-500 text-sm">{admin.role}</p>
      </div>
    </div>
  );
});
