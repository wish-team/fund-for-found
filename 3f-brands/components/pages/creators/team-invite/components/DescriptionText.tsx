import React, { useState } from "react";
import { Button } from "@nextui-org/react";

interface DescriptionTextProps {
  description: string;
  index?: number;
}

export const DescriptionText: React.FC<DescriptionTextProps> = ({
  description,
  index,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 62;
  const shouldShowReadMore = description.length > MAX_LENGTH;

  return (
    <p className="text-sm text-justify text-light1 mt-4">
      {shouldShowReadMore ? (
        isExpanded ? description : `${description.slice(0, MAX_LENGTH)}...`
      ) : (
        description
      )}
      {shouldShowReadMore && (
        <Button
          color="secondary"
          className="ml-2 m-0 p-0 text-sm text-primary200 transition-all hover:text-primary"
          onPress={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Read Less" : "Read More"}
        </Button>
      )}
    </p>
  );
};