import CoverImageEditor from "../banner-editor/components/CoverImageEditor";
import DashboardButton from "../dashboard-btn/DashboardBtn";
import ProfileEditor from "../profile-editor";
import SocialLinkEditor from "../social-links/components/SocialLinkEditor";

const CreatorBanner = () => {
  return (
    <section>
      <CoverImageEditor />

      <div className="flex justify-between items-center -mt-12 md:-mt-16">
        <div className="flex items-center justify-center">
          <ProfileEditor />
        </div>
        <div className="flex justify-between w-full gap-x-4 items-center">
          <SocialLinkEditor />
          <DashboardButton />
        </div>
      </div>
    </section>
  );
};
export default CreatorBanner;
