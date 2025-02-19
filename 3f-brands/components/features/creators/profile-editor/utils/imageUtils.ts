export const getFirstLetter = (text: string): string => 
    text.trim()[0].toUpperCase() || 'W';
  
  export const handleImageFileUpload = (
    file: File,
    callback: (result: string) => void
  ) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result as string);
    };
    reader.readAsDataURL(file);
  };