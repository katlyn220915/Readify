"use client";

import React from "react";
import style from "./navbar.module.css";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import useFirebaseAuth from "@/hooks/firebase_auth/useFirebaseAuth";

import Logo from "@/components/Logo/Logo";
import ButtonNormal from "@/components/ButtonNormal/ButtonNormal";
import ButtonCta from "@/components/ButtonCta/ButtonCta";

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
    <nav className={`container ${style.navigation}`}>
      <Logo />
      {!isLogin && (
        <ButtonCta color="blue">
          <Link href="./signin">Sign in</Link>
        </ButtonCta>
      )}
      {isLogin && (
        <div className={style.nav_list}>
          <span>Hi, {currentUserName}!</span>
          <ButtonNormal onClick={handleSignout}>Sign out</ButtonNormal>
        </div>
      )}
    </nav>
  );
}
