"use client";
import React, { useState } from "react";
import styles from "./BookList.module.css";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
/* TYPE */
import { BookListProps, BookProps } from "@/types/BookListProps";

/* COMPONENT */
import Categorize from "../Categorize/Categorize";
import ActionPrompt from "../ActionPrompt/ActionPrompt";

/* THIRD-LIB */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather } from "@fortawesome/free-solid-svg-icons";

/* CUSTOM-HOOKS */
import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import { setCurrentBook } from "@/lib/redux/features/readSlice";
import { setMoreActionBtnClose } from "@/lib/redux/features/moreActionSlice";

/////////////////////////////////////////////////////////

function Book({ book }: { book: BookProps }) {
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const { isMoreActionBtnOpen, isOtherMoreActionBtnOpen } = useAppSelector(
    (state) => state.moreAction
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const arrPath = pathname.split("/");
  const category = arrPath[arrPath.length - 1];

  return (
    <li
      className={`${styles.book} ${isMouseEnter ? styles.book_active : ""}`}
      onMouseEnter={() => {
        if (!isMoreActionBtnOpen && !isOtherMoreActionBtnOpen)
          setIsMouseEnter(true);
      }}
      onMouseLeave={() => {
        if (!isMoreActionBtnOpen) setIsMouseEnter(false);
      }}
      onClick={() => {
        dispatch(setMoreActionBtnClose());
        dispatch(setCurrentBook(book));
        router.push(`${category}/read/${book.bookId}`);
      }}
    >
      <div className={styles.img_container}>
        {book.coverURL && (
          <Image
            src={book.coverURL}
            alt={`Book-${book.title}`}
            width={80}
            height={80}
          />
        )}
        {book.coverURL === null && (
          <Image
            src="/image/image-not-found.png"
            alt={`Book-${book.title}`}
            width={80}
            height={80}
          />
        )}
      </div>
      <div className={styles.book_intro}>
        <h3>{book.title}</h3>
        <div className={styles.book_row}>
          <p className={styles.author}>
            <FontAwesomeIcon icon={faFeather} className="icon" />
            <span>{book.author}</span>
          </p>
          {/* {book.tags.map((tag, id) => (
            <span key={`${id}+ ${book.bookId}`} className={styles.tag}>
            {tag}
            </span>
          ))} */}
        </div>
      </div>
      <Categorize isMouseEnter={isMouseEnter} book={book} />
    </li>
  );
}

export default function BookList({ bookList }: BookListProps) {
  const { isError, isSuccessful } = useAppSelector((state) => state.book);
  return (
    <>
      <ul className={styles.books}>
        {bookList.map((book) => (
          <Book book={book} key={book.bookId} />
        ))}
      </ul>

      <ActionPrompt
        isError={isError}
        errorMes={isError ? "Delete file fail" : ""}
        isSuccessful={isSuccessful}
        successfulMes={isSuccessful ? "Delete successfully" : ""}
      />
    </>
  );
}
