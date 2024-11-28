// app/creators/[id]/page.tsx
'use client';
import CreatorBanner from "@/components/pages/creators/banner/CreatorBanner";
import { TierManagement } from "@/components/pages/creators/contributors/TierManagement";
import FAQ from "@/components/pages/creators/faq-section/FAQsection";
import TeamMemberInvite from "@/components/pages/creators/team-invite/TeamMemberInvite";
// import TeamMemberInvite from "@/components/pages/creators/teamInvite/TeamMemberInvite";


// import TeamMemberInvite from "@/components/pages/creators/teamInvite/TeamMemberInvite";

const CreatorProfile = () => {

  // Fetch creator data based on the id (you can use SWR, React Query, etc.)
  // For this example, let's assume you have a function fetchCreatorData(id)

  // Example data fetching (replace with your actual data fetching logic)
  const creatorData = { name: "Creator Name", bio: "Creator Bio" }; // Placeholder data

  return (
    <div>
      <CreatorBanner />
      <div className="mt-36">
      <TierManagement />
      {/* <TeamMemberInvite /> */}
      <TeamMemberInvite />
      </div>
      <FAQ />

    </div>
  );
};

export default CreatorProfile;
