import React from "react";

import Navbar from "@/components/common/Navbar/Navbar";

import styles from "./layout.module.css";

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
