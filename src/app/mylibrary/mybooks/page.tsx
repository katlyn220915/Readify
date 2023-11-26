"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner/Spinner";

export default function Mybooks() {
  const { isLogin, pending } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) router.push("/");
  }, [isLogin, router]);

  return <>{pending ? <Spinner /> : <div>My books</div>}</>;
}
