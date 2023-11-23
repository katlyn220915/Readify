import React from "react";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Form from "@/components/Form/Form";

export default function Signup() {
  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.topbar}>
          <Image
            src="/image/logo-light.png"
            alt="logo"
            width={80}
            height={60}
          />
          <div>
            <h3 className="font-strong">Sign up</h3>
            <p>Create an account to continue</p>
          </div>
        </div>
        <Form purpose="signup" />
        <div className={styles.guide_to_signup}>
          <Link href="/signin">Already have a Readify account? Sign in</Link>
        </div>
      </div>
    </main>
  );
}
