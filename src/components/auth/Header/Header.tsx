import React from "react";

import Image from "next/image";

import styles from "./Header.module.css";

export const Header = ({ mode }: { mode: "signIn" | "signUp" }) => {
  return (
    <div className={styles.header}>
      <Image
        src="/image/Readify.png"
        alt="logo"
        width={50}
        height={50}
        priority={true}
      />
      <div>
        <h3 className="font-strong">
          {mode === "signIn" ? "Welcome back!" : "Sign up"}
        </h3>
        <p>
          {mode === "signIn"
            ? "Sign in to use your account"
            : "Create an account to continue"}
        </p>
      </div>
    </div>
  );
};
