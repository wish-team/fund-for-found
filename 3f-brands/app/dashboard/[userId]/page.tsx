"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Tabs,
  Tab,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/react";
import Info from "@/components/features/dashboard/info/Info";
import { Contributions } from "@/components/features/dashboard/contributions/Contributions";
import { IoMdSettings } from "react-icons/io";
import ProfileCard from "@/components/features/dashboard/profile/ProfileCard";
import Step2 from "@/components/features/dashboard/about/About";
import Team from "@/components/features/dashboard/team/Team";
import useMediaQuery from "@/components/shared/hooks/useMediaQuery";
import Updates from "@/components/features/creators/updates-section/Updates";
import PublicProfileButton from "@/components/features/dashboard/public-profile/PublicProfileButton";

const Expenses = () => {
  const { t } = useTranslation();
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">FOUNF FOR FUND</h2>
      <p>{t("translation:dashboard.expenses.info")}</p>
    </div>
  );
};

const PayOut = () => {
  const { t } = useTranslation();
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">FOUNF FOR FUND</h2>
      <p>{t("translation:dashboard.payout.info")}</p>
    </div>
  );
};

export default function FundForFoundDashboard() {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState("info");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isDesktop = useMediaQuery();

  const renderTabContent = () => {
    switch (selectedTab) {
      case "info":
        return <Info />;
      case "contribution-tiers":
        return <Contributions />;
      case "about":
        return <Step2 />;
      case "team":
        return <Team />;
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
      aria-label={t("translation:dashboard.navigation.ariaLabel")}
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
      <Tab key="info" title={t("translation:dashboard.tabs.info")} />
      <Tab
        key="contribution-tiers"
        title={t("translation:dashboard.tabs.contributionTiers")}
      />
      <Tab key="about" title={t("translation:dashboard.tabs.about")} />
      <Tab key="team" title={t("translation:dashboard.tabs.team")} />
      <Tab key="updates" title={t("translation:dashboard.tabs.updates")} />
      <Tab key="expenses" title={t("translation:dashboard.tabs.expenses")} />
      <Tab key="pay-out" title={t("translation:dashboard.tabs.payout")} />
    </Tabs>
  );

  return (
    <div className="max-w-7xl mx-auto p-2">
      {!isDesktop && (
        <div className="flex bg-white mt-0 left-0 right-0 pe-16 items-center fixed gap-1 z-50 justify-between">
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
        {isDesktop && (
          <div className="w-64 shrink-0 max-h-[520px] mt-10 rounded-xl py-4 shadow-shadow1 border border-light3 sticky top-28">
            <h1 className="text-xl text-center pt-6 text-primary mb-8">
              FOUNF FOR FUND
            </h1>
            <PublicProfileButton />
            <NavigationTabs />
          </div>
        )}

        {!isDesktop && (
          <Modal
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            placement="bottom"
            classNames={{
              base: "m-0 bg-white border rounded-2xl",
              header: "border-b border-gray-200",
              body: "p-0",
            }}
          >
            <ModalContent>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-xl text-primary text-center">
                  FOUNF FOR FUND
                </h1>
              </ModalHeader>
              <ModalBody>
                <PublicProfileButton />
                <NavigationTabs />
              </ModalBody>
            </ModalContent>
          </Modal>
        )}

        <div className="flex-1 bg-white p-2 mt-20 md:mt-0 overflow-y-auto">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
