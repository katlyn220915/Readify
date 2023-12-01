"use client";

import React from "react";
import styles from "./layout.module.css";
import Image from "next/image";

import SidebarList from "@/components/StaticSidebarList/StaticSidebarList";
import Icon from "@/components/Icon/Icon";
import UploadFile from "@/components/UploadFile/UploadFile";

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
        <ul>
          <li></li>
        </ul>
      </nav>
      <section className={styles.middle_container}>{children}</section>
      <UploadFile />
    </div>
  );
}
