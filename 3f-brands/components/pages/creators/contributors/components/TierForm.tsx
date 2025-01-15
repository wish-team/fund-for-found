import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Input, Textarea, Button } from "@nextui-org/react";
import { Upload } from "lucide-react";
import { TierFormData } from "../types/tier";
import { TIER_FORM_DEFAULT_VALUES } from "../utils/constants";
import { handleNumericInput } from "../utils/validation";
import { PreviewCard } from "./PreviewCard";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa' || i18n.language === 'far';
  
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TierFormData>({
    defaultValues: { ...TIER_FORM_DEFAULT_VALUES, ...initialValues },
  });

  const formValues = watch();

  // Utility function to get text direction
  const getDirection = (text: string) => {
    // If language is Persian, force RTL
    if (isRTL) return "rtl";
    // For English and other languages, use LTR
    return "ltr";
  };

  const inputClassName = `border border-light3 rounded-lg text-xs font-extralight hover:border-purple-500 focus:border-purple-500 ${
    isRTL ? 'text-right' : 'text-left'
  }`;

  const labelClassName = `block text-sm font-medium text-gray-700 mb-1 ${
    isRTL ? 'text-right' : 'text-left'
  }`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} dir={isRTL ? "rtl" : "ltr"}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className={labelClassName}>
              {t('translation:creators.tier.form.name.label')}
            </label>
            <Controller
              name="name"
              control={control}
              rules={{ 
                required: t('creators.tier.form.validation.required', { field: t('creators.tier.form.name.label') })
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={t('translation:creators.tier.form.name.placeholder')}
                  dir={getDirection(field.value || '')}
                  className={inputClassName}
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message}
                />
              )}
            />
          </div>

          <div>
            <label className={labelClassName}>
              {t('translation:creators.tier.form.description.label')}
            </label>
            <Controller
              name="rewardDescription"
              control={control}
              rules={{ 
                required: t('creators.tier.form.validation.required', { field: t('creators.tier.form.description.label') })
              }}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder={t('translation:creators.tier.form.description.placeholder')}
                  dir={getDirection(field.value || '')}
                  className={`${inputClassName} min-h-[110px]`}
                  isInvalid={!!errors.rewardDescription}
                  errorMessage={errors.rewardDescription?.message}
                />
              )}
            />
          </div>

          <div>
            <label className={labelClassName}>
              {t('translation:creators.tier.form.amount.label')}
            </label>
            <Controller
              name="amount"
              control={control}
              rules={{
                required: t('creators.tier.form.validation.required', { field: t('creators.tier.form.amount.label') }),
                validate: (value) =>
                  parseInt(value) >= 0 || t('translation:creators.tier.form.validation.positiveAmount'),
              }}
              render={({ field: { onChange, value, ...field } }) => (
                <Input
                  {...field}
                  value={value}
                  type="text"
                  inputMode="numeric"
                  placeholder={t('translation:creators.tier.form.amount.placeholder')}
                  dir={isRTL ? "rtl" : "ltr"}
                  className={inputClassName}
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
            <label className={labelClassName}>
              {t('translation:creators.tier.form.coverPhoto.label')}
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
                      {t('translation:creators.tier.form.coverPhoto.uploadText')}
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

        <div className={isRTL ? 'text-right' : 'text-left'}>
          <h3 className="text-lg font-semibold text-primary mb-4">
            {t('translation:creators.tier.form.preview')}
          </h3>
          <PreviewCard
            data={formValues}
            preview={true}
            imagePreview={imagePreview}
          />
        </div>
      </div>

      <div className={`flex gap-2 mt-6 ${isRTL ? 'justify-start' : 'justify-end'}`}>
        <Button
          className="bg-light4 text-gray4 font-light rounded-lg border border-light2 text-xs hover:border-purple-500 hover:bg-primary50"
          onClick={onCancel}
        >
          {t('translation:creators.tier.form.buttons.cancel')}
        </Button>
        <Button
          className="bg-primary text-white border border-primary200 hover:bg-primary400 rounded-lg text-xs"
          type="submit"
        >
          {t('translation:creators.tier.form.buttons.save')}
        </Button>
      </div>
    </form>
  );
};