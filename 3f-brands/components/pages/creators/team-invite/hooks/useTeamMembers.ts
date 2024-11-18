// src/components/pages/creators/invite-team/hooks/useTeamMembers.ts
import { useState, useEffect } from "react";
import { TeamMember } from "../types/team";
import { STORAGE_KEY } from "../utils/constants";

export const useTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setTeamMembers(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage when team members change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(teamMembers));
    }
  }, [teamMembers]);

  const addTeamMember = (member: TeamMember) => {
    setTeamMembers((prev) => [...prev, member]);
  };

  const updateTeamMember = (index: number, member: TeamMember) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index] = member;
    setTeamMembers(updatedMembers);
  };

  const deleteTeamMember = (index: number) => {
    const updatedMembers = [...teamMembers];
    updatedMembers.splice(index, 1);
    setTeamMembers(updatedMembers);
  };

  return {
    teamMembers,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
  };
};
