"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./BookList.module.css";

/* TYPE */
import { BookListProps, BookProps } from "@/types/BookListProps";

/* COMPONENT */
import Categorize from "../Categorize/Categorize";

/* THIRD-LIB */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather } from "@fortawesome/free-solid-svg-icons";

/* CUSTOM-HOOKS */
import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";

/////////////////////////////////////////////////////////

function Book({ book }: { book: BookProps }) {
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const { isMoreActionBtnOpen, isOtherMoreActionBtnOpen } = useAppSelector(
    (state) => state.moreAction
  );

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
      <Categorize isMouseEnter={isMouseEnter} />
    </li>
  );
}

export default function BookList({ bookList }: BookListProps) {
  return (
    <>
      <ul className={styles.books}>
        {bookList.map((book) => (
          <Book book={book} key={book.bookId} />
        ))}
      </ul>
    </>
  );
}
