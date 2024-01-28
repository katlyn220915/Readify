import React, { Suspense } from "react";

import SignupForm from "@/components/Auth/SignupForm/SignupForm";
import { Header } from "@/components/Auth/Header/Header";

import Loading from "../loading";

export default function Signup() {
  return (
    <Suspense fallback={<Loading />}>
      <Header mode="signUp" />
      <SignupForm />
    </Suspense>
  );
}
