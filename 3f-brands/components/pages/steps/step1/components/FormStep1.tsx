// FormStep1.tsx
import React from "react";
import { Button, Checkbox, Link } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { useFormStep } from "../hooks/useFormStep1";
import { AutocompleteInput } from "./AutocompleteInput";
import { MultiSelectInput } from "./MultiSelectInput";
import Loader from "@/components/shared/loader/Loader";

export const FormStep1: React.FC = () => {
  const { t } = useTranslation();
  const { form, onSubmit, isLoading, isPending, queries, isUpdate } = useFormStep();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center max-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-6 grid">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AutocompleteInput
          control={form.control}
          name="name"
          label={t("step1.form.brandName.label")}
          placeholder={t("step1.form.brandName.placeholder")}
          allowCustomInput={true}
        />
        <AutocompleteInput
          control={form.control}
          name="country"
          label={t("step1.form.country.label")}
          placeholder={t("step1.form.country.placeholder")}
          options={queries.countries.data || []}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AutocompleteInput
          control={form.control}
          name="category"
          label={t("step1.form.category.label")}
          placeholder={t("step1.form.category.placeholder")}
          options={queries.categories.data || []}
        />
        <AutocompleteInput
          control={form.control}
          name="subcategory"
          label={t("step1.form.subcategory.label")}
          placeholder={t("step1.form.subcategory.placeholder")}
          options={queries.subcategories.data || []}
        />
      </div>

      <MultiSelectInput
        control={form.control}
        name="brandTags"
        label={t("translation:step1.form.brandTags.label")}
        placeholder={t("translation:step1.form.brandTags.placeholder")}
        options={queries.brandTags.data || []}
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
        isLoading={isPending}
        disabled={isPending}
      >
        {isPending 
          ? t("translation:step1.form.buttons.submitting")
          : isUpdate 
            ? t("translation:step1.form.buttons.update")
            : t("translation:step1.form.buttons.submit")}
      </Button>
    </form>
  );
};