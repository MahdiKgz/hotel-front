"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { LuRefreshCw } from "react-icons/lu";
import { getSafeAuthRedirect } from "@/shared/configs/authRedirect";

export default function AuthAccessBoundary({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isRecoveryLink = pathname === "/verify-email" || pathname === "/reset-password";
  const [access, setAccess] = useState<"checking" | "guest">("checking");

  useEffect(() => {
    if (isRecoveryLink) return;
    const timer = window.setTimeout(() => {
      if (!sessionStorage.getItem("authToken")) {
        setAccess("guest");
        return;
      }

      const requested = new URLSearchParams(window.location.search).get("redirect");
      router.replace(getSafeAuthRedirect(requested, "/"));
    }, 0);

    return () => window.clearTimeout(timer);
  }, [isRecoveryLink, router]);

  if (isRecoveryLink) return children;

  if (access === "checking") {
    return (
      <main className="auth-route-checking">
        <LuRefreshCw />
        <strong>در حال بررسی حساب شما…</strong>
      </main>
    );
  }

  return children;
}
