import { create } from "zustand";

type ContributorStore = {
  selectedContributor: Contributor | null;
  setSelectedContributor: (contributor: Contributor | null) => void;
};

export const useContributorStore = create<ContributorStore>((set) => ({
  selectedContributor: null,
  setSelectedContributor: (contributor) =>
    set({ selectedContributor: contributor }),
}));
