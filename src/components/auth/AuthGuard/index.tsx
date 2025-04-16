"use client";

import { useEffect } from "react";

import { usePathname, useRouter } from "next/navigation";

import Spinner from "@/components/common/Spinner/Spinner";
import { useAuthContext } from "@/context/AuthContext";

const publicRoutes = ["/signin", "signup", "/"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, pending, isLogin } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pending) return;

    if (!isLogin && !publicRoutes.includes(pathname)) {
      console.log("here");
      router.push("/signin");
    }
  }, [pending, pathname, router, isLogin]);

  if (pending) {
    return <Spinner />;
  }

  return <>{children}</>;
}
