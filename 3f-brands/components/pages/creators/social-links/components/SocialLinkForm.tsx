import React, { useState } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectItem,
  Button,
  Input,
  SelectSection,
} from "@nextui-org/react";
import { IoMdAdd } from "react-icons/io";
import { FaTimes } from "react-icons/fa";
import { SOCIAL_OPTIONS } from "../constants";
import { getIcon, getDefaultUrl } from "../utils/helpers";
import { SocialLinksSchema } from "../utils/validation";

interface SocialLinkFormProps {
  form: UseFormReturn<SocialLinksSchema>;
}

export const SocialLinkForm: React.FC<SocialLinkFormProps> = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "socialLinks",
  });

  const [openSelect, setOpenSelect] = useState<number | null>(null);
  const [duplicateError, setDuplicateError] = useState<string | null>(null);

  const getUsedSocialTypes = () => {
    return form.getValues("socialLinks").map((link) => link.type);
  };

  const handleAddSocialLink = () => {
    const usedTypes = getUsedSocialTypes();
    const availableOption = SOCIAL_OPTIONS.find(
      (opt) => !usedTypes.includes(opt.value)
    );

    if (!availableOption) {
      setDuplicateError("All social media platforms have been added");
      return;
    }

    append({
      type: availableOption.value,
      url: availableOption.defaultUrl,
    });
    setDuplicateError(null);
  };

  const handleSocialTypeChange = (value: Set<string>, index: number) => {
    const newType = Array.from(value)[0];
    if (!newType) return;

    const currentTypes = getUsedSocialTypes();
    const isTypeUsed = currentTypes.some(
      (type, idx) => type === newType && idx !== index
    );

    if (isTypeUsed) {
      setDuplicateError(`${newType} has already been added`);
      return;
    }

    const newDefaultUrl = getDefaultUrl(newType);

    form.setValue(
      `socialLinks.${index}`,
      {
        type: newType,
        url: newDefaultUrl,
      },
      {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      }
    );

    setOpenSelect(null);
    setDuplicateError(null);
  };

  const handleUrlChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.trim();
    form.setValue(`socialLinks.${index}.url`, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleRemove = (index: number) => {
    remove(index);
    setDuplicateError(null);
  };

  const handleSelectClick = (index: number) => {
    setOpenSelect((currentOpen) => (currentOpen === index ? null : index));
    setDuplicateError(null);
  };

  const getAvailableOptions = (currentIndex: number) => {
    const usedTypes = getUsedSocialTypes();
    return SOCIAL_OPTIONS.filter(
      (option) =>
        !usedTypes.includes(option.value) ||
        form.getValues(`socialLinks.${currentIndex}.type`) === option.value
    );
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4 h-[300px] overflow-auto">
        {fields.map((field, index) => {
          const urlError = form.formState.errors.socialLinks?.[index]?.url;
          const availableOptions = getAvailableOptions(index);
          const currentType = form.watch(`socialLinks.${index}.type`);
          const socialOption = SOCIAL_OPTIONS.find(
            (opt) => opt.value === currentType
          );

          return (
            <div key={field.id} className="space-y-1">
              <div className="flex items-center gap-2">
                <Select
                  selectedKeys={new Set([currentType])}
                  onSelectionChange={(keys) =>
                    handleSocialTypeChange(keys as Set<string>, index)
                  }
                  className="w-1/3 p-0  rounded-lg text-sm text-gray4 border border-light3 hover:border-purple-500"
                  startContent={getIcon(currentType)}
                  aria-label="Select social platform"
                  isOpen={openSelect === index}
                  onOpenChange={() => handleSelectClick(index)}
                  classNames={{
                    trigger: "cursor-pointer",
                  }}
                >
                  <SelectSection className="bg-white border border-light3 rounded-lg text-sm w-full">
                    {availableOptions.map((option) => (
                      <SelectItem
                        className="bg-white text-gray4 hover:text-primary text-sm"
                        key={option.value}
                        value={option.value}
                        startContent={option.icon}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectSection>
                </Select>

                <div className="flex-1">
                  <Input
                    className="rounded-lg text-sm text-gray4 border border-light3 hover:border-purple-500 focus:border-purple-500"
                    value={form.watch(`socialLinks.${index}.url`)}
                    onChange={(e) => handleUrlChange(e, index)}
                    placeholder={`Enter ${socialOption?.label} URL`}
                    isInvalid={!!urlError}
                    errorMessage={urlError?.message}
                    type="url"
                  />
                </div>

                <Button
                  isIconOnly
                  color="danger"
                  variant="light"
                  className="text-gray4 hover:text-red-500"
                  onPress={() => handleRemove(index)}
                >
                  <FaTimes size={18} />
                </Button>
              </div>
            </div>
          );
        })}

        {duplicateError && (
          <p className="text-red-500 text-xs">{duplicateError}</p>
        )}

        {form.formState.errors.socialLinks?.message && (
          <p className="text-red-500 text-xs">
            {form.formState.errors.socialLinks.message}
          </p>
        )}
      </div>

      <Button
        onPress={handleAddSocialLink}
        color="primary"
        variant="flat"
        startContent={<IoMdAdd />}
        className="bg-light4 text-gray4 font-light rounded-lg border border-light2 w-full hover:border-purple-500"
        isDisabled={getUsedSocialTypes().length === SOCIAL_OPTIONS.length}
      >
        Add social link
      </Button>
    </div>
  );
};

export default SocialLinkForm;
