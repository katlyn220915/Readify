"use client";

import React from "react";
import styles from "./layout.module.css";
import Image from "next/image";

import SidebarList from "@/components/StaticSidebarList/StaticSidebarList";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Image
          src="/image/logo-light.png"
          alt="readify logo"
          width={70}
          height={70}
        />
        <SidebarList />
      </nav>
      <section className={styles.middle_container}>{children}</section>
    </div>
  );
}
