"use client";

import React, { useEffect, useState, useCallback } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";

/* COMPONENTS */
import Topbar from "@/components/Category/Topbar/Topbar";
import BookList from "@/components/Category/BookList/BookList";
import StaticSidebarList from "@/components/Category/StaticSidebarList/StaticSidebarList";
import UploadFile from "@/components/Category/UploadFile/UploadFile";
import { SearchField } from "@/components/Category/SearchField/SearchField";
import Spinner from "@/components/Common/Spinner/Spinner";

/* CUSTOM HOOKS */
import { useAuth } from "@/context/AuthContext";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import { bookListInitialize } from "@/lib/redux/features/bookSlice";
import useBook from "@/hooks/useBook/useBook";

export default function Category() {
  const [isLoading, setIsLoading] = useState(false);

  const { books } = useBook();
  const path = useParams<{ category: string }>();
  const params = useSearchParams();
  const tag = params.get("tag");
  const tagId = params.get("id");

  const dispatch = useAppDispatch();
  const { bookList } = useAppSelector((state) => state.book);
  const { user } = useAuth();

  //Solve the dispatch in effect dependency array problem
  const dispatchCached = useCallback(dispatch, [dispatch]);
  const firestoreCached = useCallback(useFirestore, [useFirestore]);

  useEffect(() => {
    const getBookList = async () => {
      if (!user) return;
      try {
        setIsLoading(true);
        let bookList;
        if (!tag && path.category) {
          bookList = await firestoreCached().searchByQuery(
            `/users/${user.uid}/books`,
            "category",
            "==",
            path.category
          );
        } else if (path.category === "search") {
          bookList = await firestoreCached().searchByQuery(
            `/users/${user.uid}/books`,
            "tags",
            "array-contains",
            {
              id: tagId,
              name: tag,
            }
          );
        }
        dispatchCached(bookListInitialize(bookList));
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    getBookList();
  }, [
    user,
    dispatchCached,
    firestoreCached,
    path.category,
    dispatch,
    tag,
    tagId,
  ]);

  const handleSearchBook = (keyword: string) => {
    if (keyword === "") {
      dispatchCached(bookListInitialize([]));
    } else {
      dispatchCached(
        bookListInitialize(
          books.filter(
            (cur) => cur.title.includes(keyword) || cur.author.includes(keyword)
          )
        )
      );
    }
  };

  return (
    <>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <Link href="/">
            <Image
              src="/image/Readify.png"
              alt="readify logo"
              width={70}
              height={70}
            />
          </Link>
          <div className={styles.sidebar_user_actions}>
            <StaticSidebarList />
          </div>
        </aside>
        <section className={styles.middle_container}>
          <Topbar />
          {isLoading && <Spinner />}
          {!isLoading &&
            bookList.length === 0 &&
            path.category !== "search" &&
            path.category !== "mylibrary" && (
              <p className={styles.empty_hint}>
                Ooops...! There is no book in this category!
              </p>
            )}
          {!isLoading &&
            bookList.length === 0 &&
            path.category === "mylibrary" && (
              <p className={styles.empty_hint}>
                Start to upload your epub file by clicking the button on the
                right corner !
              </p>
            )}
          {path.category === "search" && !tag && (
            <div className={styles.search_field}>
              <SearchField onSearchBook={handleSearchBook} />
            </div>
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
