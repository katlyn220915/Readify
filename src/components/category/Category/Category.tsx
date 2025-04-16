"use client";

import React, { Suspense, useEffect } from "react";

import { redirect, useParams, useSearchParams } from "next/navigation";

import BookList from "@/components/category/BookList/BookList";
import { SearchField } from "@/components/category/SearchField/SearchField";
import Sidebar from "@/components/category/Sidebar/Sidebar";
import Topbar from "@/components/category/Topbar/Topbar";
import UploadFile from "@/components/category/UploadFile/UploadFile";
import Logo from "@/components/common/Logo/Logo";
import Spinner from "@/components/common/Spinner/Spinner";

import styles from "./Category.module.css";

const paths = ["mylibrary", "search", "later", "archive"];

const Category = () => {
  const url = useParams<{ category: string }>();
  const path = useSearchParams();
  const tag = path.get("tag");

  if (!paths.includes(url.category)) redirect("/mylibrary");

  return (
    <Suspense fallback={<Spinner />}>
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
    </Suspense>
  );
};

export default Category;
