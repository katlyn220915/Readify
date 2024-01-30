"use client";

import React from "react";
import styles from "./page.module.css";
import { useParams, useSearchParams } from "next/navigation";

/* COMPONENTS */
import Topbar from "@/components/category/Topbar/Topbar";
import BookList from "@/components/category/BookList/BookList";
import Sidebar from "@/components/category/Sidebar/Sidebar";
import UploadFile from "@/components/category/UploadFile/UploadFile";
import { SearchField } from "@/components/category/SearchField/SearchField";
import Logo from "@/components/common/Logo/Logo";

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
            <Sidebar />
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
