"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./BookList.module.css";

import BookListProps from "@/types/BookListProps";
import BookProps from "@/types/BookProps";
import Categorize from "../Categorize/Categorize";

function Book({ book }: { book: BookProps }) {
  const [isMouseEnter, setIsMouseEnter] = useState(true);

  return (
    <li
      className={`${styles.book}`}
      onMouseEnter={() => {
        setIsMouseEnter(true);
      }}
      onMouseLeave={() => {
        setIsMouseEnter(false);
      }}
    >
      <div className={styles.img_container}>
        <Image
          src={book.img}
          alt={`Book-${book.title}`}
          width={80}
          height={80}
        />
      </div>
      <div className={styles.book_intro}>
        <h3>{book.title}</h3>
        <div className={styles.book_row}>
          <p className={styles.author}>作者：{book.author}</p>
          {book.tags.map((tag, id) => (
            <span key={`${id}+ ${book.id}`} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <Categorize isMouseEnter={isMouseEnter} />
    </li>
  );
}

export default function BookList({ bookList }: BookListProps) {
  return (
    <ul className={styles.books}>
      {bookList.map((book) => (
        <Book book={book} key={book.id} />
      ))}
    </ul>
  );
}
