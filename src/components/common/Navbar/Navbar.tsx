"use client";

import React from "react";

import Link from "next/link";

import ButtonCta from "@/components/common/ButtonCta/ButtonCta";
import Logo from "@/components/common/Logo/Logo";
import { useAuth } from "@/context/AuthContext";
import useFirebaseAuth from "@/hooks/firebase_auth/useFirebaseAuth";

import styles from "./navbar.module.css";

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
      <Logo showText={true} />
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
