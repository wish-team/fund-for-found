import { useState, useEffect } from 'react';
import { SocialLinks, SocialLink } from '../types';
import { STORAGE_KEY } from '../constants';

const DEFAULT_LINKS: SocialLinks = {
  website: "https://3f.com/",
  discord: "https://discord.com/wishwo",
  instagram: "https://instagram.com/wishwo",
};

export const useSocialLinks = () => {
  const [links, setLinks] = useState<SocialLinks>(() => {
    if (typeof window !== "undefined") {
      const savedLinks = localStorage.getItem(STORAGE_KEY);
      return savedLinks ? JSON.parse(savedLinks) : DEFAULT_LINKS;
    }
    return DEFAULT_LINKS;
  });

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(() => 
    Object.entries(links).map(([type, url]) => ({ type, url }))
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
    }
  }, [links]);

  return { links, setLinks, socialLinks, setSocialLinks };
};