"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Membership} from "@/types";
import { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [membership, setMembership] = useState<Membership[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) return;
      setUser(data?.user);

      // Obtener la membresía del usuario
      const { data: membershipData } = await supabase
        .from("memberships")
        .select("*")
        .eq("user_email", data?.user.email);

      setMembership(membershipData || []); // Provide empty array fallback
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    redirect("/");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-blue-500 text-white p-2 rounded mt-2 w-72 hover:cursor-pointer"
      >
         Cerrar sesión
      </button>
      </div>
      {user ? (
        <>
          <p>Bienvenido, {user.email}</p>
          {membership.length > 0 ? (
            <div className="mt-4 p-4 border rounded bg-gray-50">
              <h2 className="text-lg font-bold">Tu Membresía</h2>
              {membership.map((membership: Membership) => (
                <div key={membership.id}>
                  <p>Gimnasio: {membership.gym_id}</p>
                  <p>Inicio: {new Date(membership.start_date).toLocaleDateString()}</p>
                  <p>Fin: {new Date(membership.end_date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No tienes una membresía activa.</p>
          )}
        </>
      ) : (
        <p>No has iniciado sesión.</p>
      )}
    </div>
  );
}
