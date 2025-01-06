import React from "react";
import { Button, Checkbox, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { AutocompleteInput } from "./AutocompleteInput";
import { MultiSelectInput } from "./MultiSelectInput";
import { useRegistrationStore } from "../store/registrationStore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "axios";
import { FormData } from "../types";
import ApiTest from "../ApiTes";

const API_URL = "http://localhost:8000";

interface Option {
  id: number;
  name: string;
}

export const FormStep1: React.FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const formData = useRegistrationStore((state) => state.formData);
  const errors = useRegistrationStore((state) => state.errors);
  const validateAllFields = useRegistrationStore(
    (state) => state.validateAllFields
  );
  const setFormField = useRegistrationStore((state) => state.setFormField);
  const resetForm = useRegistrationStore((state) => state.resetForm);

  // Fetch options queries with transformed response
  const { data: brandNames = [], isLoading: loadingBrands } = useQuery({
    queryKey: ["brandNames"],
    queryFn: async () => {
      const response = await axios.get<Option[]>(`${API_URL}/brandNames`);
      return response.data.map((item) => item.name);
    },
  });

  const { data: countries = [], isLoading: loadingCountries } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const response = await axios.get<Option[]>(`${API_URL}/countries`);
      return response.data.map((item) => item.name);
    },
  });

  const { data: categories = [], isLoading: loadingCategories } = useQuery({
    queryKey: ["brandcategories"],
    queryFn: async () => {
      const response = await axios.get<Option[]>(`${API_URL}/brandcategories`);
      return response.data.map((item) => item.name);
    },
  });

  const { data: subcategories = [], isLoading: loadingSubcategories } =
    useQuery({
      queryKey: ["subcategories"],
      queryFn: async () => {
        const response = await axios.get<Option[]>(`${API_URL}/subcategories`);
        return response.data.map((item) => item.name);
      },
    });

  const { data: brandTags = [], isLoading: loadingBrandTags } = useQuery({
    queryKey: ["brandTags"],
    queryFn: async () => {
      const response = await axios.get<Option[]>(`${API_URL}/brandTags`);
      return response.data.map((item) => item.name);
    },
  });

  // Submit mutation
  const submitMutation = useMutation({
    mutationFn: async (data: FormData) => {
      try {
        const response = await axios.post(`${API_URL}/registrations`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.data;
      } catch (error) {
        // Log the full error
        console.error("Full error:", error);
        if (axios.isAxiosError(error)) {
          console.error("Response data:", error.response?.data);
          console.error("Response status:", error.response?.status);
        }
        throw error; // Re-throw to trigger onError
      }
    },
    onSuccess: () => {
      toast.success("Registration successful!");
      resetForm();
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
      router.push("/steps/2");
    },
    onError: (error: any) => {
      console.error("Submission error details:", error);
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted"); // Add this

    if (validateAllFields()) {
      console.log("Validation passed"); // Add this
      try {
        const submissionData: FormData = {
          name: formData.name || "",
          email: formData.email || "",
          password: formData.password || "",
          category: formData.category || "",
          subcategory: formData.subcategory || "",
          brandTags: formData.brandTags || [],
          country: formData.country || "",
          agree: formData.agree || false,
        };

        console.log("Submission data:", submissionData); // Add this

        // Add direct axios call for testing
        const response = await axios.post(
          `${API_URL}/registrations`,
          submissionData
        );
        console.log("Response:", response.data); // Add this

        await submitMutation.mutateAsync(submissionData);
        console.log("Mutation completed"); // Add this
      } catch (error) {
        console.error("Detailed submission error:", error); // Improve error logging
        if (axios.isAxiosError(error)) {
          console.error("Response data:", error.response?.data);
          console.error("Response status:", error.response?.status);
        }
        toast.error("Failed to submit the form. Please try again.");
      }
    } else {
      console.log("Validation failed", formData, errors); // Add this
      toast.error("Please fill in all required fields correctly.");
    }
  };

  // Show loading state while fetching options
  if (
    loadingBrands ||
    loadingCountries ||
    loadingCategories ||
    loadingSubcategories ||
    loadingBrandTags
  ) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          console.log("Form onSubmit triggered"); // Add this
          handleSubmit(e);
        }}
        className="space-y-4 py-6 grid"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AutocompleteInput
            data={brandNames}
            label="Brand/Organisation Name"
            fieldName="name"
            error={errors.name}
          />
          <AutocompleteInput
            data={countries}
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
            data={categories}
            label="Category"
            fieldName="category"
            error={errors.category}
          />
          <AutocompleteInput
            data={subcategories}
            label="Subcategory"
            fieldName="subcategory"
            error={errors.subcategory}
          />
        </div>

        <MultiSelectInput
          data={brandTags}
          label="Brand Tags"
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
              <Link href="#" size="sm" className="text-primary">
                terms of service
              </Link>
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
          isLoading={submitMutation.isPending}
          disabled={submitMutation.isPending}
          onClick={(e) => {
            console.log("Button clicked"); // Add this
          }}
        >
          {submitMutation.isPending ? "Submitting..." : "Continue"}
        </Button>
      </form>
    </>
  );
};

export default FormStep1;
