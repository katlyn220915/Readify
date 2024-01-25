import React, { Suspense } from "react";

import Image from "next/image";
import styles from "./page.module.css";
import SignupForm from "@/components/Auth/SignupForm/SignupForm";
import Loading from "../loading";

export default function Signup() {
  return (
    <Suspense fallback={<Loading />}>
      <div className={styles.container}>
        <div className={styles.topbar}>
          <Image
            src="/image/Readify.png"
            alt="logo"
            width={50}
            height={50}
            priority={true}
          />
          <div>
            <h3 className="font-strong">Sign up</h3>
            <p>Create an account to continue</p>
          </div>
        </div>
        <SignupForm />
      </div>
    </Suspense>
  );
}
