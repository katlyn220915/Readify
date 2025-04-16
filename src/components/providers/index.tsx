"use client";

import { AuthProvider } from "@/context";
import StoreProvider from "@/lib/redux/StoreProvider";

import AuthGuard from "../auth/AuthGuard";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthGuard>
        <StoreProvider>{children}</StoreProvider>
      </AuthGuard>
    </AuthProvider>
  );
}
