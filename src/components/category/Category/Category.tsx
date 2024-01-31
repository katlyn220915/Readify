"use client";

import React, { Suspense, useEffect } from "react";
import styles from "./Category.module.css";
import { useParams, useSearchParams, redirect } from "next/navigation";

/* COMPONENTS */
import Topbar from "@/components/category/Topbar/Topbar";
import BookList from "@/components/category/BookList/BookList";
import Sidebar from "@/components/category/Sidebar/Sidebar";
import UploadFile from "@/components/category/UploadFile/UploadFile";
import { SearchField } from "@/components/category/SearchField/SearchField";
import Logo from "@/components/common/Logo/Logo";
import { useAuth } from "@/context/AuthContext";
import Spinner from "@/components/common/Spinner/Spinner";

const paths = ["mylibrary", "search", "later", "archive"];

const Category = () => {
  const { user } = useAuth();
  const url = useParams<{ category: string }>();
  const path = useSearchParams();
  const tag = path.get("tag");

  if (!paths.includes(url.category)) redirect("/mylibrary");

  useEffect(() => {
    if (user === undefined) return;
    if (user === null) redirect("/signin");
  }, [user]);

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
