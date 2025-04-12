import SignIn from "@/components/auth/sign-in";
import SignUp from "@/components/auth/sign-up";
import { Tabs } from "@/components/ui/tabs-credentials";

export default function Home() {
  const tabs = [
    {
      title: "Iniciar Sesión",
      value: "signin",
      content: <SignIn />,
    },
    {
      title: "Registrarse",
      value: "signup",
      content: <SignUp />,
    },
  ];

  return (
    <div className="p-6 mt-20">
      <Tabs tabs={tabs} />
    </div>
  );
}
