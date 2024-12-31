// src/components/pages/creators/invite-team/hooks/useTeamMembers.ts
import { useState, useEffect } from "react";
import { TeamMember } from "../types/team";
import { STORAGE_KEY } from "../utils/constants";

export const useTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    // Initialize state with localStorage data if available
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Save to localStorage whenever team members change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(teamMembers));
    }
  }, [teamMembers]);

  const addTeamMember = (member: TeamMember) => {
    setTeamMembers((prev) => [...prev, member]);
  };

  const updateTeamMember = (index: number, member: TeamMember) => {
    setTeamMembers((prev) => {
      const updated = [...prev];
      updated[index] = member;
      return updated;
    });
  };

  const deleteTeamMember = (index: number) => {
    setTeamMembers((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  return {
    teamMembers,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
  };
};
