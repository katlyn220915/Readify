"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import ButtonCta from "@/components/ButtonCta/ButtonCta";

import { useAuth } from "@/context/AuthContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "@/lib/firebase/initialize";

export default function Home() {
  const auth = getAuth(app);
  const { setCurrentUserName, setIsLogin, isLogin } = useAuth();

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
        setCurrentUserName(user.displayName);
      } else {
        console.log("no user");
      }
    });

    return () => unsuscribe();
  }, [auth, setIsLogin, setCurrentUserName]);

  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.banner}>
        <h2 className={styles.slogan}>
          Where Books Come to Life at Your Fingertips
        </h2>
        <div className={styles.descriptions}>
          <h3 className={styles.description}>
            Read and take notes simultaneously -{" "}
          </h3>
          <h3 className={styles.description}>
            Readify helps you remeber what the books say
          </h3>
        </div>
        {isLogin && (
          <ButtonCta color="green">
            <Link href="/mylibrary/mybooks">Go to the App</Link>
          </ButtonCta>
        )}
      </div>
    </main>
  );
}
