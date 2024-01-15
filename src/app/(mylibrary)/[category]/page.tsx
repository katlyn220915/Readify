"use client";

import React, { useEffect, useState, useCallback } from "react";
import styles from "./page.module.css";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";

/* COMPONENTS */
import Topbar from "@/components/Topbar/Topbar";
import BookList from "@/components/BookList/BookList";
import Spinner from "@/components/Spinner/Spinner";
import StaticSidebarList from "@/components/StaticSidebarList/StaticSidebarList";
import UploadFile from "@/components/UploadFile/UploadFile";

/* CUSTOM HOOKS */
import { useAuth } from "@/context/AuthContext";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import { bookListInitialize } from "@/lib/redux/features/bookSlice";

export default function Category() {
  const [isLoading, setIsLoading] = useState(false);
  const category = usePathname().split("/").pop();
  const params = useSearchParams();
  const tag = params.get("tag");

  const dispatch = useAppDispatch();
  const { bookList } = useAppSelector((state) => state.book);
  const { user } = useAuth();

  //Solve the dispatch in effect dependency array problem
  const dispatchCallback = useCallback(dispatch, [dispatch]);
  const firestoreCallback = useCallback(useFirestore, [useFirestore]);

  useEffect(() => {
    const getBookList = async () => {
      try {
        setIsLoading(true);
        let bookList;
        if (!tag && category) {
          bookList = await firestoreCallback().searchByQuery(
            `/users/${user.uid}/books`,
            "category",
            "==",
            category
          );
        } else {
          bookList = await firestoreCallback().searchByQuery(
            `/users/${user.uid}/books`,
            "tags",
            "array-contains",
            tag
          );
        }
        dispatchCallback(bookListInitialize(bookList));
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    getBookList();
  }, [user, dispatchCallback, firestoreCallback, category, dispatch, tag]);

  return (
    <>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Image
            src="/image/Readify.png"
            alt="readify logo"
            width={70}
            height={70}
          />
          <StaticSidebarList />
        </nav>
        <section className={styles.middle_container}>
          <Topbar />
          {isLoading && <Spinner />}
          {!isLoading && bookList.length === 0 && (
            <p className={styles.empty_hint}>
              Ooops...! There is no book in this category!
            </p>
          )}
          {!isLoading && bookList.length > 0 && (
            <BookList bookList={bookList} />
          )}
        </section>
      </div>
      <UploadFile />
    </>
  );
}
