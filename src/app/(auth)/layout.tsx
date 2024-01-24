import React, { Suspense } from "react";
import styles from "./layout.module.css";
import Navbar from "@/components/Navbar/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.main}>
      <Navbar />
      <section className={styles.section_signup}>{children}</section>
    </main>
  );
}
