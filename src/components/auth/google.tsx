"use client";

import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Google() {
  const signInGoogle = async () => {
    const redirectTo = `${window.location.origin}/api/auth/callback?redirect_to=/dashboard`;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
      },
    });

    if (error) {
      console.error("Error al iniciar sesión con Google:", error.message);
    }
  };

  return (
    <Button
      className="relative group/btn flex space-x-2 items-center px-4 w-full text-neutral-700 dark:text-neutral-300 text-sm rounded-md h-10 font-medium shadow-input bg-gray-50 hover:bg-gray-100 dark:bg-zinc-600 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
      onClick={() => signInGoogle()}
      type="button"
    >
      <Image src="/google-logo.svg" alt="Google Logo" width={25} height={25} />
      <span>Iniciar sesión con Google</span>
      <BottomGradient />
    </Button>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-green-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
