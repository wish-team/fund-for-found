import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormData, formSchema } from "../types";
import { getOptions, submitRegistration, getRegistration } from "../services/api";
import { useFormStore } from "../store/store";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

export const useFormStep = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setFormData, formData, registrationId, resetForm } = useFormStore();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...formData,
      brandTags: formData.brandTags || [],
      agree: formData.agree || false,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => submitRegistration(data, registrationId),
    onSuccess: (data) => {
      const message = registrationId 
        ? "Registration updated successfully! Proceeding to next step..."
        : "Registration successful! Proceeding to next step...";
      
      toast.success(message, {
        duration: 3000,
      });
      
      // Save both the form data and registration ID
      setFormData(data, data.id);
      queryClient.setQueryData(["registrationData"], data);
      router.push("/steps/2");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error 
          ? error.message 
          : "Registration failed. Please try again.",
        {
          duration: 5000,
        }
      );
    },
  });

  // Query existing registration data if we have an ID
  const registrationQuery = useQuery({
    queryKey: ["registration", registrationId],
    queryFn: () => registrationId ? getRegistration(registrationId) : null,
    enabled: !!registrationId,
  });

  // Load existing registration data when available
  useEffect(() => {
    const data = registrationQuery.data;
    if (data) {
      Object.keys(data).forEach((key) => {
        if (key !== 'id') {
          form.setValue(key as keyof FormData, data[key as keyof FormData]);
        }
      });
    }
  }, [registrationQuery.data, form]);

  const queries = {
    countries: useQuery({
      queryKey: ["options", "countries"],
      queryFn: () => getOptions("countries"),
    }),
    categories: useQuery({
      queryKey: ["options", "brandcategories"],
      queryFn: () => getOptions("brandcategories"),
    }),
    subcategories: useQuery({
      queryKey: ["options", "subcategories"],
      queryFn: () => getOptions("subcategories"),
    }),
    brandTags: useQuery({
      queryKey: ["options", "brandTags"],
      queryFn: () => getOptions("brandTags"),
    }),
  };

  const isLoading = Object.values(queries).some(query => query.isLoading) || 
    registrationQuery.isLoading;

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return {
    form,
    onSubmit,
    isLoading,
    isPending,
    queries,
    isUpdate: !!registrationId,
  };
};