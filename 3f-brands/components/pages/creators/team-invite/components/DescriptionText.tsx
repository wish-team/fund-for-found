// src/components/pages/creators/invite-team/components/DescriptionText.tsx
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
  const shouldShowReadMore = description.length > 100;

  return (
    <p className="text-sm text-light1 mt-4">
      {isExpanded ? description : `${description.slice(0, 100)}...`}
      {typeof index === "number" && shouldShowReadMore && (
        <Button
          color="secondary"
          className="m-0 p-0 text-sm text-primary200 hover:text-primary"
          onPress={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Read Less" : "Read More"}
        </Button>
      )}
    </p>
  );
};
