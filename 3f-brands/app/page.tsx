'use client'
import Title from "@/components/shared/Title";
import Card from "@/components/pages/start/Card";
import PushNotificationManager from "./components/PushNotificationManager";

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="flex flex-col max-w-5xl px-6 md:p-6">
        <main className=" flex items-center flex-col gap-3">
          <Title
            fontWeight="font-extrabold"
            paddingTop="pt-8"
            titleKey="home.title"
            descKey="home.description"
            title="Create your profile and take the first step towards new opportunities"
            desc="By creating your account, you'll gain access to a thriving community where brands and individuals are committed to offering you ongoing support. This support network will empower you with the resources, guidance, and connections you need to succeed, ensuring that you’re never alone on your journey."
            descSize="text-base"
          />
          <Card />
          {/* <PushNotificationManager /> */}
        </main>
      </div>
    </div>
  );
}
