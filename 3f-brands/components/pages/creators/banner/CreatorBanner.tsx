import CoverImageEditor from "../banner-editor/components/CoverImageEditor";
import DashboardButton from "../dashboard-btn/DashboardBtn";
import ProfileEditor from "../profile-editor";
import SocialLinkEditor from "../social-links/components/SocialLinkEditor";

const CreatorBanner = () => {
  return (
    <section className="relative">
      <CoverImageEditor />
      <div className="relative">
        <div className="flex justify-between items-center">
          <div className="flex items-center absolute bottom-[-68px] sm:bottom-[-70px] left-0 sm:left-6">
            <ProfileEditor />
            <SocialLinkEditor />
          </div>
          <div className="ml-auto relative right-[100px] sm:left-0">
            <DashboardButton />
          </div>
        </div>
      </div>
    </section>
  );
};
export default CreatorBanner;
