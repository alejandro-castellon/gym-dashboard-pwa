import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProfileData from "@/components/profile";
import { User } from "@/types";
import { getUser } from "@/lib/supabase/data";
import { FormMessage, Message } from "@/components/auth/form-message";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perfil",
};

export default async function Profile(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  const user: User = await getUser();
  return (
    <Card className="md:w-2/5">
      <CardHeader>
        <CardTitle>Mi información</CardTitle>
        <CardDescription>Aqui podras editar tu información.</CardDescription>
      </CardHeader>
      <ProfileData user={user} />
      <CardFooter>
        <FormMessage message={searchParams} />
      </CardFooter>
    </Card>
  );
}
