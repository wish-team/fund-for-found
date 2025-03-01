import { useCallback } from "react";
import { useBrandStore } from "../store/brandStore";
import { BrandService } from "../services/brandService";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

export const useBrandOperations = () => {
  const { t } = useTranslation();
  const { setBrand, setLoading, setError, brand } = useBrandStore();

  const fetchBrand = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        const data = await BrandService.getBrand(id);
        setBrand(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
        toast.error(t("translation:step1.toast.error.default"));
      } finally {
        setLoading(false);
      }
    },
    [setBrand, setLoading, setError, t]
  );

  const createOrUpdateBrand = useCallback(
    async (data: any, id?: string) => {
      try {
        setLoading(true);
        const response = id
          ? await BrandService.updateBrand(id, data)
          : await BrandService.createBrand(data);

        setBrand(response);
        toast.success(
          id ? t("translation:step1.toast.success.update") : t("translation:step1.toast.success.create")
        );
        return response;
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
        toast.error(t("translation:step1.toast.error.default"));
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setBrand, setLoading, setError, t]
  );

  return {
    fetchBrand,
    createOrUpdateBrand,
    brand,
  };
};
