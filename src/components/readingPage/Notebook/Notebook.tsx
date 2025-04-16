"use client";

import React, { Dispatch, SetStateAction, useEffect } from "react";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

import ActionIcon from "@/components/common/ActionIcon/ActionIcon";
import { useAuthContext } from "@/context";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import { useRWD } from "@/hooks/useRWD/useRWD";
import { resetNotes } from "@/lib/redux/features/noteSlice";

import Highlight from "../Highlight/Highlight";
import styles from "./Notebook.module.css";

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

  const { user } = useAuthContext();
  const { screenWidth } = useRWD();
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

  return (
    <div
      className={`${styles.container} ${
        !isNotebookOpen ? styles.notebook_close : ""
      }`}
    >
      <div className={styles.title}>
        <span>highlights</span>
        <ActionIcon
          iconProp={faXmark}
          promptText="Close notebooks"
          position="left"
          showPrompt={false}
          onAction={() => {
            onSetIsNotebookOpen(false);
          }}
        />
      </div>
      <div className={styles.highlight_list}>
        {highlightList &&
          highlightList.map(({ id, markerColor, text, note, chapter }) => (
            <Highlight
              key={id}
              id={id}
              markerColor={markerColor}
              text={text}
              note={note}
              chapter={chapter}
            ></Highlight>
          ))}
      </div>
    </div>
  );
}
