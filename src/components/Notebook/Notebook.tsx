"use client";

import React, { useEffect, useCallback, useState } from "react";
import styles from "./Notebook.module.css";

import { useAuth } from "@/context/AuthContext";
import { useAppSelector, useAppDispatch } from "@/hooks/redux/hooks";
import { setHighlight } from "@/lib/redux/features/noteSlice";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import Highlight from "../Highlight/Highlight";
import { usePathname } from "next/navigation";

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
