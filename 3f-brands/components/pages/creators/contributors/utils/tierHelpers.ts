export const DEFAULT_IMAGE = "/api/placeholder/400/320";

export const handleNumericInput = (
  e: React.ChangeEvent<HTMLInputElement>,
  onChange: (value: string) => void
) => {
  const value = e.target.value;
  if (value === '' || /^\d+$/.test(value)) {
    onChange(value);
  }
};

export const handleImageChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  field: { onChange: (file: File) => void },
  setImagePreview: (preview: string) => void
) => {
  const { files } = e.target;
  if (files?.length > 0) {
    field.onChange(files[0]);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(files[0]);
    e.target.value = '';
  }
};