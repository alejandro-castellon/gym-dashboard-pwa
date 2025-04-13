"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export function useToastFromSearchParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  // Usar una ref para rastrear los mensajes ya mostrados
  const processedMessages = useRef(new Set());

  useEffect(() => {
    const type = searchParams.get("type");
    const message = searchParams.get("message");

    if (!type || !message) return;

    // Crear una clave única para este toast
    const toastKey = `${type}:${message}`;

    // Verificar si ya hemos mostrado este toast exacto
    if (processedMessages.current.has(toastKey)) {
      return;
    }

    // Registrar que este mensaje ya fue procesado
    processedMessages.current.add(toastKey);

    // Mostrar el toast
    const showToast = {
      success: () =>
        toast.success("Success", {
          description: message,
          id: toastKey, // Usar un ID único para evitar duplicados
        }),
      error: () =>
        toast.error("Error", {
          description: message,
          id: toastKey, // Usar un ID único para evitar duplicados
        }),
    };

    // Mostrar el toast solo si existe el tipo
    if (showToast[type as keyof typeof showToast]) {
      showToast[type as keyof typeof showToast]();

      // Limpiar los parámetros después de un pequeño retraso
      setTimeout(() => {
        // Solo limpiar si los parámetros siguen siendo los mismos
        if (
          searchParams.get("type") === type &&
          searchParams.get("message") === message
        ) {
          const cleanedParams = new URLSearchParams(searchParams);
          cleanedParams.delete("type");
          cleanedParams.delete("message");

          const newPath = cleanedParams.toString()
            ? `${window.location.pathname}?${cleanedParams.toString()}`
            : window.location.pathname;

          router.replace(newPath, {
            scroll: false,
          });
        }
      }, 100);
    }
  }, [searchParams, router]);
}
