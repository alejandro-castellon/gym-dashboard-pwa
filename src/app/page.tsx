import SignIn from "@/components/auth/sign-in";
import SignUp from "@/components/auth/sign-up";
import { Tabs } from "@/components/ui/tabs";

export default function Home() {
  const tabs = [
    {
      title: "Iniciar Sesión",
      value: "signin",
      content: (
        <SignIn />
      ),
    },
    {
      title: "Registrarse",
      value: "signup",
      content: (
        <SignUp />
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] mt-6 [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-center justify-center">
      <Tabs tabs={tabs} />
    </div>
  );
}
