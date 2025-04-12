"use server";
import { createClient } from "@/lib/supabase/server";
import { User, Membership, Attendance } from "@/types";

const getAuthenticatedUser = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    throw new Error("Usuario no autenticado");
  }
  return data.user;
};

export const getUser = async (): Promise<User> => {
  const user = await getAuthenticatedUser();
  const supabase = await createClient();
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single(); // Verifica si el usuario esta

  if (!data || data.length === 0) {
    throw new Error("Usuario no encontrado");
  }

  return data;
};

export const getUserMemberships = async (
  email: string
): Promise<Membership[]> => {
  const supabase = await createClient();
  // Obtener la membresía del usuario, junto con el nombre del gimnasio asociado
  const { data } = await supabase
    .from("memberships")
    .select("*, gyms(name, hours, is_open)")
    .eq("user_email", email)
    .order("end_date", { ascending: false });
  if (!data) {
    return [];
  }

  return data; // Aquí obtendrás la membresía con el nombre del gimnasio
};

export const getUserCheckins = async (
  memberships: number[]
): Promise<Attendance[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("attendances")
    .select("*")
    .in("membership_id", memberships)
    .order("check_in", { ascending: false });

  if (error) {
    console.error("Error al obtener las asistencias:", error.message);
    return [];
  }

  return data;
};
