"use client";

import React, { useEffect, useState, useCallback } from "react";
import styles from "./page.module.css";

/* custom hook */
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import { useAppSelector, useAppDispatch } from "@/hooks/redux/hooks";
import { bookListInitialize } from "@/lib/redux/features/bookSlice";

/* components */
import Spinner from "@/components/Spinner/Spinner";
import Icon from "@/components/Icon/Icon";
import Topbar from "@/components/Topbar/Topbar";
import BookList from "@/components/BookList/BookList";
import UploadFile from "@/components/UploadFile/UploadFile";

const tags = [
  {
    tagName: "自我成長",
    books: ["原子習慣", "心流"],
  },
];

export default function MyLibrary() {
  const { isLogin, pending, user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { bookList } = useAppSelector((state) => state.book);
  const dispatch = useAppDispatch();

  //Solve the dispatch in effect dependency array problem
  const dispatchCallback = useCallback(dispatch, [dispatch]);
  const firestoreCallback = useCallback(useFirestore, [useFirestore]);

  useEffect(() => {
    const getBookList = async () => {
      try {
        setIsLoading(true);
        if (user) {
          const bookList = await firestoreCallback().getDocuments(
            `users/${user.uid}/mylibrary`
          );
          dispatchCallback(bookListInitialize(bookList));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    getBookList();
  }, [user, dispatchCallback, firestoreCallback]);

  return (
    <>
      <div className={styles.container}>
        <Topbar />
        {bookList.length !== 0 && !isLoading && (
          <BookList bookList={bookList} />
        )}
        {bookList.length === 0 && !isLoading && (
          <p>
            You have not upload any books yet! Click the upload button on the
            right bottom cornor to upload!
          </p>
        )}
        {isLoading && <Spinner />}
      </div>
      <UploadFile />
    </>
  );
}
