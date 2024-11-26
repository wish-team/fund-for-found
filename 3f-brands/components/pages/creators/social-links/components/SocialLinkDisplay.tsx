import React from "react";
import { Button } from "@nextui-org/react";
import { SocialLinks } from "../types";
import { getIcon } from "../utils/helpers";
import { BsPencil } from "react-icons/bs";

interface SocialLinkDisplayProps {
  links: SocialLinks;
  onEditClick: () => void;
}

export const SocialLinkDisplay: React.FC<SocialLinkDisplayProps> = ({
  links,
  onEditClick,
}) => {
  return (
    <div className="flex flex-row-reverse flex-wrap justify-between items-center mt-4">
      <Button
        variant="bordered"
        startContent={<BsPencil />}
        onPress={onEditClick}
        className="ml-6 bg-light3 border border-primary200 hover:bg-primary50 hover:border-purple-500 rounded-lg text-gray4 text-xs"
      >
        <span className="hidden md:block">Edit</span>
      </Button>
      <div className="flex flex-wrap space-x-4">
        {Object.entries(links).map(([type, url]) => (
          <a
            key={type}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray4 hover:text-purple-600 transition-colors"
          >
            {getIcon(type)}
          </a>
        ))}
      </div>
    </div>
  );
};



// import React from "react";
// import { Button } from "@nextui-org/react";
// import { SocialLinks } from "../types";
// import { getIcon } from "../utils/helpers";
// import { BsPencil } from "react-icons/bs";
// import { IoSettingsOutline } from "react-icons/io5";

// interface SocialLinkDisplayProps {
//   links: SocialLinks;
//   onEditClick: () => void;
//   totalContribution?: string;
// }

// export const SocialLinkDisplay: React.FC<SocialLinkDisplayProps> = ({
//   links,
//   onEditClick,
//   totalContribution = "000$",
// }) => {
//   return (
//     <div className="w-full">
//       {/* Social Links Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-12 items-center">
//         <div className="col-span-2 md:col-span-10">
//           <div className="grid grid-cols-6 md:grid-cols-6">
//             {Object.entries(links).map(([type, url]) => (
//               <a
//                 key={type}
//                 href={url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center justify-center p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <span className="text-gray-500 hover:text-purple-600">
//                   {getIcon(type)}
//                 </span>
//               </a>
//             ))}
//           </div>
//         </div>
        
//         <div className="col-span-2 md:col-span-2 flex justify-end space-x-2">
//           <Button
//             variant="bordered"
//             startContent={<BsPencil />}
//             onPress={onEditClick}
//             className="w-full md:w-auto bg-white border border-gray-300 hover:bg-gray-50 rounded-lg text-gray-600 text-sm text-gray4 hover:text-purple-600 transition-colors"
//           >
//             <span className="hidden md:inline">Edit</span>
//           </Button>
//           <Button
//             variant="bordered"
//             startContent={<IoSettingsOutline />}
//             className="w-full md:w-auto bg-white border border-gray-300 hover:bg-gray-50 rounded-lg text-gray-600 text-sm text-gray4 hover:text-purple-600 transition-colors"
//           >
//             <span className="hidden md:inline">Settings</span>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SocialLinkDisplay;