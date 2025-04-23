"use client";

import { signInAction } from "@/lib/supabase/actions";
import Link from "next/link";
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
import { SubmitButton } from "../ui/submit-button";
import { useToastFromSearchParams } from "@/components/ui/toast";
import { Suspense } from "react";

// Componente que usa useSearchParams
function ToastHandler() {
  useToastFromSearchParams();
  return null;
}

export default function SignIn() {
  return (
    <Card className="max-w-md w-full mx-auto rounded-3xl p-4 md:p-8 shadow-input">
      <Suspense fallback={null}>
        <ToastHandler />
      </Suspense>

      <CardHeader>
        <CardTitle>
          <h1 className="text-2xl font-medium mb-3">Iniciar sesión</h1>
        </CardTitle>
        <CardDescription>
          <div className="flex justify-center"></div>
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
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Contraseña</Label>
              <Link
                className="text-xs text-foreground underline"
                href="/forgot-password"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
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
            pendingText="Ingresando..."
            formAction={async (formData) => {
              await signInAction(formData);
            }}
          >
            Iniciar sesión
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
