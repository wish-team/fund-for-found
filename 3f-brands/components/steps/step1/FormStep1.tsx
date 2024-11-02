"use client";
import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import Inputs from "../../shared/Input";
import Button from "@/components/shared/Button";
import CountryInput from "./CountryInput"; // Import the new CountryInput component

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
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 py-6 grid">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1 md:col-span-1">
            <Inputs
              label="Brand/Organisation Name *"
              type="text"
              className="mt-1"
              inputClassName={methods.formState.errors.name ? "border-red-500" : "border-light3"}
              {...methods.register("name", { required: "Brand or organization is required" })}
            />
            {methods.formState.errors.name && <p className="text-red-500">{methods.formState.errors.name.message}</p>}
          </div>
          <div className="col-span-1 md:col-span-1">
            <CountryInput /> {/* Use the CountryInput component */}
            {methods.formState.errors.country && <p className="text-red-500">{methods.formState.errors.country.message}</p>}
          </div>
        </div>

        <p className="text-light1 font-light">
          Select the primary category that best describes your brand or organization. Then select the subcategory that further defines your brand or organization.
        </p>

        <div className="flex gap-6">
          <Inputs
            label="Category *"
            type="text"
            className="mt-1"
            inputClassName={methods.formState.errors.category ? "border-red-500" : "border-light3"}
            {...methods.register("category", { required: "Category is required" })}
          />
          {methods.formState.errors.category && <p className="text-red-500">{methods.formState.errors.category.message}</p>}

          <Inputs
            label="Subcategory *"
            type="text"
            className="mt-1"
            inputClassName={methods.formState.errors.subcategory ? "border-red-500" : "border-light3"}
            {...methods.register("subcategory", { required: "Subcategory is required" })}
          />
          {methods.formState.errors.subcategory && <p className="text-red-500">{methods.formState.errors.subcategory.message}</p>}
        </div>

        <Inputs
          label="Brand Tags *"
          type="text"
          className="mt-1"
          inputClassName={methods.formState.errors.brandTags ? "border-red-500" : "border-light3"}
          {...methods.register("brandTags", { required: "Brand tags are required" })}
        />
        {methods.formState.errors.brandTags && <p className="text-red-500">{methods.formState.errors.brandTags.message}</p>}

        <Button text="Continue" />
      </form>
    </FormProvider>
  );
};

export default FormStep1;
