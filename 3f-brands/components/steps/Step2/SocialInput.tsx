import React, { useState } from "react";
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
import { FaAngleDown, FaAngleUp } from "react-icons/fa6"; // Ensure correct import
import { motion, AnimatePresence } from "framer-motion";
import { FaTrashCan } from "react-icons/fa6";

const socialMediaOptions = [
  { key: "instagram", label: "Instagram", Icon: FaInstagram, baseUrl: "http://instagram.com/" },
  { key: "discord", label: "Discord", Icon: FaDiscord, baseUrl: "http://discord.com/" },
  { key: "website", label: "Website", Icon: FaGlobe, baseUrl: "http://" },
  { key: "youtube", label: "YouTube", Icon: FaYoutube, baseUrl: "http://youtube.com/" },
  { key: "twitter", label: "Twitter", Icon: FaTwitter, baseUrl: "http://twitter.com/" },
  { key: "telegram", label: "Telegram", Icon: FaTelegram, baseUrl: "http://telegram.org/" },
  { key: "linkedin", label: "LinkedIn", Icon: FaLinkedin, baseUrl: "http://linkedin.com/" },
  { key: "whatsapp", label: "WhatsApp", Icon: FaWhatsapp, baseUrl: "http://whatsapp.com/" },
  { key: "facebook", label: "Facebook", Icon: FaFacebook, baseUrl: "http://facebook.com/" },
];

const dropdownVariants = {
  open: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
  closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
};

const arrowVariants = {
  open: { rotate: 180, transition: { duration: 0.3 } },
  closed: { rotate: 0, transition: { duration: 0.3 } },
};

const listItemVariants = {
  open: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  closed: { opacity: 0, y: -20, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

const SocialInput: React.FC<{ onRemove: () => void }> = ({ onRemove }) => {
  const [inputValue, setInputValue] = useState<string>("http://instagram.com/");
  const [selectedKey, setSelectedKey] = useState<string>("instagram");
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const handleSelectChange = (key: string) => {
    const selected = socialMediaOptions.find((option) => option.key === key);
    if (selected) {
      setInputValue(selected.baseUrl);
      setSelectedKey(key);
      setDropdownOpen(false); // Close dropdown on selection
    }
  };

  const handleBlur = () => {
    setDropdownOpen(false); // Close dropdown on blur
  };

  return (
    <div className="flex flex-col md:flex-row items-center mb-2 relative">
      <div className="relative w-full md:w-4/12">
        <button
          onClick={() => setDropdownOpen(!isDropdownOpen)}
          onBlur={handleBlur} // Close dropdown on blur
          className="border border-light3 text-sm text-gray4 bg-white rounded-lg shadow hover:border-purple-500 flex items-center justify-between w-full p-2"
        >
          <span>{socialMediaOptions.find(option => option.key === selectedKey)?.label}</span>
          <motion.span 
            className="ml-2"
            variants={arrowVariants}
            animate={isDropdownOpen ? 'open' : 'closed'}
            initial={false} // Prevent rotation on initial render
          >
            {isDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
          </motion.span>
        </button>
        
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.ul
              variants={dropdownVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute text-gray4 w-full text-sm max-h-[200px] overflow-auto z-50 bg-white border border-light3 rounded-lg shadow mt-1 max-w-xs"
            >
              {socialMediaOptions.map(({ key, label, Icon }) => (
                <motion.li
                  key={key}
                  onClick={() => handleSelectChange(key)}
                  variants={listItemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="flex items-center cursor-pointer p-2 hover:bg-primary50"
                >
                  <Icon className="mr-2" />
                  {label}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter URL"
        className="border border-light3 text-sm text-gray4 bg-white rounded-lg shadow hover:border-purple-500 focus:border-purple-500 focus:outline-none mt-2 md:mt-0 w-full md:w-7/12 p-2 md:ml-2"
      />
      
      <button
        onClick={onRemove}
        className="mt-2 md:mt-0 md:w-1/12 md:ml-2 p-2 text-gray4 hover:text-red-500"
        aria-label="Remove"
      >
        <FaTrashCan />
      </button>
    </div>
  );
};

export default SocialInput;













// import React, { useState } from "react";
// import { Select, SelectItem } from "@nextui-org/react";
// import {
//   FaInstagram,
//   FaDiscord,
//   FaGlobe,
//   FaYoutube,
//   FaTwitter,
//   FaTelegram,
//   FaLinkedin,
//   FaWhatsapp,
//   FaFacebook,
//   FaTrashCan,
// } from "react-icons/fa";

// const socialMediaOptions = [
//   {
//     key: "instagram",
//     label: "Instagram",
//     Icon: FaInstagram,
//     baseUrl: "http://instagram.com/",
//   },
//   {
//     key: "discord",
//     label: "Discord",
//     Icon: FaDiscord,
//     baseUrl: "http://discord.com/",
//   },
//   { key: "website", label: "Website", Icon: FaGlobe, baseUrl: "http://" },
//   {
//     key: "youtube",
//     label: "YouTube",
//     Icon: FaYoutube,
//     baseUrl: "http://youtube.com/",
//   },
//   {
//     key: "twitter",
//     label: "Twitter",
//     Icon: FaTwitter,
//     baseUrl: "http://twitter.com/",
//   },
//   {
//     key: "telegram",
//     label: "Telegram",
//     Icon: FaTelegram,
//     baseUrl: "http://telegram.org/",
//   },
//   {
//     key: "linkedin",
//     label: "LinkedIn",
//     Icon: FaLinkedin,
//     baseUrl: "http://linkedin.com/",
//   },
//   {
//     key: "whatsapp",
//     label: "WhatsApp",
//     Icon: FaWhatsapp,
//     baseUrl: "http://whatsapp.com/",
//   },
//   {
//     key: "facebook",
//     label: "Facebook",
//     Icon: FaFacebook,
//     baseUrl: "http://facebook.com/",
//   },
// ];

// const SocialInput: React.FC<{ onRemove: () => void }> = ({ onRemove }) => {
//   const [inputValue, setInputValue] = useState<string>("http://instagram.com/"); // Default URL

//   const handleSelectChange = (key: string) => {
//     const selected = socialMediaOptions.find((option) => option.key === key);
//     if (selected) {
//       setInputValue(selected.baseUrl); // Set the input value to the base URL
//     }
//   };

//   return (
//     <div className="flex items-center mb-2">
//       <Select
//         aria-label="social media links"
//         onValueChange={handleSelectChange} // Use onValueChange
//         defaultValue="instagram" // Set default value
//         classNames={{
//           listboxWrapper:
//             "max-h-[400px] bg-white border border-light3 shadow rounded-lg",
//         }}
//         className="max-w-xs border border-light3 text-sm text-gray4 bg-white rounded-lg shadow hover:border-primary"
//       >
//         {socialMediaOptions.map(({ key, label, Icon }) => (
//           <SelectItem
//             className="text-gray4 bg-white p-2 hover:bg-primary50"
//             key={key}
//             value={key} // Set value for SelectItem
//             startContent={<Icon className="w-6 h-6 text-gray4" />}
//           >
//             {label}
//           </SelectItem>
//         ))}
//       </Select>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         placeholder="Enter URL"
//         className="ml-2 border border-light3 text-gray4 rounded-lg p-2"
//       />
//       <button
//         onClick={onRemove} // Call the remove function when clicked
//         className="ml-2 p-2 text-red-500 hover:text-red-700"
//         aria-label="Remove"
//       >
//         remove
//         {/* <FaTrashCan className="w-6 h-6" /> */}
//       </button>
//     </div>
//   );
// };

// export default SocialInput;

