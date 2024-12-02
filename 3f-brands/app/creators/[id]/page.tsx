'use client';
import AboutPage from "@/components/pages/creators/about-section/AboutPage";
// import EditableContentComponent from "@/components/pages/creators/about/About";
import CreatorBanner from "@/components/pages/creators/banner/CreatorBanner";
import { TierManagement } from "@/components/pages/creators/contributors/TierManagement";
import FAQ from "@/components/pages/creators/faq-section/FAQsection";
import TeamMemberInvite from "@/components/pages/creators/team-invite/TeamMemberInvite";



const CreatorProfile = () => {
  return (
    <div>
      <CreatorBanner />
      <TierManagement />
      <AboutPage />
      {/* <EditableContentComponent /> */}
      <TeamMemberInvite />
      <FAQ />
    </div>
  );
};

export default CreatorProfile;
