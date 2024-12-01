import CoverImageEditor from "../banner-editor/components/CoverImageEditor";
import DashboardButton from "../dashboard-btn/DashboardBtn";
import ProfileEditor from "../profile-editor";
import SocialLinkEditor from "../social-links/components/SocialLinkEditor";

const CreatorBanner = () => {
  return (
    <section className="relative mx-auto">
      <CoverImageEditor />
      <div className="relative px-4 md:px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center absolute bottom-[-90px] md:bottom-[-70px] left-4 md:left-6">
            <ProfileEditor />
            <SocialLinkEditor />
          </div>
          <div className="ml-auto">
            <DashboardButton />
          </div>
        </div>
      </div>
    </section>
  );
};
export default CreatorBanner;
