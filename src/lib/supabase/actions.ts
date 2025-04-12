"use server";

import { encodedRedirect } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect("error", "/", "Email and contraseña son requeridos");
  }

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/api/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/", error.message);
  } else if (
    data.user &&
    data.user.identities &&
    data.user.identities.length == 0
  ) {
    return encodedRedirect(
      "error",
      "/",
      "Ya existe un usuario asociado con este correo electrónico ."
    );
  } else {
    return encodedRedirect(
      "success",
      "/",
      "Gracias por registrarte! Por favor revisa tu correo electrónico para verificar su cuenta."
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    return encodedRedirect(
      "error",
      "/",
      "Contraseña incorrecta. Intente nuevamente."
    );
  }

  return redirect("/dashboard");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/api/auth/callback?redirect_to=/dashboard/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    return encodedRedirect(
      "error",
      "/dashboard/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    return encodedRedirect(
      "error",
      "/dashboard/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return encodedRedirect(
      "error",
      "/dashboard/reset-password",
      "Password update failed"
    );
  }

  return encodedRedirect(
    "success",
    "/dashboard/reset-password",
    "Password updated"
  );
};

export const updateEmailAction = async (formData: FormData) => {
  const supabase = await createClient();
  const email = formData.get("email")?.toString();

  if (!email) {
    return encodedRedirect(
      "error",
      "/dashboard/profile",
      "El email es requerido"
    );
  }

  const { error } = await supabase.auth.updateUser({ email: email });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/dashboard/update-email",
      "No se pudo actualizar el email"
    );
  }

  return encodedRedirect(
    "success",
    "/dashboard/update-email",
    "Email actualizado correctamente. Revisa tu correo para confirmar el cambio."
  );
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/");
};
