// FormStep1.tsx
import { Button, Checkbox, Link } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { useForm, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBrandOperations } from "../../hooks/useBrandOperations";
import { formSchema } from "../types";
import { useRouter } from "next/navigation";
import { AutocompleteInput } from "./AutocompleteInput";
import { MultiSelectInput } from "./MultiSelectInput";
import Loader from "@/components/shared/loader/Loader";
import { useFormStep } from "../hooks/useFormStep1";
import { FormData } from "../types";

export const FormStep1: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { createOrUpdateBrand, brand } = useBrandOperations();
  const { form, onSubmit, isLoading, isPending, queries } = useFormStep();

  const onSubmitForm = async (data: any) => {
    try {
      const formattedData = {
        brand_name: data.name,
        brand_country: data.country,
        brand_tags: data.brandTags.map((tag: string) => ({ tag_name: tag })),
      };

      await createOrUpdateBrand(formattedData);
      router.push("/steps/2");
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center max-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 py-6 grid"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AutocompleteInput<FormData>
          control={form.control}
          name="name"
          label={t("translation:step1.form.brandName.label")}
          placeholder={t("translation:step1.form.brandName.placeholder")}
          allowCustomInput={true}
        />
        <AutocompleteInput
          control={form.control}
          name="country"
          label={t("translation:step1.form.country.label")}
          placeholder={t("translation:step1.form.country.placeholder")}
          options={queries.categories.data || []}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AutocompleteInput
          control={form.control}
          name="category"
          label={t("translation:step1.form.category.label")}
          placeholder={t("translation:step1.form.category.placeholder")}
          options={queries.categories.data || []}
        />
        <AutocompleteInput
          control={form.control}
          name="subcategory"
          label={t("translation:step1.form.subcategory.label")}
          placeholder={t("translation:step1.form.subcategory.placeholder")}
          options={queries.subcategories.data || []}
        />
      </div>

      <MultiSelectInput
        control={form.control}
        name="brandTags"
        label={t("translation:step1.form.brandTags.label")}
        placeholder={t("translation:step1.form.brandTags.placeholder")}
        options={(queries.brandTags.data || []).map((tag) => tag.name)}
      />

      <div className="flex flex-col gap-2">
        <Checkbox
          isSelected={form.watch("agree")}
          onValueChange={(checked) => form.setValue("agree", checked)}
          radius="full"
        >
          <div className="text-xs text-gray3">
            <span>{t("translation:step1.form.agreement.text")} </span>
            <Link href="#" size="sm" className="text-primary">
              {t("translation:step1.form.agreement.terms")}
            </Link>
            <span> {t("translation:step1.form.agreement.of")}</span>
          </div>
        </Checkbox>
        {form.formState.errors.agree && (
          <p className="text-red-500 text-xs">
            {t("translation:step1.validation.terms")}
          </p>
        )}
      </div>

      <Button
        type="submit"
        color="secondary"
        className="font-light my-4 px-12 bg-primary mb-1 text-white rounded-lg border border-light2"
        isLoading={form.formState.isSubmitting}
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting
          ? t("translation:step1.form.buttons.submitting")
          : t("translation:step1.form.buttons.submit")}
      </Button>
    </form>
  );
};
