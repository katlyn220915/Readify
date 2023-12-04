"use client";

import React, { useEffect, useState, useMemo } from "react";
import styles from "./page.module.css";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import useFirestore from "@/hooks/firebase_db/useFirestore";

import Spinner from "@/components/Spinner/Spinner";
import Icon from "@/components/Icon/Icon";
import Topbar from "@/components/Topbar/Topbar";
import BookList from "@/components/BookList/BookList";
import UploadFile from "@/components/UploadFile/UploadFile";

import { useAppSelector, useAppDispatch } from "@/hooks/redux/hooks";
import { bookListInitialize } from "@/lib/redux/features/bookSlice";

const tags = [
  {
    tagName: "自我成長",
    books: ["原子習慣", "心流"],
  },
];

export default function Mybooks() {
  const { isLogin, pending, user } = useAuth();
  const router = useRouter();
  const firestore = useFirestore();
  const [isLoading, setIsLoading] = useState(false);
  // const [bookList, setBookList] = useState<BookProps[]>([]);
  const { bookList } = useAppSelector((state) => state.book);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getBookList = async () => {
      setIsLoading(true);
      if (user) {
        const bookList = await firestore.getDocuments(
          `users/${user.uid}/books`
        );
        // setBookList(bookList);
        dispatch(bookListInitialize(bookList));
      }
      setIsLoading(false);
    };
    getBookList();
  }, [user]);

  // const handleAddBook = (newBook: BookProps) => {
  //   setBookList((books) => [...books, newBook]);
  // };

  return (
    <>
      <div className={styles.container}>
        <Topbar />
        {bookList !== undefined && !isLoading && (
          <BookList bookList={bookList} />
        )}
        {isLoading && <Spinner />}
      </div>
      <UploadFile />
    </>
  );
}
