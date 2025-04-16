"use client";

import React from "react";

import Link from "next/link";

import ButtonCta from "@/components/common/ButtonCta/ButtonCta";
import Navbar from "@/components/common/Navbar/Navbar";
import Spinner from "@/components/common/Spinner/Spinner";
import { useAuthContext } from "@/context";

import styles from "./page.module.css";

export default function Home() {
  const { pending, isLogin } = useAuthContext();

  return (
    <>
      {pending ? (
        <Spinner />
      ) : (
        <main className={styles.main}>
          <Navbar />
          <div className={`container ${styles.banner} `}>
            <h2 className={styles.slogan}>
              Where books come alive at your fingertips.
            </h2>
            <div className={styles.descriptions}>
              <h3 className={styles.description}>
                Read and take notes seamlessly -{" "}
              </h3>
              <h3 className={styles.description}>
                Readify helps you remember what matters.
              </h3>
            </div>
            {isLogin && (
              <ButtonCta color="green">
                <Link href="/mylibrary">Start to Read</Link>
              </ButtonCta>
            )}
          </div>
        </main>
      )}
    </>
  );
}
