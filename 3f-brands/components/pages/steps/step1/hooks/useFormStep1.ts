import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { FormData, formSchema } from "../types";
import { getOptions, submitRegistration, getRegistration } from "../services/api";
import { useFormStore } from "../store/store";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

export const useFormStep = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { t, i18n } = useTranslation();
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
      toast.success(
        registrationId 
          ? t("step1.toast.success.update")
          : t("step1.toast.success.create"),
        {
          duration: 3000,
        }
      );
      
      setFormData(data, data.id);
      queryClient.setQueryData(["registrationData"], data);
      router.push("/steps/2");
    },
    onError: (error) => {
      const errorMessage = error instanceof Error 
        ? error.message 
        : t("step1.toast.error.default");
      
      toast.error(errorMessage, {
        duration: 5000,
      });
    },
  });

  // Query existing registration data if we have an ID
  const registrationQuery = useQuery({
    queryKey: ["registration", registrationId],
    queryFn: () => registrationId ? getRegistration(registrationId) : null,
    enabled: !!registrationId,
  });

  // Add language to query keys and refetch when language changes
  const queries = {
    countries: useQuery({
      queryKey: ["options", "countries", i18n.language],
      queryFn: () => getOptions("countries"),
      staleTime: 0, // Always refetch when query is invalidated
    }),
    categories: useQuery({
      queryKey: ["options", "brandcategories", i18n.language],
      queryFn: () => getOptions("brandcategories"),
      staleTime: 0,
    }),
    subcategories: useQuery({
      queryKey: ["options", "subcategories", i18n.language],
      queryFn: () => getOptions("subcategories"),
      staleTime: 0,
    }),
    brandTags: useQuery({
      queryKey: ["options", "brandTags", i18n.language],
      queryFn: () => getOptions("brandTags"),
      staleTime: 0,
    }),
  };

  // Invalidate queries when language changes
  useEffect(() => {
    const queryKeys = [
      ["options", "countries"],
      ["options", "brandcategories"],
      ["options", "subcategories"],
      ["options", "brandTags"],
    ];

    queryKeys.forEach(key => {
      queryClient.invalidateQueries({ queryKey: key });
    });
  }, [i18n.language, queryClient]);

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