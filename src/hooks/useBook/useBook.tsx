import React, { useCallback, useEffect } from "react";
import { findChapterElement, getElementPositionY } from "@/utils/helper";
import { useAuth } from "@/context/AuthContext";
import useFirestore from "../firebase_db/useFirestore";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setPosition } from "@/lib/redux/features/bookMarkSlice";

export default function useBook() {
  const { currentBook } = useAppSelector((state) => state.read);
  const { user } = useAuth();
  const firestore = useFirestore();
  const dispatch = useAppDispatch();

  const storeBookMark = (indicator: HTMLElement) => {
    try {
      console.log(indicator);
      const { chapterID } = findChapterElement(indicator);
      const chapterEl = document.getElementById(chapterID);
      if (chapterEl && currentBook) {
        const targetIndex = Array.from(chapterEl.children).indexOf(indicator);
        console.log(Array.from(chapterEl.children));
        console.log(chapterID);
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
  };
}
