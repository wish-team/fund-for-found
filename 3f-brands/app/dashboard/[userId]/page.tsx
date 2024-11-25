"use client";
import { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/react";
import { Menu } from "lucide-react";
import Info from "@/components/pages/dashboard/info/Info";
import TeamMemberInvite from "@/components/pages/creators/team-invite/TeamMemberInvite";
import { Contributions } from "@/components/pages/dashboard/contributions/Contributions";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { IoMdSettings } from "react-icons/io";
import ProfileCard from "@/components/pages/dashboard/profile/ProfileCard";
import Step2 from "@/components/pages/dashboard/about/About";

// Mock components remain the same
const PublicProfile = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Public Profile</h2>
    <p>Public profile information goes here</p>
  </div>
);


const Updates = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Updates</h2>
    <p>Latest updates go here</p>
  </div>
);

const Expenses = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Expenses</h2>
    <p>Expenses information goes here</p>
  </div>
);

const PayOut = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Pay Out</h2>
    <p>Payout information and controls go here</p>
  </div>
);

// Custom hook for media query
const useMediaQuery = () => {
  const [matches, setMatches] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : true
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handler = (e) => setMatches(e.matches);

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return matches;
};

export default function FundForFoundDashboard() {
  const [selectedTab, setSelectedTab] = useState("public-profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isDesktop = useMediaQuery();

  const renderTabContent = () => {
    switch (selectedTab) {
      case "public-profile":
        return <PublicProfile />;
      case "info":
        return <Info />;
      case "contribution-tiers":
        return <Contributions />;
      case "about":
        return <Step2 />;
      case "team":
        return <TeamMemberInvite />;
      case "updates":
        return <Updates />;
      case "expenses":
        return <Expenses />;
      case "pay-out":
        return <PayOut />;
      default:
        return null;
    }
  };

  const NavigationTabs = () => (
    <Tabs
      aria-label="Dashboard navigation"
      isVertical={true}
      selectedKey={selectedTab}
      onSelectionChange={(key) => {
        setSelectedTab(key.toString());
        if (!isDesktop) {
          setIsSidebarOpen(false);
        }
      }}
      variant="light"
      classNames={{
        base: "w-full",
        tabList: "gap-0 w-full text-gray2 rounded-lg p-2",
        cursor: "w-full bg-purple-100 rounded-lg shadow-md",
        tab: "w-full h-12 text-left px-4 rounded-lg",
        tabContent: "font-medium",
      }}
    >
      <Tab key="public-profile" title="Public profile" />
      <Tab key="info" title="Info" />
      <Tab key="contribution-tiers" title="Contribution tiers" />
      <Tab key="about" title="About" />
      <Tab key="team" title="Team" />
      <Tab key="updates" title="Updates" />
      <Tab key="expenses" title="Expenses" />
      <Tab key="pay-out" title="Pay out" />
    </Tabs>
  );

  return (
    <div className="max-w-6xl  mx-auto p-6 ">
      {/* Mobile Settings Button */}
      {!isDesktop && (
        <div className="flex bg-white mt-0 left-0 right-0 pe-16 items-center fixed gap-1 z-sticky justify-between">
          <Button
            onPress={() => setIsSidebarOpen(true)}
            className="rounded-e-lg z-50 border-l-4 border-primary bg-primary100"
            startContent={<IoMdSettings className="text-primary" size={20} />}
          ></Button>
          <ProfileCard
            email="shirani@wishwork.org"
            onSettingsClick={() => console.log("Settings clicked")}
          />
        </div>
      )}

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        {isDesktop && (
          <div className="w-64 shrink-0 max-h-[520px] mt-10 rounded-xl py-4 shadow-shadow1 border border-light3">
            <h1 className="text-xl text-center pt-6 text-primary mb-8">
              FUND FOR FOUND
            </h1>
            <NavigationTabs />
          </div>
        )}

        {/* Mobile Sidebar Modal */}
        {!isDesktop && (
          <Modal
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            placement="bottom"
            backdrop="blur"
            classNames={{
              base: "m-0 bg-white border rounded-2xl",
              header: "border-b border-gray-200",
              body: "p-0",
            }}
          >
            <ModalContent>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-xl text-primary text-center">
                  FUND FOR FOUND
                </h1>
              </ModalHeader>
              <ModalBody>
                <NavigationTabs />
              </ModalBody>
            </ModalContent>
          </Modal>
        )}

        {/* Main Content */}
        <div className="flex-1 min-h-[500px] bg-white rounded-lg shadow-sm p-6 mt-20 md:mt-0">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
