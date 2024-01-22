"use client";

import React, {
  useEffect,
  useCallback,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import styles from "./Notebook.module.css";

import { useAuth } from "@/context/AuthContext";
import { useAppSelector, useAppDispatch } from "@/hooks/redux/hooks";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import Highlight from "../Highlight/Highlight";
import { usePathname } from "next/navigation";
import { resetNotes } from "@/lib/redux/features/noteSlice";
import { useRWD } from "@/hooks/useRWD/useRWD";
import ActionIcon from "../ActionIcon/ActionIcon";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Notebook({
  isNotebookOpen,
  onSetIsNotebookOpen,
}: {
  isNotebookOpen: boolean;
  onSetIsNotebookOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const arrPath = usePathname().split("/");
  const category = arrPath[1];
  const bookId = arrPath[arrPath.length - 1];

  const firestoreMemo = useCallback(useFirestore, [useFirestore]);
  const { user } = useAuth();
  const { screenWidth } = useRWD();
  const { currentCategory, currentBook } = useAppSelector(
    (state) => state.read
  );
  const { highlightList } = useAppSelector((state) => state.note);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   return () => {
  //     dispatch(resetNotes());
  //   };
  // }, [dispatch]);

  return (
    <div
      className={`${styles.container} ${
        !isNotebookOpen ? styles.notebook_close : ""
      }`}
    >
      <div className={styles.title}>
        <span>highlights</span>
        {screenWidth < 1024 && (
          <ActionIcon
            iconProp={faXmark}
            promptText="Close notebooks"
            position="left"
            showPrompt={false}
            onAction={() => {
              onSetIsNotebookOpen(false);
            }}
          />
        )}
      </div>
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
