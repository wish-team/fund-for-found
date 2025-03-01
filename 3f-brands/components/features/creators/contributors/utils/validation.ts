export const handleNumericInput = (
  e: React.ChangeEvent<HTMLInputElement>,
  onChange: (value: string) => void
) => {
  const value = e.target.value;
  if (value === "" || /^\d+$/.test(value)) {
    onChange(value);
  }
};
