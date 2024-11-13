import React from 'react';
import Image from 'next/image';
import { BsPencil } from 'react-icons/bs';
import { getFirstLetter } from '../utils/imageUtils';

interface ProfileImageProps {
  image: string | null;
  title: string;
  onEditClick: () => void;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
  image,
  title,
  onEditClick,
}) => (
  <div className="relative w-32 h-32 group">
    <div className="absolute inset-0 bg-primary rounded-2xl"></div>
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      {image ? (
        <Image
          src={image}
          alt={getFirstLetter(title)}
          fill
          className="object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-primary200 text-6xl font-extrabold">
            {getFirstLetter(title)}
          </span>
        </div>
      )}
    </div>
    <button
      onClick={onEditClick}
      className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl"
    >
      <div className="flex justify-center bg-light4 px-4 py-2 rounded-lg text-purple-500 border-purple-500 gap-2">
        <BsPencil />
        <span className="text-sm">Edit</span>
      </div>
    </button>
  </div>
);