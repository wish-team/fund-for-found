// src/components/pages/social-links/constants.ts
import {
    FaDiscord,
    FaInstagram,
    FaYoutube,
    FaTwitter,
    FaWhatsapp,
    FaTelegram,
    FaFacebook,
    FaLinkedinIn
  } from "react-icons/fa6";  // Note: changed from fa to fa6
  import { SocialOption } from './types';
  import { FaGlobeAmericas } from "react-icons/fa";
  
  export const STORAGE_KEY = "socialLinksData";
  export const MIN_SOCIAL_LINKS = 3;
  
  export const SOCIAL_OPTIONS: SocialOption[] = [
    {
      label: "Website",
      value: "website",
      defaultUrl: "https://",
      icon: <FaGlobeAmericas size={17} />,  // Changed from FaGlobe to FaGlobeAmericas
    },
    {
      label: "Discord",
      value: "discord",
      defaultUrl: "https://discord.com/",
      icon: <FaDiscord size={17} />,
    },
    {
      label: "Instagram",
      value: "instagram",
      defaultUrl: "https://instagram.com/",
      icon: <FaInstagram size={17} />,
    },
    {
      label: "YouTube",
      value: "youtube",
      defaultUrl: "https://youtube.com/@",
      icon: <FaYoutube size={17} />,
    },
    {
      label: "Twitter",
      value: "twitter",
      defaultUrl: "https://twitter.com/",
      icon: <FaTwitter size={17} />,
    },
    {
      label: "WhatsApp",
      value: "whatsapp",
      defaultUrl: "https://wa.me/",
      icon: <FaWhatsapp size={17} />,
    },
    {
      label: "Telegram",
      value: "telegram",
      defaultUrl: "https://t.me/",
      icon: <FaTelegram size={17} />,
    },
    {
      label: "Facebook",
      value: "facebook",
      defaultUrl: "https://facebook.com/",
      icon: <FaFacebook size={17} />,
    },
    {
      label: "LinkedIn",
      value: "linkedin",
      defaultUrl: "https://linkedin.com/in/",
      icon: <FaLinkedinIn size={17} />,  
    },
  ];