"use client";
import React, { useRef, RefObject } from "react";
import { useTranslation } from "react-i18next";
import AboutPage from "@/components/pages/creators/about-section/AboutPage";
import CreatorBanner from "@/components/pages/creators/banner/CreatorBanner";
import { TierManagement } from "@/components/pages/creators/contributors/TierManagement";
import FAQ from "@/components/pages/creators/faq-section/FAQsection";
import TeamMemberInvite from "@/components/pages/creators/team-invite/TeamMemberInvite";
import Updates from "@/components/pages/creators/updates-section/Updates";

const CreatorProfile = () => {
  const { t } = useTranslation();
  
  const contributionTierRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const topBackersRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const updatesRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (ref: RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col gap-20">
      <CreatorBanner />
      <div className="text-gray3 bg-white z-10 mt-20 flex justify-center md:space-x-12 py-4 border-b overflow-x-scroll space-x-4">
        <button onClick={() => handleTabClick(contributionTierRef)}>
          {t('translation:navigation.contributionTier')}
        </button>
        <button onClick={() => handleTabClick(aboutRef)}>
          {t('translation:navigation.about')}
        </button>
        <button onClick={() => handleTabClick(teamRef)}>
          {t('translation:navigation.team')}
        </button>
        <button onClick={() => handleTabClick(topBackersRef)}>
          {t('translation:navigation.topBackers')}
        </button>
        <button onClick={() => handleTabClick(faqRef)}>
          {t('translation:navigation.faq')}
        </button>
        <button onClick={() => handleTabClick(updatesRef)}>
          {t('translation:navigation.updates')}
        </button>
      </div>
      <div ref={contributionTierRef}>
        <TierManagement />
      </div>
      <div ref={aboutRef}>
        <AboutPage />
      </div>
      <div ref={teamRef}>
        <TeamMemberInvite />
      </div>
      <div ref={topBackersRef}>
        {/* Top Backers & Contributors content */}
      </div>
      <div ref={faqRef}>
        <FAQ />
      </div>
      <div ref={updatesRef}>
        <Updates />
      </div>
    </div>
  );
};

export default CreatorProfile;