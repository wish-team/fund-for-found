"use client";
import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import Inputs from "../../shared/Input";
import CountryInput from "./CountryInput"; // Import the new CountryInput component
import BrandInput from "./BrandInput";
import Link from "next/link";
import { Button } from "@nextui-org/react";

const countriesMock = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "India",
];

const categoriesMock = [
  "Technology",
  "Health",
  "Finance",
  "Education",
  "Entertainment",
];

const subCategoriesMock = [
  "Mobile",
  "Web",
  "AI",
  "Blockchain",
  "Cloud Computing",
];

const BrandItems = [
  "designer",
  "webDeveloper",
  "AI",
  "podcaster",
  "Cloud Computing",
];

interface FormData {
  name: string;
  email: string;
  password: string; // Assuming you want to keep this for later use
  category: string;
  subcategory: string;
  brandTags: string;
  country: string; // Add country field
}

const FormStep1: React.FC = () => {
  const methods = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-4 py-6 grid"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1 md:col-span-1">
            <Inputs
              label="Brand/Organisation Name *"
              type="text"
              className="mt-1"
              inputClassName={
                methods.formState.errors.name
                  ? "border-red-500"
                  : "border-light3"
              }
              {...methods.register("name", {
                required: "Brand or organization is required",
              })}
            />
            {methods.formState.errors.name && (
              <p className="text-red-500">
                {methods.formState.errors.name.message}
              </p>
            )}
          </div>
          <div className="col-span-1 md:col-span-1">
            <CountryInput
              data={countriesMock}
              label="Country"
              fieldName="country"
            />
            {methods.formState.errors.country && (
              <p className="text-red-500">
                {methods.formState.errors.country.message}
              </p>
            )}
          </div>
        </div>

        <p className="text-light1 font-light">
          Select the primary category that best describes your brand or
          organization. Then select the subcategory that further defines your
          brand or organization.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1 md:col-span-1">
            <CountryInput
              data={categoriesMock}
              label="Category"
              fieldName="category"
            />
            {methods.formState.errors.name && (
              <p className="text-red-500">
                {methods.formState.errors.name.message}
              </p>
            )}
          </div>
          <div className="col-span-1 md:col-span-1">
            <CountryInput
              data={subCategoriesMock}
              label="Subcategory"
              fieldName="subcategory"
            />
            {methods.formState.errors.country && (
              <p className="text-red-500">
                {methods.formState.errors.country.message}
              </p>
            )}
          </div>
        </div>
        <BrandInput data={BrandItems} label="Brands" fieldName="brands" />
        {methods.formState.errors.brandTags && (
          <p className="text-red-500">
            {methods.formState.errors.brandTags.message}
          </p>
        )}

        <Link href="/steps/2">
          <Button
            color="secondary"
            variant="solid"
            className="font-light my-4 px-12 bg-primary mb-1 text-white rounded-lg border border-light2"
          >
            Continue
          </Button>
        </Link>
      </form>
    </FormProvider>
  );
};

export default FormStep1;
