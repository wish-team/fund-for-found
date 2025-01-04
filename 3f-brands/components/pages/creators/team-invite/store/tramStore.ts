import { create } from "zustand";
import { TeamMember, FormData } from "../types/team";
import { STORAGE_KEY } from "../utils/constants";

interface TeamState {
  teamMembers: TeamMember[];
  formData: FormData;
  isModalOpen: boolean;
  isSelectOpen: boolean;
  showInviteModal: boolean;
  invitedMember: TeamMember | null;
  editingIndex: number | null;
  descriptionError: string;
  emailError: string;

  // Actions
  setTeamMembers: (members: TeamMember[]) => void;
  addTeamMember: (member: TeamMember) => void;
  updateTeamMember: (index: number, member: TeamMember) => void;
  deleteTeamMember: (index: number) => void;
  setFormData: (data: Partial<FormData>) => void;
  resetForm: () => void;
  setModalOpen: (isOpen: boolean) => void;
  setSelectOpen: (isOpen: boolean) => void;
  setShowInviteModal: (show: boolean) => void;
  setInvitedMember: (member: TeamMember | null) => void;
  setEditingIndex: (index: number | null) => void;
  setDescriptionError: (error: string) => void;
  setEmailError: (error: string) => void;
}

const initialFormData: FormData = {
  name: "",
  role: "Teammate",
  email: "",
  description: "",
};

// Initialize state from localStorage if available
const getInitialTeamMembers = (): TeamMember[] => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

export const useTeamStore = create<TeamState>((set, get) => ({
  teamMembers: getInitialTeamMembers(),
  formData: initialFormData,
  isModalOpen: false,
  isSelectOpen: false,
  showInviteModal: false,
  invitedMember: null,
  editingIndex: null,
  descriptionError: "",
  emailError: "",

  setTeamMembers: (members) => {
    set({ teamMembers: members });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  },

  addTeamMember: (member) => {
    const newMembers = [...get().teamMembers, member];
    get().setTeamMembers(newMembers);
  },

  updateTeamMember: (index, member) => {
    const newMembers = [...get().teamMembers];
    newMembers[index] = member;
    get().setTeamMembers(newMembers);
  },

  deleteTeamMember: (index) => {
    const newMembers = [...get().teamMembers];
    newMembers.splice(index, 1);
    get().setTeamMembers(newMembers);
  },

  setFormData: (data) => {
    set((state) => ({
      formData: { ...state.formData, ...data },
    }));
  },

  resetForm: () => {
    set({
      formData: initialFormData,
      isModalOpen: false,
      editingIndex: null,
      descriptionError: "",
      emailError: "",
    });
  },

  setModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
  setSelectOpen: (isOpen) => set({ isSelectOpen: isOpen }),
  setShowInviteModal: (show) => set({ showInviteModal: show }),
  setInvitedMember: (member) => set({ invitedMember: member }),
  setEditingIndex: (index) => set({ editingIndex: index }),
  setDescriptionError: (error) => set({ descriptionError: error }),
  setEmailError: (error) => set({ emailError: error }),
}));
