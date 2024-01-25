import React from "react";
import styles from "./Highlight.module.css";
import { useParams } from "next/navigation";

import NoteForm from "../NoteForm/NoteForm";
import ActionIcon from "@/components/Common/ActionIcon/ActionIcon";

import { useAppSelector, useAppDispatch } from "@/hooks/redux/hooks";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import { useAuth } from "@/context/AuthContext";

import {
  deleteHighlight,
  setIsEditNoteFieldOpen,
} from "@/lib/redux/features/noteSlice";
import { setCurrentChapter } from "@/lib/redux/features/readSlice";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { findChapterElement, scrollIntoScreen } from "@/utils/helper";
import highlightHelper from "@/utils/highlightHelper";

export default function Highlight({
  id,
  markerColor,
  note,
  text,
  chapter,
}: {
  id: string;
  markerColor: string;
  note: string;
  text: string;
  chapter: string;
}) {
  const { editNoteFieldOpen } = useAppSelector((state) => state.note);
  const params = useParams<{ category: string; bookId: string }>();
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const firestore = useFirestore();

  return (
    <div
      className={styles.highlight}
      data-note-id={id}
      onClick={(e) => {
        const target = document.querySelector(
          `[data-highlight-id="${id}"]`
        ) as HTMLElement;

        dispatch(setIsEditNoteFieldOpen(id));
        if (target) {
          const { chapterID } = findChapterElement(target);
          scrollIntoScreen(target, "center");
          dispatch(setCurrentChapter(chapterID));
        }
      }}
    >
      <div className={`${styles.btn_delete_wrapper}`}>
        <ActionIcon
          iconProp={faXmark}
          promptText="Delete this highlight"
          position="top"
          showPrompt={false}
          onAction={() => {
            try {
              dispatch(deleteHighlight(id));
              const highlight = highlightHelper();
              highlight.deleteHighlight(id);
              firestore.deleteColumn(
                `users/${user.uid}/books/${params.bookId}/highlights`,
                chapter,
                id
              );
            } catch (e) {
              console.error(e);
            }
          }}
        />
      </div>
      <span
        style={{ backgroundColor: `var(--color-${markerColor})` }}
        className={styles.highlight_text}
      >
        {text}
      </span>
      {note && editNoteFieldOpen !== id && (
        <div>
          <span>{note}</span>
        </div>
      )}
      {note && editNoteFieldOpen !== false && editNoteFieldOpen === id && (
        <div className={styles.note_form}>
          <NoteForm currentHighlightId={id} note={note} />
        </div>
      )}
    </div>
  );
}
