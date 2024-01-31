"use client";
import React from "react";
import styles from "./home.module.css";

import Link from "next/link";
import Navbar from "@/components/common/Navbar/Navbar";
import ButtonCta from "@/components/common/ButtonCta/ButtonCta";
import Spinner from "@/components/common/Spinner/Spinner";

import { useAuth } from "@/context/AuthContext";

const Home = () => {
  const { isLogin, pending } = useAuth();
  return (
    <>
      {pending ? (
        <Spinner />
      ) : (
        <main className={styles.main}>
          <Navbar />
          <div className={`container ${styles.banner} `}>
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
                <Link href="/mylibrary">Start to Read</Link>
              </ButtonCta>
            )}
          </div>
        </main>
      )}
    </>
  );
};

export default Home;
