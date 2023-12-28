"use client";

import React, { useEffect, useState, useCallback } from "react";
import styles from "./page.module.css";
import { usePathname } from "next/navigation";
import Image from "next/image";

/* COMPONENTS */
import Topbar from "@/components/Topbar/Topbar";
import BookList from "@/components/BookList/BookList";
import Spinner from "@/components/Spinner/Spinner";
import StaticSidebarList from "@/components/StaticSidebarList/StaticSidebarList";

/* CUSTOM HOOKS */
import { useAuth } from "@/context/AuthContext";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import { bookListInitialize } from "@/lib/redux/features/bookSlice";
import UploadFile from "@/components/UploadFile/UploadFile";

export default function Category() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

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
        const bookList = await firestoreCallback().getDocuments(
          `/users/${user.uid}/${pathname.split("/").pop()}`
        );
        dispatchCallback(bookListInitialize(bookList));
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    getBookList();
  }, [user, dispatchCallback, firestoreCallback, pathname]);

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
          {isLoading ? (
            <Spinner />
          ) : bookList.length === 0 ? (
            <p>There is no book in this category</p>
          ) : (
            <BookList bookList={bookList} />
          )}
        </section>
      </div>
      <UploadFile />
    </>
  );
}
