import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Input, Textarea, Button } from "@nextui-org/react";
import { Upload } from "lucide-react";
import { TierFormData } from "../types/tier";
import { TIER_FORM_DEFAULT_VALUES } from "../utils/constants";
import { handleNumericInput } from "../utils/validation";
import { PreviewCard } from "./PreviewCard";

interface TierFormProps {
  onSubmit: (data: TierFormData) => void;
  onCancel: () => void;
  initialValues?: Partial<TierFormData>;
  imagePreview: string | null;
  onImageChange: (file: File) => void;
}

export const TierForm: React.FC<TierFormProps> = ({
  onSubmit,
  onCancel,
  initialValues,
  imagePreview,
  onImageChange,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TierFormData>({
    defaultValues: { ...TIER_FORM_DEFAULT_VALUES, ...initialValues },
  });

  const formValues = watch();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Silver Sponsor"
                  className="border border-light3 rounded-lg text-xs font-extralight hover:border-purple-500 focus:border-purple-500"
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message}
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reward Description
            </label>
            <Controller
              name="rewardDescription"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Join the guest list and be the first to know major updates about our project events. Plus, enjoy some digital gift card to be invited to the  events."
                  className="border border-light3 min-h-[110px] rounded-lg text-xs font-extralight hover:border-purple-500 focus:border-purple-500"
                  isInvalid={!!errors.rewardDescription}
                  errorMessage={errors.rewardDescription?.message}
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <Controller
              name="amount"
              control={control}
              rules={{
                required: "Amount is required",
                validate: (value) =>
                  parseInt(value) >= 0 || "Amount must be positive",
              }}
              render={({ field: { onChange, value, ...field } }) => (
                <Input
                  {...field}
                  value={value}
                  type="text"
                  inputMode="numeric"
                  placeholder="20 USD"
                  className="border border-light3 rounded-lg text-xs font-extralight hover:border-purple-500 focus:border-purple-500"
                  isInvalid={!!errors.amount}
                  errorMessage={errors.amount?.message}
                  onInput={(e) =>
                    handleNumericInput(
                      e as React.ChangeEvent<HTMLInputElement>,
                      onChange
                    )
                  }
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Photo
            </label>
            <Controller
              name="coverPhoto"
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <div
                    className="w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-primary50 transition-colors"
                    onClick={() =>
                      document.getElementById("coverPhotoInput")?.click()
                    }
                  >
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Click to upload cover photo
                    </p>
                  </div>
                  <input
                    id="coverPhotoInput"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        field.onChange(file);
                        onImageChange(file);
                      }
                      e.target.value = "";
                    }}
                  />
                </div>
              )}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-primary mb-4">Preview</h3>
          <PreviewCard
            data={formValues}
            preview={true}
            imagePreview={imagePreview}
          />
        </div>
      </div>

      <div className="flex gap-2 justify-end mt-6">
        <Button
          className="bg-light4 text-gray4 font-light rounded-lg border border-light2 text-xs hover:border-purple-500 hover:bg-primary50"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          className="bg-primary text-white border border-primary200 hover:bg-primary400 rounded-lg text-xs"
          type="submit"
        >
          Save
        </Button>
      </div>
    </form>
  );
};
