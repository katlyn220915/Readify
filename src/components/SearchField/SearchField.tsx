"use client";

import React, { useEffect, useState } from "react";
import styles from "./SearchField.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import BookProps from "@/types/BookProps";
import useBook from "@/hooks/useBook/useBook";
import debounce from "@/utils/debounce";

export const SearchField = ({
  onSearchBook,
}: {
  onSearchBook: (keyword: string) => void;
}) => {
  const [text, setText] = useState("");
  const [searchedBookList, setSearchedBookList] = useState<BookProps[]>([]);
  const { books } = useBook();

  const handleSubmit = (e: any) => {
    e.preventDefault(e);
    if (!text || text.length <= 1) return;
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className={styles.search_field_wrapper}>
        <input
          type="text"
          value={text}
          className={styles.search_input}
          placeholder="Search books by keyword"
          onChange={(e) => {
            setText(e.target.value);
            if (e.target.value.length <= 1 || e.target.value.length === 0) {
              onSearchBook("");
              return;
            }
            onSearchBook(e.target.value);
          }}
          autoFocus
        />
      </div>
    </form>
  );
};
