"use client";

import React, { useEffect } from "react";
import styles from "./page.module.css";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Mybooks() {
  const { isLogin, pending } = useAuth();
  const router = useRouter();

  return (
    <>
      <main className={styles.main}>
        <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
      </main>
    </>
  );
}
