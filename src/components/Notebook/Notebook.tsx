"use client";

import React, { useEffect, useCallback, useState } from "react";
import styles from "./Notebook.module.css";

import { useAuth } from "@/context/AuthContext";
import { useAppSelector, useAppDispatch } from "@/hooks/redux/hooks";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import Highlight from "../Highlight/Highlight";
import { usePathname } from "next/navigation";
import { resetNotes } from "@/lib/redux/features/noteSlice";

export default function Notebook({
  isNotebookOpen,
}: {
  isNotebookOpen: boolean;
}) {
  const arrPath = usePathname().split("/");
  const category = arrPath[1];
  const bookId = arrPath[arrPath.length - 1];

  const firestoreMemo = useCallback(useFirestore, [useFirestore]);
  const { user } = useAuth();
  const { currentCategory, currentBook } = useAppSelector(
    (state) => state.read
  );
  const { highlightList } = useAppSelector((state) => state.note);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetNotes());
    };
  }, [dispatch]);
  console.log(highlightList);

  return (
    <div
      className={`${styles.container} ${
        !isNotebookOpen ? styles.notebook_close : ""
      }`}
    >
      <div className={styles.title}>highlights</div>
      <div className={styles.highlight_list}>
        {highlightList &&
          highlightList.map(({ id, markerColor, text, note }) => (
            <Highlight
              key={id}
              id={id}
              markerColor={markerColor}
              text={text}
              note={note}
            ></Highlight>
          ))}
      </div>
    </div>
  );
}
