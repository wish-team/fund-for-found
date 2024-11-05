// app/creators/[id]/page.tsx
'use client';
import AccordionMenu from "@/components/pages/creators/FAQ/AccordionMenu";


const CreatorProfile = () => {

  // Fetch creator data based on the id (you can use SWR, React Query, etc.)
  // For this example, let's assume you have a function fetchCreatorData(id)

  // Example data fetching (replace with your actual data fetching logic)
  const creatorData = { name: "Creator Name", bio: "Creator Bio" }; // Placeholder data

  return (
    <div>
      
      <AccordionMenu />
      {/* Add more details about the creator */}
    </div>
  );
};

export default CreatorProfile;
