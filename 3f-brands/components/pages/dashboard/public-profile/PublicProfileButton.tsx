import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { FaArrowRightLong } from "react-icons/fa6";

interface PublicProfileButtonProps {
  userId?: string; // Optional prop to pass dynamic user ID
}

const PublicProfileButton: React.FC<PublicProfileButtonProps> = ({
  userId = "123", // Default fallback ID if not provided
}) => {
  const router = useRouter();
  const {t} = useTranslation()

  return (
    <Button
    
      endContent={<FaArrowRightLong />}
      onPress={() => router.push(`/creators/${userId}`)}
      className="w-full text-left text-gray2  mt-4 md:mt-0 font-medium px-4 transition-colors"
    >

      {t('translation:dashboard.PublicProfile')}
    </Button>
  );
};

export default PublicProfileButton;
