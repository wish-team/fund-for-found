import ContributorDropdown from "./components/ContributorDropdown";
import { Tier } from "@/components/features/creators/contributors/types/tier";

interface ContributerProps {
  tierDetails: Tier;
}

const Contributer: React.FC<ContributerProps> = ({ tierDetails }) => {
  return (
    <div className="border rounded-xl p-6 md:p-8">
      <ContributorDropdown tierDetails={tierDetails} />
    </div>
  );
};

export default Contributer;
