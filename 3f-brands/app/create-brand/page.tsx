"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@nextui-org/react";
import { createBrand } from "../actions/brandActions";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "react-toastify";
import { BrandFormData } from "../types/brandForm";
import { useTranslation } from "react-i18next";

// Form schema
const formSchema = z.object({
  brand_name: z.string().min(2, { message: "Brand name is required" }),
  brand_image: z.string().url({ message: "Brand image must be a valid URL" }),
  about_brand: z.string().min(10, { message: "About brand is required" }),
  brand_country: z.string().min(2, { message: "Country is required" }),
  owner_id: z.string(),
  brand_tags: z.array(
    z.object({
      tag_name: z.string().min(1, { message: "Tag name is required" }),
    })
  ).min(1, { message: "At least one tag is required" }),
  social_media: z.array(
    z.object({
      name: z.string().min(1, { message: "Social media name is required" }),
      link: z.string().url({ message: "Link must be a valid URL" }),
    })
  ).min(1, { message: "At least one social media link is required" }),
});

export default function CreateBrandPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [socialMediaNameInput, setSocialMediaNameInput] = useState("");
  const [socialMediaLinkInput, setSocialMediaLinkInput] = useState("");

  const form = useForm<BrandFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand_name: "",
      brand_image: "",
      about_brand: "",
      brand_country: "",
      owner_id: "",
      brand_tags: [],
      social_media: [],
    },
  });

  const brandTags = form.watch("brand_tags") || [];
  const socialMedia = form.watch("social_media") || [];

  // Add new tag
  const addTag = () => {
    if (tagInput.trim()) {
      form.setValue("brand_tags", [...brandTags, { tag_name: tagInput }]);
      setTagInput("");
    }
  };

  // Remove tag
  const removeTag = (index: number) => {
    const newTags = [...brandTags];
    newTags.splice(index, 1);
    form.setValue("brand_tags", newTags);
  };

  // Add new social media
  const addSocialMedia = () => {
    if (socialMediaNameInput.trim() && socialMediaLinkInput.trim()) {
      form.setValue("social_media", [
        ...socialMedia,
        { name: socialMediaNameInput, link: socialMediaLinkInput },
      ]);
      setSocialMediaNameInput("");
      setSocialMediaLinkInput("");
    }
  };

  // Remove social media
  const removeSocialMedia = (index: number) => {
    const newSocialMedia = [...socialMedia];
    newSocialMedia.splice(index, 1);
    form.setValue("social_media", newSocialMedia);
  };

  const onSubmit = async (data: BrandFormData) => {
    setIsSubmitting(true);
    try {
      // Add a placeholder owner_id if not present
      if (!data.owner_id) {
        data.owner_id = "placeholder_id";
      }
      
      console.log("Submitting data:", data);
      const result = await createBrand(data);
      console.log("API response:", result);
      
      if (result.success) {
        toast.success("Brand created successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
        // Small delay to allow the toast to be seen before navigation
        setTimeout(() => {
          router.push("/created-brand-result");
        }, 500);
      } else {
        toast.error(result.error || "Failed to create brand", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while creating the brand", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Create Your Brand</h1>
      
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md"
      >
        <div className="space-y-6">
          {/* Brand Name */}
          <div>
            <label htmlFor="brand_name" className="block text-sm font-medium text-gray-700 mb-1">
              Brand Name*
            </label>
            <input
              id="brand_name"
              type="text"
              {...form.register("brand_name")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your brand name"
            />
            {form.formState.errors.brand_name && (
              <p className="mt-1 text-sm text-red-600">{form.formState.errors.brand_name.message}</p>
            )}
          </div>

          {/* Brand Image */}
          <div>
            <label htmlFor="brand_image" className="block text-sm font-medium text-gray-700 mb-1">
              Brand Image URL*
            </label>
            <input
              id="brand_image"
              type="url"
              {...form.register("brand_image")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://example.com/logo.png"
            />
            {form.formState.errors.brand_image && (
              <p className="mt-1 text-sm text-red-600">{form.formState.errors.brand_image.message}</p>
            )}
          </div>

          {/* About Brand */}
          <div>
            <label htmlFor="about_brand" className="block text-sm font-medium text-gray-700 mb-1">
              About Brand*
            </label>
            <textarea
              id="about_brand"
              {...form.register("about_brand")}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Describe your brand..."
            />
            {form.formState.errors.about_brand && (
              <p className="mt-1 text-sm text-red-600">{form.formState.errors.about_brand.message}</p>
            )}
          </div>

          {/* Country */}
          <div>
            <label htmlFor="brand_country" className="block text-sm font-medium text-gray-700 mb-1">
              Country*
            </label>
            <input
              id="brand_country"
              type="text"
              {...form.register("brand_country")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Country"
            />
            {form.formState.errors.brand_country && (
              <p className="mt-1 text-sm text-red-600">{form.formState.errors.brand_country.message}</p>
            )}
          </div>

          {/* Brand Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand Tags*
            </label>
            <div className="flex mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Add a tag"
              />
              <Button 
                type="button" 
                onClick={addTag}
                className="px-4 py-2 bg-primary text-white rounded-r-md"
              >
                Add
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {brandTags.map((tag, index) => (
                <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                  <span className="mr-1">{tag.tag_name}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            {form.formState.errors.brand_tags && (
              <p className="mt-1 text-sm text-red-600">{form.formState.errors.brand_tags.message}</p>
            )}
          </div>

          {/* Social Media */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Social Media*
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                value={socialMediaNameInput}
                onChange={(e) => setSocialMediaNameInput(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Platform (e.g., Twitter)"
              />
              <input
                type="url"
                value={socialMediaLinkInput}
                onChange={(e) => setSocialMediaLinkInput(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://example.com/profile"
              />
            </div>
            <Button 
              type="button" 
              onClick={addSocialMedia}
              className="px-4 py-2 bg-primary text-white rounded-md mb-2 w-full"
            >
              Add Social Media
            </Button>
            
            <div className="space-y-2 mt-2">
              {socialMedia.map((sm, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md">
                  <div>
                    <span className="font-medium">{sm.name}: </span>
                    <span className="text-blue-600">{sm.link}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSocialMedia(index)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            {form.formState.errors.social_media && (
              <p className="mt-1 text-sm text-red-600">{form.formState.errors.social_media.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            className="w-full py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            Create Brand
          </Button>
        </div>
      </form>
    </div>
  );
}
