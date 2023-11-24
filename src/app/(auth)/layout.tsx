import React, { Suspense } from "react";
import styles from "./layout.module.css";
import Navbar from "@/components/Navbar/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.main}>
      <Navbar />
      {children}
    </main>
  );
}
