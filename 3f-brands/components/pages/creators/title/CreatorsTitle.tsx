import React from 'react';
import { FaSquare } from 'react-icons/fa';

interface CreatorsTitleProps {
  title: string;
}

const CreatorsTitle: React.FC<CreatorsTitleProps> = ({ title }) => {
  return (
    <h1 className="flex items-center p-2">
      <span>
        <FaSquare className="text-primary" />
      </span>
      <span className="text-lg ps-2">{title}</span>
    </h1>
  );
};

export default CreatorsTitle;
