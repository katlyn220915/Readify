import React, { Suspense } from "react";
import type { Metadata } from "next";

import SignupForm from "@/components/auth/SignupForm/SignupForm";
import { Header } from "@/components/auth/Header/Header";

import Loading from "../loading";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function Signup() {
  return (
    <Suspense fallback={<Loading />}>
      <Header mode="signUp" />
      <SignupForm />
    </Suspense>
  );
}
