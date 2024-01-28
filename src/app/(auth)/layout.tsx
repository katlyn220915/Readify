import React from "react";
import styles from "./layout.module.css";
import Navbar from "@/components/Common/Navbar/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.main}>
      <Navbar />
      <section className={styles.section_signup}>
        <div className={styles.container}>{children}</div>
      </section>
    </main>
  );
}
