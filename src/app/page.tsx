"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

export default function Home() {
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
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Inicia sesión</h1>
      <input
        type="email"
        className="border p-2 rounded w-72"
        placeholder="Tu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="border p-2 rounded w-72"
        placeholder="Tu contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white p-2 rounded mt-2 w-72 hover:cursor-pointer"
        disabled={loading}
      >
        {loading ? "Iniciando sesión..." : "Iniciar sesión"}
      </button>
    </div>
  );
}
