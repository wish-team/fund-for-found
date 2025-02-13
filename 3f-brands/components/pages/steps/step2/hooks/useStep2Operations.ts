import { useCallback } from "react";
import { useBrandStore } from "../../store/brandStore";
import { BrandService } from "../../services/brandService";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

export const useStep2Operations = () => {
  const { t } = useTranslation();
  const { brand, updateBrand, setLoading, setError } = useBrandStore();

  const updateBrandSocials = useCallback(
    async (socialMedia: any[]) => {
      if (!brand) return;

      try {
        setLoading(true);
        const response = await BrandService.updateBrand(brand.owner_id, {
          social_media: socialMedia,
        });
        updateBrand(response);
        toast.success(t("translation:step1.toast.success.update"));
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
        toast.error(t("translation:step1.toast.error.default")); 
      } finally {
        setLoading(false);
      }
    },
    [brand, updateBrand, setLoading, setError, t]
  );

  return {
    updateBrandSocials,
    brand,
  };
};
