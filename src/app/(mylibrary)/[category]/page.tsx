"use client";

import React from "react";
import styles from "./page.module.css";

/* COMPONENTS */
import Topbar from "@/components/Category/Topbar/Topbar";
import BookList from "@/components/Category/BookList/BookList";
import StaticSidebarList from "@/components/Category/StaticSidebarList/StaticSidebarList";
import UploadFile from "@/components/Category/UploadFile/UploadFile";
import { useParams, useSearchParams } from "next/navigation";
import { SearchField } from "@/components/Category/SearchField/SearchField";
import Logo from "@/components/Common/Logo/Logo";

export default function Category() {
  const url = useParams<{ category: string }>();
  const params = useSearchParams();
  const tag = params.get("tag");

  return (
    <>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <Logo showText={false} />
          <div className={styles.sidebar_user_actions}>
            <StaticSidebarList />
          </div>
        </aside>
        <section className={styles.middle_container}>
          <Topbar />
          {url.category === "search" && !tag && <SearchField />}
          <BookList />
        </section>
      </div>
      <UploadFile />
    </>
  );
}
