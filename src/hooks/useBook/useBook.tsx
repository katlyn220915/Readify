import React, { useCallback, useEffect, useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { setPosition } from "@/lib/redux/features/bookMarkSlice";
import BookProps from "@/types/BookProps";
import { findChapterElement, getElementPositionY } from "@/utils/helper";

import useFirestore from "../firebase_db/useFirestore";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export default function useBook() {
  const { currentBook } = useAppSelector((state) => state.read);
  const [books, setBooks] = useState<BookProps[]>([]);
  const { user } = useAuth() || undefined;
  const firestore = useFirestore();
  const firestoreCached = useCallback(useFirestore, [useFirestore]);

  useEffect(() => {
    const getBooks = async () => {
      if (user) {
        const books = await firestoreCached().getDocuments(
          `/users/${user.uid}/books`
        );
        setBooks(books);
      }
    };
    getBooks();
  }, [user, firestoreCached]);

  const storeBookMark = (indicator: HTMLElement) => {
    try {
      const { chapterID } = findChapterElement(indicator);
      const chapterEl = document.getElementById(chapterID);
      if (chapterEl && currentBook) {
        const targetIndex = Array.from(chapterEl.children).indexOf(indicator);
        firestore.updateDocument(
          `/users/${user.uid}/books`,
          currentBook?.bookId,
          {
            bookMark: {
              chapter: chapterID,
              index: targetIndex,
            },
          }
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  return {
    storeBookMark,
    books,
  };
}
