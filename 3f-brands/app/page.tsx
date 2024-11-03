
import { createClient } from "@/utils/supabase/server";
import Title from "@/components/shared/Title";
import Card from "@/components/pages/start/Card";
import NavigationBar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";



export default async function Index() {


  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
       

      <div className="flex-1 flex flex-col  max-w-5xl px-6 md:p-6">
        <main className="flex-1 flex items-center flex-col gap-3">
          <Title title="Create your profile and take the first step towards new opportunities" 
          desc="By creating your account, you'll gain access to a thriving community where brands and individuals are committed to offering you ongoing support. This support network will empower you with the resources, guidance, and connections you need to succeed, ensuring that you’re never alone on your journey."
          descSize="text-base"
          />
          <Card />
          
        </main>
      </div>

    </div>
  );
}
