import {
  FaInstagram,
  FaDiscord,
  FaGlobe,
  FaYoutube,
  FaTwitter,
  FaTelegram,
  FaLinkedin,
  FaWhatsapp,
  FaFacebook,
} from "react-icons/fa";
import { SocialMediaOption } from "../types";
import { useMemo } from "react";

export const SOCIAL_MEDIA_OPTIONS: SocialMediaOption[] = [
  {
    key: "instagram",
    label: "Instagram",
    Icon: FaInstagram,
    baseUrl: "https://instagram.com/",
  },
  {
    key: "discord",
    label: "Discord",
    Icon: FaDiscord,
    baseUrl: "https://discord.com/",
  },
  { key: "website", label: "Website", Icon: FaGlobe, baseUrl: "http://" },
  {
    key: "youtube",
    label: "YouTube",
    Icon: FaYoutube,
    baseUrl: "http://youtube.com/",
  },
  {
    key: "twitter",
    label: "Twitter",
    Icon: FaTwitter,
    baseUrl: "http://twitter.com/",
  },
  {
    key: "telegram",
    label: "Telegram",
    Icon: FaTelegram,
    baseUrl: "http://telegram.org/",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    Icon: FaLinkedin,
    baseUrl: "http://linkedin.com/",
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    Icon: FaWhatsapp,
    baseUrl: "http://whatsapp.com/",
  },
  {
    key: "facebook",
    label: "Facebook",
    Icon: FaFacebook,
    baseUrl: "http://facebook.com/",
  },
];

export const useSocialMediaOptions = () => {
  return useMemo<SocialMediaOption[]>(
    () => [
      {
        key: "instagram",
        label: "Instagram",
        Icon: FaInstagram,
        baseUrl: "https://instagram.com/", // Updated to https
      },
      {
        key: "discord",
        label: "Discord",
        Icon: FaDiscord,
        baseUrl: "https://discord.com/",
      },
      // ... other options with https ...
    ],
    []
  );
};
