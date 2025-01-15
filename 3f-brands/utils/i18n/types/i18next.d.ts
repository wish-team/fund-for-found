import "i18next";
import { defaultNS } from "../config/settings";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: {
      translation: {
        startCard: {
          title: string;
          description: string;
          button: string;
          link: string;
        };
        home: {
          title: string;
          description: string;
        };
        footer: {
          about: string;
          AboutUs: string;
          contactUs: string;
          resources: string;
          blog: string;
          "3fWork": string;
          support: string;
          contributing: string;
          brand: string;
          price: string;
          safety: string;
          termsOfUse: string;
          privacy: string;
        };
        navbar: {
          home: string;
          explore: string;
          aboutUs: string;
          helpSupport: string;
          loginSignup: string;
          start: string;
          signIn: string;
          defaultUser: string;
          searchPlaceholder: string;
          closeMenu: string;
          openMenu: string;
        };
        avatar: {
          myProfile: string;
          brandOrganization: string;
          settings: string;
          logOut: string;
          menuLabel: string;
        };
        step1: {
          toast: {
            success: {
              create: string;
              update: string;
            };
            error: {
              default: string;
              network: string;
              server: string;
            };
          };
          title: string;
          subTitle: string;
          description: string;
          form: {
            brandName: {
              label: string;
              placeholder: string;
            };
            country: {
              label: string;
              placeholder: string;
            };
            category: {
              label: string;
              placeholder: string;
            };
            subcategory: {
              label: string;
              placeholder: string;
            };
            brandTags: {
              label: string;
              placeholder: string;
            };
            agreement: {
              text: string;
              terms: string;
              of: string;
            };
            buttons: {
              submit: string;
              update: string;
              submitting: string;
            };
          };
          validation: {
            required: string;
            name: string;
            country: string;
            category: string;
            subcategory: string;
            brandTags: string;
            terms: string;
            minLength: string;
            maxLength: string;
            invalid: string;
          };
        };
        step2: {
          title: string;
          mission: {
            title: string;
            description: string;
          };
          social: {
            title: string;
            description: string;
          };
          buttons: {
            addSocial: string;
            continue: string;
          };
        };
        social: {
          urlPlaceholder: string;
          removeButton: string;
          platforms: {
            instagram: string;
            discord: string;
            website: string;
            youtube: string;
            twitter: string;
            telegram: string;
            linkedin: string;
            whatsapp: string;
            facebook: string;
          };
        };
        about: {
          title: string;
          editor: {
            title: string;
            imageUploader: {
              changeImage: string;
              currentImage: string;
            };
            buttons: {
              cancel: string;
              save: string;
            };
          };
          defaultContent: {
            summary: string;
            summaryText1: string;
            summaryText2: string;
            impact: string;
            impactText1: string;
            impactText2: string;
            impactText3: string;
            impactText4: string;
            story: string;
            storyText: string;
          };
        };
        step3: {
          title: string;
          descripton: string;
          info: string;
        };
        step4: {
          title: string;
          descripton: string;
          info: string;
          button: string;
        };
        updates: {
          title: string;
          profileImageAlt: string;
          publishedUpdate: string;
          sampleText: string;
        };
        faq: {
          title: string;
          addQuestion: string;
          editQuestion: string;
          deleteQuestion: string;
          modal: {
            addTitle: string;
            editTitle: string;
            questionPlaceholder: string;
            answerPlaceholder: string;
            cancel: string;
            save: string;
            delete: {
              title: string;
              message: string;
            };
          };
          validation: {
            questionRequired: string;
            answerRequired: string;
          };
        };
        common: {
          deleteConfirmation: string;
          deleteConfirmationMessage: string;
          cancel: string;
          delete: string;
        };
        teamMember: {
          title: string;
          empty: string;
          form: {
            title: {
              add: string;
              edit: string;
            };
            fields: {
              name: string;
              email: string;
              role: string;
              description: string;
              namePlaceholder: string;
              emailPlaceholder: string;
              rolePlaceholder: string;
              descriptionPlaceholder: string;
            };
            buttons: {
              cancel: string;
              save: string;
              update: string;
              delete: string;
            };
            validation: {
              description: string;
              email: string;
              required: string;
              minChars: string;
            };
            preview: string;
            roles: {
              admin: string;
              teammate: string;
            };
          };
          card: {
            created: string;
            contributed: string;
            brands: string;
            projects: string;
            readMore: string;
            readLess: string;
            adminDeletion: string;
            defaultName: string;
            defaultRole: string;
            defaultDescription: string;
          };
          invite: {
            success: string;
            continue: string;
            error: string;
          };
          delete: {
            title: string;
            message: string;
            confirm: string;
            cancel: string;
            success: string;
            error: string;
          };
          notifications: {
            addSuccess: string;
            updateSuccess: string;
            deleteSuccess: string;
            error: string;
          };
          stats: {
            totalMembers: string;
            admins: string;
            teammates: string;
          };
          tooltips: {
            edit: string;
            delete: string;
            addNew: string;
          };
          creators: {
            team: string;
          };
          roles: {
            admin: string;
            teammate: string;
          };
          preview: {
            title: string;
            defaultName: string;
            defaultRole: string;
            defaultDescription: string;
            charactersMinimum: string;
          };
          modal: {
            editMember: string;
            inviteMember: string;
            invitationSent: string;
            continue: string;
            cancel: string;
            save: string;
            update: string;
          };
        };
        creators: {
          tier: {
            management: {
              title: string;
              subtitle: string;
            };
            modal: {
              addTitle: string;
              editTitle: string;
              deleteTitle: string;
              deleteMessage: string;
            };
            form: {
              name: {
                label: string;
                placeholder: string;
              };
              description: {
                label: string;
                placeholder: string;
              };
              amount: {
                label: string;
                placeholder: string;
              };
              coverPhoto: {
                label: string;
                uploadText: string;
              };
              preview: string;
              buttons: {
                cancel: string;
                save: string;
                update: string;
              };
              validation: {
                required: string;
                positiveAmount: string;
              };
            };
            card: {
              defaultTitle: string;
              subtitle: string;
              startAt: string;
              currency: string;
              buttons: {
                contribute: string;
                showMore: string;
                showLess: string;
              };
            };
            addButton: {
              title: string;
            };
            ContributeButton: {
              Contribute: string;
            };
          };
        };
        navigation: {
          contributionTier: string;
          about: string;
          team: string;
          topBackers: string;
          faq: string;
          updates: string;
        };
        banner: {
          coverImage: {
            editCover: string;
            addCover: string;
            uploadNew: string;
            save: string;
            reset: string;
            defaultTitle: string;
            error: {
              fileSize: string;
              processing: string;
            };
          };
          dashboard: {
            settings: string;
          };
          zoom: {
            in: string;
            out: string;
          };
        };
        dashboard: {
          PublicProfile: string;
          navigation: {
            ariaLabel: string;
          };
          tabs: {
            info: string;
            contributionTiers: string;
            about: string;
            team: string;
            updates: string;
            expenses: string;
            payout: string;
          };
          expenses: {
            title: string;
            info: string;
          };
          payout: {
            title: string;
            info: string;
          };
        };
        editProfile: {
          title: string;
          uploadNewImage: string;
          save: string;
          reset: string;
          edit: string;
        };
      };
    };
  }
}