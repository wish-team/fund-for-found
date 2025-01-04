// src/components/pages/steps/step1/components/FormStep1.tsx
import React from "react";
import { Button, Checkbox, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { AutocompleteInput } from "./AutocompleteInput";
import { MultiSelectInput } from "./MultiSelectInput";
import { mockData } from "../utils/mockData";
import { useRegistrationStore } from "../store/registrationStore";

export const FormStep1: React.FC = () => {
  const router = useRouter();
  const formData = useRegistrationStore((state) => state.formData);
  const errors = useRegistrationStore((state) => state.errors);
  const validateAllFields = useRegistrationStore((state) => state.validateAllFields);
  const setFormField = useRegistrationStore((state) => state.setFormField);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAllFields()) {
      console.log(formData);
      router.push("/steps/2");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-6 grid">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AutocompleteInput
          data={mockData.brandNames}
          label="Brand/Organisation Name"
          fieldName="name"
          error={errors.name}
        />
        <AutocompleteInput
          data={mockData.countries}
          label="Country"
          fieldName="country"
          error={errors.country}
        />
      </div>

      <p className="text-light1 font-light text-justify">
        Select the primary category that best describes your brand or
        organization. Then select the subcategory that further defines your
        brand or organization.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AutocompleteInput
          data={mockData.categories}
          label="Category"
          fieldName="category"
          error={errors.category}
        />
        <AutocompleteInput
          data={mockData.subcategories}
          label="Subcategory"
          fieldName="subcategory"
          error={errors.subcategory}
        />
      </div>

      <MultiSelectInput
        data={mockData.brandTags}
        label="Brands Tags"
        fieldName="brandTags"
        error={errors.brandTags}
      />

      <div className="flex flex-col gap-2">
        <Checkbox
          isSelected={formData.agree}
          onValueChange={(checked) => setFormField("agree", checked)}
          radius="full"
        >
          <div className="text-xs text-gray3">
            <span className="pe-1">I agree with the</span>
            <Link href="#" underline="always">terms of service</Link>
            <span className="ps-1">of 3F.</span>
          </div>
        </Checkbox>
        {errors.agree && (
          <p className="text-red-500 text-xs">{errors.agree.message}</p>
        )}
      </div>

      <Button
        type="submit"
        color="secondary"
        variant="solid"
        className="font-light my-4 px-12 bg-primary mb-1 text-white rounded-lg border border-light2"
      >
        Continue
      </Button>
    </form>
  );
};