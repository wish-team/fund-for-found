import React from "react";
import { FormProvider } from "react-hook-form";
import { Button, Checkbox, Link } from "@nextui-org/react";
import { useFormStep1 } from "../hooks/useFormStep1";
import { AutocompleteInput } from "./AutocompleteInput";
import { MultiSelectInput } from "./MultiSelectInput";
import { mockData } from "../utils/mockData";

export const FormStep1: React.FC = () => {
  const { methods, onSubmit } = useFormStep1();

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-4 py-6 grid"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AutocompleteInput
            data={mockData.brandNames}
            label="Brand/Organisation Name"
            fieldName="name"
            error={methods.formState.errors.name}
          />
          <AutocompleteInput
            data={mockData.countries}
            label="Country"
            fieldName="country"
            error={methods.formState.errors.country}
          />
        </div>

        <p className="text-light1 font-light">
          Select the primary category that best describes your brand or
          organization. Then select the subcategory that further defines your
          brand or organization.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AutocompleteInput
            data={mockData.categories}
            label="Category"
            fieldName="category"
            error={methods.formState.errors.category}
          />
          <AutocompleteInput
            data={mockData.subcategories}
            label="Subcategory"
            fieldName="subcategory"
            error={methods.formState.errors.subcategory}
          />
        </div>

        <MultiSelectInput
          data={mockData.brandTags}
          label="Brands"
          fieldName="brandTags"
          error={methods.formState.errors.brandTags}
        />

        <Checkbox
          {...methods.register("agree", {
            required: "You must agree to the terms",
          })}
          radius="full"
        >
          <div className="text-xs text-gray3">
            <span className="pe-1">I agree with the</span>
            <Link href="#" underline="always">
              terms of service
            </Link>
            <span className="ps-1">of 3F.</span>
          </div>
        </Checkbox>
        {methods.formState.errors.agree && (
          <p className="text-red-500 text-xs pt-1">
            {methods.formState.errors.agree.message}
          </p>
        )}

        <Button
          type="submit"
          color="secondary"
          variant="solid"
          className="font-light my-4 px-12 bg-primary mb-1 text-white rounded-lg border border-light2"
        >
          Continue
        </Button>
      </form>
    </FormProvider>
  );
};
