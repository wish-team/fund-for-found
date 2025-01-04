import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Select,
  SelectItem,
  SelectSection,
  User,
} from "@nextui-org/react";
import { useContributorStore } from "../store/contributorStore";
import { NextStepButton } from "../../step1";

const handleNext = () => {
  router.push(`/payment/${tierDetails.id}/3`);
};

const ContributorDropdown = () => {
  const { selectedContributor, setSelectedContributor } = useContributorStore();

  const { data: contributors, isLoading } = useQuery({
    queryKey: ["contributors"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:8000/contributors");
        if (!res.ok) {
          throw new Error("Failed to fetch contributors");
        }
        return res.json();
      } catch (error) {
        console.error("Error fetching contributors:", error);
        throw error;
      }
    },
  });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-primary">
        Contribute as: {selectedContributor?.name || ""}
      </h1>

      <Select
        placeholder="Select a contributor"
        className="w-full border rounded-lg shadow-shadow1 text-gray4 hover:border-primary transition-all duration-500"
        isLoading={isLoading}
        selectedKeys={
          selectedContributor ? [selectedContributor.id.toString()] : []
        }
        onChange={(e) => {
          const selected = contributors?.find(
            (c: Contributor) => c.id.toString() === e.target.value
          );
          setSelectedContributor(selected || null);
        }}
        renderValue={(items) => {
          return items.map((item) => (
            <div className="flex items-center text-sm">
            <User
              key={item.key}
              name={item.data?.name}
              description={item.data?.username}
              avatarProps={{
                src: item.data?.avatar,
              }}
              className="gap-2 "
            />
            {selectedContributor?.name || ""}
            </div>
          ));
        }}
      >
        <SelectSection className="bg-white border shadow rounded-lg">
        {contributors?.map((contributor: Contributor) => (
          <SelectItem
            key={contributor.id}
            value={contributor.id}
            textValue={contributor.name}
            className="text-sm hover:bg-primary50 transition-all duration-500"
          >
              <User
                name={contributor.name}
                description={contributor.username}
                avatarProps={{
                  src: contributor.avatar,
                }}
                className="gap-2"
              />
          </SelectItem>
        ))}
        </SelectSection>
      </Select>

      <div className="bg-primary50 p-8 rounded-lg">
        <p className="text-primary text-center">
          The profile you select as a contributor will be displayed on the Wish
          Work brand page as top backers and contributors.
        </p>
      </div>

      <NextStepButton onClick={handleNext} />
    </div>
  );
};

export default ContributorDropdown;
