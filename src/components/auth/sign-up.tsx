"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Google from "@/components/auth/google";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else {setLoading(false); redirect("/dashboard");
    }
  };

  return (
      <Card className="max-w-md w-full mx-auto rounded-3xl p-4 md:p-8 shadow-input">
        <CardHeader>
          <CardTitle><h1 className="text-2xl font-medium mb-3">Crea tu cuenta</h1></CardTitle>
          <CardDescription>{/* Botón de Google */}
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
          {/* Formulario de inicio de sesión */}
          <div className="space-y-6">
            <LabelInputContainer>
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                name="email"
                placeholder="clubmember@ejemplo.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </LabelInputContainer>

            <Button
              className="text-white rounded-md h-10 w-full font-medium"
              disabled={loading}
              onClick={handleLogin}
            >
              {loading ? "Creando cuenta..." : "Registrarse"}
            </Button>
          </div>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />
        </CardContent>
        <CardFooter className="justify-center">
        </CardFooter>
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