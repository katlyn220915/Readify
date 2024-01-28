import React, { Suspense } from "react";

import SigninForm from "@/components/Auth/SigninForm/SigninForm";
import { Header } from "@/components/Auth/Header/Header";

import Loading from "../loading";

export default function Signin() {
  return (
    <Suspense fallback={<Loading />}>
      <Header mode="signIn" />
      <SigninForm />
    </Suspense>
  );
}
