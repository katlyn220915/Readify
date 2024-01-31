import React, { Suspense } from "react";
import type { Metadata } from "next";

import SigninForm from "@/components/auth/SigninForm/SigninForm";
import { Header } from "@/components/auth/Header/Header";

import Loading from "../loading";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function Signin() {
  return (
    <Suspense fallback={<Loading />}>
      <Header mode="signIn" />
      <SigninForm />
    </Suspense>
  );
}
