import React, { Suspense } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import SigninForm from "@/components/SigninForm/SigninForm";
import Loading from "../loading";

export default function Signin() {
  return (
    <Suspense fallback={<Loading />}>
      <div className={styles.container}>
        <div className={styles.topbar}>
          <Image
            src="/image/logo-light.png"
            alt="logo"
            width={80}
            height={60}
            priority={true}
          />
          <div>
            <h3 className="font-strong">Welcome back!</h3>
            <p>Sign in to use your account</p>
          </div>
        </div>
        <SigninForm />
      </div>
    </Suspense>
  );
}
