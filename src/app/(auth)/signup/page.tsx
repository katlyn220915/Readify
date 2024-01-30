import React, { Suspense } from "react";

import SignupForm from "@/components/auth/SignupForm/SignupForm";
import { Header } from "@/components/auth/Header/Header";

import Loading from "../loading";

export default function Signup() {
  return (
    <Suspense fallback={<Loading />}>
      <Header mode="signUp" />
      <SignupForm />
    </Suspense>
  );
}
