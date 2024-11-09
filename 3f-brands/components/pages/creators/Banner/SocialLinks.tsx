// types.ts
import { ReactElement } from 'react';

export interface SocialOption {
  label: string;
  value: string;
  defaultUrl: string;
  icon: ReactElement;
}

export interface SocialLink {
  type: string;
  url: string;
}

export interface SocialLinks {
  [key: string]: string;
}

// constants.ts
import {
  FaGlobe,
  FaDiscord,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaWhatsapp,
  FaTelegram,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";
import { SocialOption } from './types';

export const STORAGE_KEY = "socialLinksData";

export const SOCIAL_OPTIONS: SocialOption[] = [
  {
    label: "Website",
    value: "website",
    defaultUrl: "https://",
    icon: <FaGlobe size={17} />,
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
    icon: <FaLinkedin size={17} />,
  },
];

// utils/validation.ts
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// hooks/useSocialLinks.ts
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

// components/SocialLinkEditor.tsx
import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem,
  Button,
  Input,
} from "@nextui-org/react";
import { IoMdAdd } from "react-icons/io";
import { FaTimes } from "react-icons/fa";
import { SOCIAL_OPTIONS } from '../constants';
import { useSocialLinks } from '../hooks/useSocialLinks';
import { isValidUrl } from '../utils/validation';
import { SocialLink, SocialLinks } from '../types';

const SocialLinkEditor: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { links, setLinks, socialLinks, setSocialLinks } = useSocialLinks();
  const [errors, setErrors] = useState<Record<number, string>>({});

  const getIcon = (type: string) => {
    const option = SOCIAL_OPTIONS.find((opt) => opt.value === type);
    return option?.icon ?? <FaGlobe size={17} />;
  };

  const handleAddSocialLink = () => {
    const defaultOption = SOCIAL_OPTIONS[0];
    setSocialLinks([
      ...socialLinks,
      {
        type: defaultOption.value,
        url: defaultOption.defaultUrl,
      },
    ]);
  };

  const handleRemoveLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
    const newErrors = { ...errors };
    delete newErrors[index];
    setErrors(newErrors);
  };

  const handleUpdateLink = (
    index: number,
    field: keyof SocialLink,
    value: string
  ) => {
    const newLinks = [...socialLinks];
    const newErrors = { ...errors };

    if (field === 'url' && !isValidUrl(value)) {
      newErrors[index] = 'Please enter a valid URL';
    } else {
      delete newErrors[index];
    }

    newLinks[index] = {
      ...newLinks[index],
      [field]: value,
      ...(field === "type" && {
        url: SOCIAL_OPTIONS.find((opt) => opt.value === value)?.defaultUrl || "",
      }),
    };

    setSocialLinks(newLinks);
    setErrors(newErrors);
  };

  const handleSave = () => {
    // Validate all URLs before saving
    const newErrors: Record<number, string> = {};
    socialLinks.forEach((link, index) => {
      if (!isValidUrl(link.url)) {
        newErrors[index] = 'Please enter a valid URL';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newLinks: SocialLinks = socialLinks.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.type]: curr.url,
      }),
      {} as SocialLinks
    );

    setLinks(newLinks);
    onOpenChange();
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="flex items-center space-x-4 mb-4">
        {Object.entries(links).map(([type, url]) => (
          <a
            key={type}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
          >
            {getIcon(type)}
          </a>
        ))}
        <Button variant="bordered" onPress={onOpen} className="ml-4">
          Edit
        </Button>
      </div>

      <Modal
        isOpen={isOpen}
        backdrop="blur"
        className="bg-white rounded-lg p-3 shadow-shadow1"
        onOpenChange={onOpenChange}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-gray-3">
                Edit Social Links
              </ModalHeader>
              <ModalBody>
                {socialLinks.map((link, index) => (
                  <div key={index} className="flex items-center gap-2 mb-4">
                    <Select
                      selectedKeys={[link.type]}
                      onChange={(e) =>
                        handleUpdateLink(index, "type", e.target.value)
                      }
                      className="w-1/3 border border-light3 text-sm text-gray4 rounded-lg shadow hover:border-purple-500 flex items-center justify-between"
                      startContent={getIcon(link.type)}
                      aria-label="Select social platform"
                    >
                      {SOCIAL_OPTIONS.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          startContent={option.icon}
                          className="text-xs text-light1 data-[selected=true]:text-primary bg-white"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </Select>
                    <div className="flex-1">
                      <Input
                        value={link.url}
                        onChange={(e) =>
                          handleUpdateLink(index, "url", e.target.value)
                        }
                        placeholder="Enter URL"
                        className="border border-light3 text-sm text-gray4 bg-white rounded-lg shadow hover:border-purple-500 focus:border-purple-500"
                        isInvalid={!!errors[index]}
                        errorMessage={errors[index]}
                      />
                    </div>
                    <Button
                      isIconOnly
                      color="danger"
                      variant="light"
                      onPress={() => handleRemoveLink(index)}
                      className="h-12 w-12 text-gray3 hover:text-red-500"
                    >
                      <FaTimes size={18} />
                    </Button>
                  </div>
                ))}
                <Button
                  onPress={handleAddSocialLink}
                  className="bg-light4 text-sm font-light text-gray3 rounded-lg border border-light2 w-full hover:border-purple-500"
                  color="primary"
                  variant="flat"
                  startContent={<IoMdAdd />}
                >
                  Add social link
                </Button>
              </ModalBody>
              <ModalFooter className="flex justify-between">
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  className="bg-light3 border border-primary200 hover:bg-primary50 hover:border-purple-500 rounded-lg text-gray4 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={handleSave}
                  className="bg-primary text-white border border-primary200 hover:bg-primary400 rounded-lg text-xs"
                  isDisabled={Object.keys(errors).length > 0}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SocialLinkEditor;