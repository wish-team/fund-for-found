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

export const SOCIAL_MEDIA_OPTIONS: SocialMediaOption[] = [
  {
    key: "instagram",
    label: "Instagram",
    Icon: FaInstagram,
    baseUrl: "http://instagram.com/",
  },
  {
    key: "discord",
    label: "Discord",
    Icon: FaDiscord,
    baseUrl: "http://discord.com/",
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

export const ANIMATION_VARIANTS = {
  dropdown: {
    open: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
    closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
  },
  arrow: {
    open: { rotate: 180, transition: { duration: 0.3 } },
    closed: { rotate: 0, transition: { duration: 0.3 } },
  },
  listItem: {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
    closed: {
      opacity: 0,
      y: -20,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  },
};
