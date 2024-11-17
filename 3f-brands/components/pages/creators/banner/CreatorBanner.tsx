import CoverImageEditor from "../banner-editor/components/CoverImageEditor";
import ProfileEditor from "../profile-editor";
import SocialLinkEditor from "../social-links/components/SocialLinkEditor";

const CreatorBanner = () => {
  return (
    <section className="relative mx-auto">
      <CoverImageEditor />
      <div className="flex items-center absolute bottom-[-90px] md:bottom-[-120px]">
        <ProfileEditor />
        <SocialLinkEditor />
      </div>
    </section>
  );
};
export default CreatorBanner;
