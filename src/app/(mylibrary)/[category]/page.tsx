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
import Link from "next/link";
import ActionIcon from "@/components/ActionIcon/ActionIcon";
import { faGear } from "@fortawesome/free-solid-svg-icons";

export default function Category() {
  const [isLoading, setIsLoading] = useState(false);
  const category = usePathname().split("/").pop();
  const params = useSearchParams();
  const tag = params.get("tag");
  const tagId = params.get("id");

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
            {
              id: tagId,
              name: tag,
            }
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
  }, [
    user,
    dispatchCallback,
    firestoreCallback,
    category,
    dispatch,
    tag,
    tagId,
  ]);

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
            <div>
              <ActionIcon
                iconProp={faGear}
                promptText="Account settings"
                position="right"
              />
            </div>
          </div>
        </aside>
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
