"use client";
import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import InputStep1 from "./InputStep1"; 
import BrandInput from "./BrandInput";
import { Link } from "@nextui-org/react";
import { Button, Checkbox } from "@nextui-org/react";
import { useRouter } from 'next/navigation'; 

const countriesMock = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "India",
];

const categoriesMock = [
  "Technology",
  "Health",
  "Finance",
  "Education",
  "Entertainment",
];

const subCategoriesMock = [
  "Mobile",
  "Web",
  "AI",
  "Blockchain",
  "Cloud Computing",
];

const BrandItems = [
  "designer",
  "webDeveloper",
  "AI",
  "podcaster",
  "Cloud Computing",
];

interface FormData {
  name: string;
  email: string;
  password: string; 
  category: string;
  subcategory: string;
  brandTags: string;
  country: string; 
  agree: boolean; 
}

const FormStep1: React.FC = () => {
  const methods = useForm<FormData>({
    mode: "onBlur", 
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    router.push("/steps/2");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 py-6 grid">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1 md:col-span-1">
            <InputStep1
              data={BrandItems}
              label="Brand/Organisation Name"
              fieldName="name"
              {...methods.register("name", { required: "Input is empty" })}
              error={methods.formState.errors.name}
            />
            {methods.formState.errors.name && (
              <p className="text-red-500 text-xs pt-1">
                {methods.formState.errors.name.message}
              </p>
            )}
          </div>
          <div className="col-span-1 md:col-span-1">
            <InputStep1
              data={countriesMock}
              label="Country"
              fieldName="country"
              {...methods.register("country", { required: "Input is empty" })}
              error={methods.formState.errors.country}
            />
            {methods.formState.errors.country && (
              <p className="text-red-500 text-xs pt-1">
                {methods.formState.errors.country.message}
              </p>
            )}
          </div>
        </div>

        <p className="text-light1 font-light">
          Select the primary category that best describes your brand or
          organization. Then select the subcategory that further defines your
          brand or organization.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1 md:col-span-1">
            <InputStep1
              data={categoriesMock}
              label="Category"
              fieldName="category"
              {...methods.register("category", { required: "Input is empty" })}
              error={methods.formState.errors.category}
            />
            {methods.formState.errors.category && (
              <p className="text-red-500 text-xs pt-1">
                {methods.formState.errors.category.message}
              </p>
            )}
          </div>
          <div className="col-span-1 md:col-span-1">
            <InputStep1
              data={subCategoriesMock}
              label="Subcategory"
              fieldName="subcategory"
              {...methods.register("subcategory", { required: "Input is empty" })}
              error={methods.formState.errors.subcategory}
            />
            {methods.formState.errors.subcategory && (
              <p className="text-red-500 text-xs pt-1">
                {methods.formState.errors.subcategory.message}
              </p>
            )}
          </div>
        </div>

        <BrandInput
          data={BrandItems}
          label="Brands"
          fieldName="brandTags"
          {...methods.register("brandTags", { required: "Input is empty" })}
          error={methods.formState.errors.brandTags}
        />
        {methods.formState.errors.brandTags && (
          <p className="text-red-500 text-xs pt-1">
            {methods.formState.errors.brandTags.message}
          </p>
        )}

        <Checkbox
          {...methods.register("agree", { required: "You must agree to the terms" })}
          radius="full"
        >
          <div className="text-xs text-gray3">
            <span className="pe-1">I agree with the</span>
            <Link href="#" underline="always">terms of service</Link>
            <span className="ps-1">of 3F.</span>
          </div>
        </Checkbox>
        {methods.formState.errors.agree && (
          <p className="text-red-500 text-xs pt-1">
            {methods.formState.errors.agree.message}
          </p>
        )}

        <Button
          type="submit"
          color="secondary"
          variant="solid"
          className="font-light my-4 px-12 bg-primary mb-1 text-white rounded-lg border border-light2"
        >
          Continue
        </Button>
      </form>
    </FormProvider>
  );
};

export default FormStep1;





// "use client";
// import React, { useEffect, useState } from "react";
// import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
// import InputStep1 from "./InputStep1"; // Import the new InputStep1 component
// import BrandInput from "./BrandInput";
// import { Link } from "@nextui-org/react";
// import { Button, Checkbox } from "@nextui-org/react";
// import { useRouter } from 'next/navigation';
// import { supabase } from '../../../utils/supabase/client'; // Adjust the import path as needed

// const BrandItems = [
//   "designer",
//   "webDeveloper",
//   "AI",
//   "podcaster",
//   "Cloud Computing",
// ];

// const BrandName = [];

// interface FormData {
//   name: string;
//   email: string;
//   password: string; // Assuming you want to keep this for later use
//   category: string;
//   subcategory: string;
//   brandTags: string;
//   country: string; // Add country field
//   agree: boolean; // Checkbox field
// }

// const FormStep1: React.FC = () => {
//   const methods = useForm<FormData>({
//     mode: "onBlur", // Validate on blur
//   });

//   const router = useRouter();

//   const [countries, setCountries] = useState<string[]>([]);
//   const [categories, setCategories] = useState<{ name: string; subcategories: string[] }[]>([]);
//   const [subCategories, setSubCategories] = useState<string[]>([]);

//   useEffect(() => {
//     const fetchCountries = async () => {
//       const { data, error } = await supabase
//         .from('countries')
//         .select('name'); // Adjust the column name as needed

//       if (error) {
//         console.error(error);
//       } else {
//         setCountries(data.map((item: any) => item.name));
//       }
//     };

//     const fetchCategories = async () => {
//       const { data, error } = await supabase
//         .from('categories')
//         .select('name, subcategories'); // Adjust the column names as needed

//       if (error) {
//         console.error(error);
//       } else {
//         setCategories(data);
//       }
//     };

//     fetchCountries();
//     fetchCategories();
//   }, []);

//   const onSubmit: SubmitHandler<FormData> = (data) => {
//     console.log(data);
//     // Navigate to the next step
//     router.push("/steps/2");
//   };

//   return (
//     <FormProvider {...methods}>
//       <form
//         onSubmit={methods.handleSubmit(onSubmit)}
//         className="space-y-4 py-6 grid"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="col-span-1 md:col-span-1">
//             <InputStep1
//               data={BrandName}
//               label="Brand/Organisation Name"
//               fieldName="name"
//               {...methods.register("name", { required: "Input is empty" })}
//               error={methods.formState.errors.name}
//             />
//             {methods.formState.errors.name && (
//               <p className="text-red-500 text-xs pt-1">
//                 {methods.formState.errors.name.message}
//               </p>
//             )}
//           </div>
//           <div className="col-span-1 md:col-span-1">
//             <InputStep1
//               data={countries}
//               label="Country"
//               fieldName="country"
//               {...methods.register("country", { required: "Input is empty" })}
//               error={methods.formState.errors.country}
//             />
//             {methods.formState.errors.country && (
//               <p className="text-red-500 text-xs pt-1">
//                 {methods.formState.errors.country.message}
//               </p>
//             )}
//           </div>
//         </div>

//         <p className="text-light1 font-light">
//           Select the primary category that best describes your brand or
//           organization. Then select the subcategory that further defines your
//           brand or organization.
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="col-span-1 md:col-span-1">
//             <InputStep1
//               data={categories.map(cat => cat.name)} // Use category names
//               label="Category"
//               fieldName="category"
//               {...methods.register("category", { required: "Input is empty" })}
//               error={methods.formState.errors.category}
//             />
//             {methods.formState.errors.category && (
//               <p className="text-red-500 text-xs pt-1">
//                 {methods.formState.errors.category.message}
//               </p>
//             )}
//           </div>
//           <div className="col-span-1 md:col-span-1">
//             <InputStep1
//               data={subCategories}
//               label="Subcategory"
//               fieldName="subcategory"
//               {...methods.register("subcategory", {
//                 required: "Input is empty",
//               })}
//               error={methods.formState.errors.subcategory}
//             />
//             {methods.formState.errors.subcategory && (
//               <p className="text-red-500 text-xs pt-1">
//                 {methods.formState.errors.subcategory.message}
//               </p>
//             )}
//           </div>
//         </div>

//         <BrandInput
//           data={BrandItems}
//           label="Brands"
//           fieldName="brandTags"
//           {...methods.register("brandTags", { required: "Input is empty" })}
//           error={methods.formState.errors.brandTags}
//         />
//         {methods.formState.errors.brandTags && (
//           <p className="text-red-500 text-xs pt-1">
//             {methods.formState.errors.brandTags.message}
//           </p>
//         )}

//         <Checkbox
//           {...methods.register("agree", { required: "You must agree to the terms" })}
//           radius="full"
//         >
//           <div className="text-xs text-gray3">
//             <span className="pe-1">I agree with the</span>
//             <Link href="#" underline="always">terms of service</Link>
//             <span className="ps-1">of 3F.</span>
//           </div>
//         </Checkbox>
//         {methods.formState.errors.agree && (
//           <p className="text-red-500 text-xs pt-1">
//             {methods.formState.errors.agree.message}
//           </p>
//         )}

//         <Button
//           type="submit"
//           color="secondary"
//           variant="solid"
//           className="font-light my-4 px-12 bg-primary mb-1 text-white rounded-lg border border-light2"
//         >
//           Continue
//         </Button>
//       </form>
//     </FormProvider>
//   );
// };

// export default FormStep1;
