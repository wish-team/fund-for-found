import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AutocompleteInput } from "../../steps/step1/components/AutocompleteInput";
import { MultiSelectInput } from "../../steps/step1/components/MultiSelectInput";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getOptions, getRegistration, updateInfo } from "../../steps/step1/services/api";
import CreatorsTitle from "../../creators/title/CreatorsTitle";
import { ExtendedFormData, SocialLink, extendedFormSchema } from "../../steps/step1/types";
import { useFormStore } from "../../steps/step1/store/store";
import { toast } from "react-hot-toast";



const Info: React.FC = () => {
  const queryClient = useQueryClient();
  const { formData, registrationId, setFormData } = useFormStore();
  const [socialLinks, setSocialLinks] = React.useState<SocialLink[]>(
    formData.socialLinks || []
  );

  const form = useForm<ExtendedFormData>({
    resolver: zodResolver(extendedFormSchema),
    defaultValues: {
      ...formData,
      socialLinks: formData.socialLinks || [],
      brandTags: formData.brandTags || [],
    },
  });

  // Fetch existing registration data
  const { data: registrationData } = useQuery({
    queryKey: ["registration", registrationId],
    queryFn: () => (registrationId ? getRegistration(registrationId) : null),
    enabled: !!registrationId,
  });

  // Load registration data into form
  React.useEffect(() => {
    if (registrationData) {
      Object.keys(registrationData).forEach((key) => {
        if (key !== "id") {
          form.setValue(key as keyof ExtendedFormData, registrationData[key as keyof ExtendedFormData]);
        }
      });
    }
  }, [registrationData, form]);

  // Options queries
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

  // Update mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ExtendedFormData) => {
      if (!registrationId) {
        throw new Error("No registration ID found");
      }
      return updateInfo(registrationId, data);
    },
    onSuccess: (data) => {
      setFormData(data, data.id);
      queryClient.invalidateQueries({ queryKey: ["registration", registrationId] });
      toast.success("Information updated successfully!");
      
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to update information"
      );
    },
  });

  const handleSocialInputAdd = () => {
    const newId = Date.now();
    const newLink: SocialLink = {
      id: newId,
      platform: "instagram",
      url: "https://instagram.com/",
    };
    setSocialLinks([...socialLinks, newLink]);
    const currentLinks = form.getValues("socialLinks") || [];
    form.setValue("socialLinks", [...currentLinks, newLink]);
  };

  const handleSocialInputRemove = (id: number) => {
    setSocialLinks(socialLinks.filter((link) => link.id !== id));
    const currentLinks = form.getValues("socialLinks") || [];
    form.setValue(
      "socialLinks",
      currentLinks.filter((link) => link.id !== id)
    );
  };

  const handleSocialInputChange = (
    id: number,
    platform: string,
    url: string,
  ) => {
    const updatedLinks = socialLinks.map((link) =>
      link.id === id ? { ...link, platform, url } : link
    );
    setSocialLinks(updatedLinks);
    form.setValue("socialLinks", updatedLinks);
  };

  const onSubmit = (data: ExtendedFormData) => {
    mutate(data);
  };

  const isLoading = Object.values(queries).some((query) => query.isLoading);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <section>
      <CreatorsTitle title="Info" />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-6 grid">
        <AutocompleteInput
          control={form.control}
          name="trackingCode"
          label="Use the below code in your analytics for track your page"
          placeholder="3F-5000021100F545X57P0012"
          allowCustomInput={true}
        />

        <AutocompleteInput
          control={form.control}
          name="brandLink"
          label="Link to your brand or organisation"
          placeholder="http://fundforfound.com/brand/@chanelb"
          allowCustomInput={true}
        />

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
          label="Brands"
          options={queries.brandTags.data || []}
        />

        {socialLinks.map((link) => (
          <div key={link.id} className="flex gap-4">
            <input
              type="text"
              value={link.platform}
              onChange={(e) =>
                handleSocialInputChange(link.id, e.target.value, link.url)
              }
              className="border rounded-lg p-2"
              placeholder="Platform"
            />
            <input
              type="text"
              value={link.url}
              onChange={(e) =>
                handleSocialInputChange(link.id, link.platform, e.target.value)
              }
              className="border rounded-lg p-2 flex-1"
              placeholder="URL"
            />
            <Button
              onClick={() => handleSocialInputRemove(link.id)}
              color="danger"
              className="rounded-lg"
            >
              Remove
            </Button>
          </div>
        ))}

        <Button
          onClick={handleSocialInputAdd}
          type="button"
          color="primary"
          variant="bordered"
          className="bg-light4 font-light rounded-lg border border-light2 md:w-[250px] w-full"
        >
          Add social link
        </Button>

        <Button
          type="submit"
          color="secondary"
          className="font-light my-4 px-12 bg-primary mb-1 text-white rounded-lg border border-light2"
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Save"}
        </Button>
      </form>
    </section>
  );
};

export default Info;