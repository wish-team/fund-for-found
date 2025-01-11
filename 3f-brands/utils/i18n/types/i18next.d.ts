import "i18next";
import { defaultNS } from "../config/settings";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: {
      translation: {
        nav: {
          home: string;
          about: string;
          contact: string;
        };
        footer: {
          about: string;
          aboutUs: string;
          contactUs: string;
          resources: string;
          blog: string;
          howItWorks: string;
          helpSupport: string;
          contributing: string;
          brandOrgs: string;
          pricing: string;
          legal: {
            trustSafety: string;
            termsOfUse: string;
            privacyPolicy: string;
          };
        };
      };
    };
  }
}
