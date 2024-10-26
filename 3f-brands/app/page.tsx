'use client';
import { createClient } from "@/utils/supabase/server";
import Title from "@/components/shared/Title";
import Card from "@/components/pages/start/Card";
import NavigationBar from "@/components/shared/navbar/Navbar";



export default async function Index() {


  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <NavigationBar />

      <div className="flex-1 flex flex-col gap-20 max-w-5xl px-6 md:p-6">
        <main className="flex-1 flex items-center flex-col gap-6">
          <Title title="Create your profile and take the first step towards new opportunities" 
          desc="By creating your account, you'll gain access to a thriving community where brands and individuals are committed to offering you ongoing support. This support network will empower you with the resources, guidance, and connections you need to succeed, ensuring that you’re never alone on your journey."/>
          <Card />
          
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}
