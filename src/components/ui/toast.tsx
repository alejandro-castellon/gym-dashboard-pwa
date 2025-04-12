"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export function useToastFromSearchParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const type = searchParams.get("type");
    const message = searchParams.get("message");

    if (type === "error") {
      toast.error("Error", {
        description: message,
      });
      router.replace(window.location.pathname);
    } else if (type === "success") {
      toast.success("Success", {
        description: message,
      });
      router.replace(window.location.pathname);
    }
  }, [searchParams, router]);
}
