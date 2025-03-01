import { FAQSkeleton } from "./FAQSkeleton";
import { ErrorMessage } from "./ErrorMessage";
import { useTranslation } from "react-i18next";
import { useFAQStore } from "../store/faqStore";


export const FAQSection: React.FC = () => {
  const { t } = useTranslation();
  const { accordionItems, loadingStates, errors, fetchFAQs } = useFAQStore();

  if (loadingStates.fetch) {
    return <FAQSkeleton />;
  }

  if (errors.fetch) {
    return <ErrorMessage error={errors.fetch} onRetry={fetchFAQs} />;
  }

  // ... rest of the component
};
