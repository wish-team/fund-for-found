import CreatorsTitle from "../../creators/title/CreatorsTitle";
import React from "react";
import { FormProvider } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { useFormStep1 } from "../../steps/step1/hooks/useFormStep1";
import { AutocompleteInput } from "../../steps/step1/components/AutocompleteInput";
import { MultiSelectInput } from "../../steps/step1/components/MultiSelectInput";
import { mockData } from "../../steps/step1/utils/mockData";
import { useStep2Form } from "../../steps/step2/hooks/useStep2Form";
import { SocialInputField } from "../../steps/step2/components/SocialInputField"
const Info = () => {
  const { methods, onSubmit } = useFormStep1();
  const { formData, updateSocialLinks} = useStep2Form();

  const handleSocialInputAdd = () => {
    const newId = Date.now();
    updateSocialLinks([
      ...formData.socialLinks,
      { id: newId, platform: "instagram", url: "http://instagram.com/" },
    ]);
  };

  const handleSocialInputRemove = (id: number) => {
    updateSocialLinks(formData.socialLinks.filter((link) => link.id !== id));
  };

  const handleSocialInputChange = (
    id: number,
    platform: string,
    url: string
  ) => {
    updateSocialLinks(
      formData.socialLinks.map((link) =>
        link.id === id ? { ...link, platform, url } : link
      )
    );
  };

  return (
    <section>
      <CreatorsTitle title="Info" />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-4 py-6 grid"
        >
          <AutocompleteInput
            data={mockData.brandNames}
            label="Use the below code in your analytis for track your page"
            fieldName="name"
            placeholder="3F-5000021100F545X57P0012"
            error={methods.formState.errors.name}
          />
          <AutocompleteInput
            data={mockData.brandNames}
            label="Link to your brand or organisation"
            fieldName="name"
            placeholder="http://fundforfound.com/brand/@chanelb"
            error={methods.formState.errors.name}
          />
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
          {methods.formState.errors.agree && (
            <p className="text-red-500 text-xs pt-1">
              {methods.formState.errors.agree.message}
            </p>
          )}

          {formData.socialLinks.map((link) => (
            <SocialInputField
              key={link.id}
              id={link.id}
              onRemove={handleSocialInputRemove}
              onChange={handleSocialInputChange}
            />
          ))}
          <Button
            onClick={handleSocialInputAdd}
            color="primary"
            variant="bordered"
            className="bg-light4 font-light rounded-lg border border-light2 md:w-[250px] w-full"
          >
            Add social link
          </Button>

          <Button
            type="submit"
            color="secondary"
            variant="solid"
            className="font-light my-4 px-12 bg-primary mb-1 text-white rounded-lg border border-light2"
          >
            save
          </Button>
        </form>
      </FormProvider>
    </section>
  );
};
export default Info;
