import React from "react";
import { Button, Checkbox, Link } from "@nextui-org/react";
import { useFormStep } from "../hooks/useFormStep1";
import { AutocompleteInput } from "./AutocompleteInput";
import { MultiSelectInput } from "./MultiSelectInput";
import { useRouter } from "next/navigation";

export const FormStep1: React.FC = () => {
  const router = useRouter();
  const { form, onSubmit, isLoading, isPending, queries, isUpdate } = useFormStep();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-6 grid">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AutocompleteInput
          control={form.control}
          name="name"
          label="Brand/Organisation Name"
          allowCustomInput={true}
        />
        <AutocompleteInput
          control={form.control}
          name="country"
          label="Country"
          options={queries.countries.data || []}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AutocompleteInput
          control={form.control}
          name="category"
          label="Category"
          options={queries.categories.data || []}
        />
        <AutocompleteInput
          control={form.control}
          name="subcategory"
          label="Subcategory"
          options={queries.subcategories.data || []}
        />
      </div>

      <MultiSelectInput
        control={form.control}
        name="brandTags"
        label="Brand Tags"
        options={queries.brandTags.data || []}
      />

      <div className="flex flex-col gap-2">
        <Checkbox
          isSelected={form.watch("agree")}
          onValueChange={(checked) => form.setValue("agree", checked)}
          radius="full"
        >
          <div className="text-xs text-gray3">
            <span>I agree with the </span>
            <Link href="#" size="sm" className="text-primary">
              terms of service
            </Link>
            <span> of 3F.</span>
          </div>
        </Checkbox>
        {form.formState.errors.agree && (
          <p className="text-red-500 text-xs">{form.formState.errors.agree.message}</p>
        )}
      </div>

      <Button
        type="submit"
        color="secondary"
        className="font-light my-4 px-12 bg-primary mb-1 text-white rounded-lg border border-light2"
        isLoading={isPending}
        disabled={isPending}
      >
        {isPending ? "Submitting..." : isUpdate ? "Update" : "Continue"}
      </Button>
    </form>
  );
};