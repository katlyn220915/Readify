import React, { useState } from "react";
import styles from "./Highlight.module.css";
import NoteForm from "../NoteForm/NoteForm";
import { useAppSelector, useAppDispatch } from "@/hooks/redux/hooks";
import { setIsEditNoteFieldOpen } from "@/lib/redux/features/noteSlice";

export default function Highlight({
  id,
  markerColor,
  note,
  text,
}: {
  id: string;
  markerColor: string;
  note: string;
  text: string;
}) {
  const { editNoteFieldOpen } = useAppSelector((state) => state.note);
  const dispatch = useAppDispatch();

  return (
    <div
      className={styles.highlight}
      data-note-id={id}
      onClick={(e) => {
        let element = e.target as HTMLElement;
        if (!element.id && element.parentElement) {
          element = element.parentElement;
        }
        const target = document.querySelector(
          `[data-highlight-id="${element.dataset.noteId}"]`
        );
        dispatch(setIsEditNoteFieldOpen(id));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          });
        } else {
          console.log("該章節還不存在");
        }
      }}
    >
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
