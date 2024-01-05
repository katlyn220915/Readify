"use client";

import React, { useEffect, useCallback, useState } from "react";
import styles from "./Notebook.module.css";

import { useAuth } from "@/context/AuthContext";
import { useAppSelector, useAppDispatch } from "@/hooks/redux/hooks";
import { setHighlight } from "@/lib/redux/features/noteSlice";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import Highlight from "../Highlight/Highlight";

export default function Notebook({
  isNotebookOpen,
}: {
  isNotebookOpen: boolean;
}) {
  const firestoreMemo = useCallback(useFirestore, [useFirestore]);
  const { user } = useAuth();
  const { currentCategory, currentBook } = useAppSelector(
    (state) => state.read
  );
  const { highlightList } = useAppSelector((state) => state.note);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getHighlightData = async () => {
      console.log(currentBook, currentCategory);
      if (user && currentBook && currentCategory) {
        const firestore = firestoreMemo();
        const data = await firestore.getDocuments(
          `/users/${user.uid}/${currentCategory}/${currentBook?.bookId}/highlights`
        );
        console.log("獲取到資料：", data);
        if (data) {
          dispatch(setHighlight(data));
        }
      }
    };

    getHighlightData();
  }, [user, currentCategory, currentBook, firestoreMemo, dispatch]);

  return (
    <div
      className={`${styles.container} ${
        !isNotebookOpen ? styles.notebook_close : ""
      }`}
    >
      <div className={styles.title}>highlights</div>
      <div className={styles.highlight_list}>
        {highlightList &&
          highlightList.map((highlight) => (
            <Highlight key={highlight.id} highlight={highlight}></Highlight>
          ))}
      </div>
    </div>
  );
}
