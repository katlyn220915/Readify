import React, { useCallback, useEffect, useState } from "react";
import { findChapterElement, getElementPositionY } from "@/utils/helper";
import { useAuth } from "@/context/AuthContext";
import useFirestore from "../firebase_db/useFirestore";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setPosition } from "@/lib/redux/features/bookMarkSlice";
import BookProps from "@/types/BookProps";

export default function useBook() {
  const { currentBook } = useAppSelector((state) => state.read);
  const [books, setBooks] = useState<BookProps[]>([]);
  const {
    user: { uid },
  } = useAuth();
  const firestore = useFirestore();
  const firestoreCached = useCallback(useFirestore, [useFirestore]);

  useEffect(() => {
    const getBooks = async () => {
      const books = await firestoreCached().getDocuments(`/users/${uid}/books`);
      setBooks(books);
    };
    getBooks();
  }, [uid, firestoreCached]);

  const storeBookMark = (indicator: HTMLElement) => {
    try {
      const { chapterID } = findChapterElement(indicator);
      const chapterEl = document.getElementById(chapterID);
      if (chapterEl && currentBook) {
        const targetIndex = Array.from(chapterEl.children).indexOf(indicator);
        firestore.updateDocument(`/users/${uid}/books`, currentBook?.bookId, {
          bookMark: {
            chapter: chapterID,
            index: targetIndex,
          },
        });
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
