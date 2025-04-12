"use client";

import { signUpAction } from "@/lib/supabase/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Google from "@/components/auth/google";
import { SubmitButton } from "../ui/submit-button";
import { useToastFromSearchParams } from "@/components/ui/toast";

export default function SignUp() {
  useToastFromSearchParams();
  return (
    <Card className="max-w-md w-full mx-auto rounded-3xl p-4 md:p-8 shadow-input">
      <CardHeader>
        <CardTitle>
          <h1 className="text-2xl font-medium mb-3">Crea tu cuenta</h1>
        </CardTitle>
        <CardDescription>
          <div className="flex justify-center">
            <Google />
          </div>
        </CardDescription>
      </CardHeader>
      <div className="flex items-center justify-center my-4">
        <div className="w-full h-px bg-neutral-300 dark:bg-neutral-700" />
        <span className="mx-4 text-sm text-neutral-500 dark:text-neutral-400">
          o
        </span>
        <div className="w-full h-px bg-neutral-300 dark:bg-neutral-700" />
      </div>
      <CardContent>
        <form className="space-y-6">
          <LabelInputContainer>
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              name="email"
              placeholder="clubmember@ejemplo.com"
              type="email"
              required
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              required
            />
          </LabelInputContainer>

          <SubmitButton
            className="text-white rounded-md h-10 w-full font-medium hover:cursor-pointer"
            pendingText="Creando cuenta..."
            formAction={async (formData) => {
              await signUpAction(formData);
            }}
          >
            Crear cuenta
          </SubmitButton>
        </form>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />
      </CardContent>
    </Card>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
