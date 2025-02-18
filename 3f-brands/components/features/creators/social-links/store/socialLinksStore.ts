import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SocialLinks, SocialLink } from "../types";

interface SocialLinksState {
  links: SocialLinks;
  socialLinks: SocialLink[];
  setLinks: (newLinks: SocialLinks) => void;
  setSocialLinks: (newSocialLinks: SocialLink[]) => void;
}

const DEFAULT_LINKS: SocialLinks = {
  website: "https://3f.com/",
  discord: "https://discord.com/wishwo",
  instagram: "https://instagram.com/wishwo",
};

export const useSocialLinksStore = create<SocialLinksState>()(
  persist(
    (set) => ({
      links: DEFAULT_LINKS,
      socialLinks: Object.entries(DEFAULT_LINKS).map(([type, url]) => ({
        type,
        url,
      })),
      setLinks: (newLinks) =>
        set({
          links: newLinks,
          socialLinks: Object.entries(newLinks).map(([type, url]) => ({
            type,
            url,
          })),
        }),
      setSocialLinks: (newSocialLinks) => set({ socialLinks: newSocialLinks }),
    }),
    {
      name: "social-links-storage",
    }
  )
);
