"use client";

import React, { useState } from "react";
import styles from "./SearchField.module.css";

import { bookListInitialize } from "@/lib/redux/features/bookSlice";
import { useAppDispatch } from "@/hooks/redux/hooks";
import useBook from "@/hooks/useBook/useBook";

export const SearchField = () => {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();
  const { books } = useBook();

  const handleSubmit = (e: any) => {
    e.preventDefault(e);
    if (!text || text.length <= 1) return;
  };

  const handleSearchBook = (keyword: string) => {
    if (keyword === "") dispatch(bookListInitialize([]));
    else
      dispatch(
        bookListInitialize(
          books.filter(
            (cur) => cur.title.includes(keyword) || cur.author.includes(keyword)
          )
        )
      );
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className={styles.search_field}>
      <div className={styles.search_field_wrapper}>
        <input
          type="text"
          value={text}
          className={styles.search_input}
          placeholder="Search books by keyword"
          onChange={(e) => {
            setText(e.target.value);
            if (e.target.value.length <= 1 || e.target.value.length === 0) {
              return;
            }
            handleSearchBook(e.target.value);
          }}
          autoFocus
        />
      </div>
    </form>
  );
};
