import React, { useState } from "react";
import styles from "./Highlight.module.css";
import NoteForm from "../NoteForm/NoteForm";
import { useAppSelector, useAppDispatch } from "@/hooks/redux/hooks";
import { setIsEditNoteFieldOpen } from "@/lib/redux/features/noteSlice";

export default function Highlight({ highlight }: { highlight: any }) {
  const { editNoteFieldOpen } = useAppSelector((state) => state.note);
  const [note, setNote] = useState(highlight.note);
  const dispatch = useAppDispatch();

  return (
    <div
      className={styles.highlight}
      data-note-id={highlight.id}
      onClick={(e) => {
        let element = e.target as HTMLElement;
        if (!element.id && element.parentElement) {
          element = element.parentElement;
        }
        const target = document.querySelector(
          `[data-highlight-id="${element.dataset.noteId}"]`
        );
        console.log(element);
        dispatch(setIsEditNoteFieldOpen(highlight.id));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          });
        } else {
          console.log("該highlight章節還不存在");
        }
      }}
    >
      <span
        style={{ backgroundColor: `var(--color-${highlight.markerColor})` }}
        className={styles.highlight_text}
      >
        {highlight.text}
      </span>
      {note && editNoteFieldOpen !== highlight.id && (
        <div>
          <span>{note}</span>
        </div>
      )}
      {note &&
        editNoteFieldOpen !== false &&
        editNoteFieldOpen === highlight.id && (
          <div className={styles.note_form}>
            <NoteForm
              currentHighlightId={highlight.id}
              note={note}
              onChangeNote={setNote}
            />
          </div>
        )}
    </div>
  );
}
