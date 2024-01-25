"use client";

import React from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import useFirebaseAuth from "@/hooks/firebase_auth/useFirebaseAuth";

import Logo from "@/components/Common/Logo/Logo";
import ButtonCta from "@/components/Common/ButtonCta/ButtonCta";

export default function Navbar() {
  const firebaseAuth = useFirebaseAuth();
  const { currentUserName, isLogin, setIsLogin } = useAuth();

  const handleSignout = () => {
    try {
      firebaseAuth.userSignout();
      setIsLogin(false);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <nav className={`container ${styles.navigation}`}>
      <Logo />
      {!isLogin && (
        <ButtonCta color="blue">
          <Link href="./signin">Sign in</Link>
        </ButtonCta>
      )}
      {isLogin && (
        <div className={styles.nav_list}>
          <span>Hi, {currentUserName}!</span>
          <button className={styles.btn} onClick={handleSignout}>
            Sign out
          </button>
        </div>
      )}
    </nav>
  );
}
