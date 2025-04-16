"use client";

import React, { useCallback, useEffect, useState } from "react";

import { useParams, useSearchParams } from "next/navigation";

import ActionPrompt from "@/components/common/ActionPrompt/ActionPrompt";
import Spinner from "@/components/common/Spinner/Spinner";
import { useAuthContext } from "@/context";
/* CUSTOM-HOOKS */
import useFirestore from "@/hooks/firebase_db/useFirestore";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import { bookListInitialize } from "@/lib/redux/features/bookSlice";
/* TYPE */
import BookProps from "@/types/BookProps";

/* COMPONENT */
import Book from "../Book/Book";
import styles from "./BookList.module.css";

/////////////////////////////////////////////////////////

export default function BookList() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeBookId, setActiveBookId] = useState<string | null>(null);
  const [activeListId, setActiveListId] = useState<string | null>(null);

  const url = useParams<{ category: string }>();
  const params = useSearchParams();
  const tag = params.get("tag");
  const tagId = params.get("id");

  const { isError, isSuccessful, bookList } = useAppSelector(
    (state) => state.book
  );
  const { isUploadSuccessful } = useAppSelector((state) => state.upload);
  const { user } = useAuthContext();
  const firestoreCached = useCallback(useFirestore, [useFirestore]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getBookList = async () => {
      if (!user) return;
      try {
        setIsLoading(true);
        let data;
        if (!tag && url.category) {
          data = await firestoreCached().searchByQuery(
            `/users/${user.uid}/books`,
            "category",
            "==",
            url.category
          );
        } else {
          data = await firestoreCached().searchByQuery(
            `/users/${user.uid}/books`,
            "tags",
            "array-contains",
            {
              id: tagId,
              name: tag,
            }
          );
        }
        dispatch(bookListInitialize(data));
      } catch (e) {
        console.error("BookList component error :", e);
      } finally {
        setIsLoading(false);
      }
    };
    getBookList();
  }, [user, firestoreCached, tag, tagId, url.category, dispatch]);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && bookList.length <= 0 && url.category === "mylibrary" && (
        <p className={styles.prompt}>
          Start to upload your epub file by clicking the button on the right
          corner !
        </p>
      )}
      {!isLoading &&
        bookList.length <= 0 &&
        url.category !== "mylibrary" &&
        url.category !== "search" && (
          <p className={styles.prompt}>
            Ooops...! There is no book in this category!
          </p>
        )}
      {!isLoading && bookList.length > 0 && (
        <ul className={styles.books}>
          {bookList.map((book: BookProps) => (
            <Book
              book={book}
              key={book.bookId}
              activeBookId={activeBookId}
              onActiveBook={setActiveBookId}
              activeListId={activeListId}
              onActiveListId={setActiveListId}
            />
          ))}
          {isUploadSuccessful && <Spinner />}
        </ul>
      )}
      <ActionPrompt
        isError={isError}
        isSuccessful={isSuccessful}
        isPending={false}
      >
        {isError
          ? "Delete file fail"
          : isSuccessful
            ? "Delete successfully"
            : ""}
      </ActionPrompt>
    </>
  );
}
