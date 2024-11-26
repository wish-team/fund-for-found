import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FormData } from "../types";

export const useFormStep1 = () => {
  const methods = useForm<FormData>({
    mode: "onBlur",
    defaultValues: {
      brandTags: [],
      agree: false,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    // Example of API call:
    /*
    try {
      const response = await fetch('/api/registration/step1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      
      // Store form data in localStorage or state management
      localStorage.setItem('registrationStep1', JSON.stringify(data));
      
      // Navigate to next step
      router.push('/steps/2');
    } catch (error) {
      console.error('Registration error:', error);
      // Handle error (show toast, error message, etc.)
    }
    */

    // For now, just log and navigate
    console.log(data);
    router.push("/steps/2");
  };

  return {
    methods,
    onSubmit,
  };
};
