"use client";
import React, { Dispatch } from "react";
import styles from "./NoteForm.module.css";

import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import { useAuth } from "@/context/AuthContext";
import {
  setActionMenuToggle,
  setIsAddNoteBlockOpen,
} from "@/lib/redux/features/readSlice";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import {
  setHighlight,
  setIsEditNoteFieldOpen,
  updateNote,
} from "@/lib/redux/features/noteSlice";
import { usePathname } from "next/navigation";

type dataType = {
  note: string;
};

const schema = yup.object().shape({
  note: yup.string().min(1, "At least one word provided").required(),
});

const NoteForm = ({
  onIsAddNoteBlockOpen,
  currentHighlightId,
  isFirstTime,
  onDeleteHighlight,
  note,
  onChangeNote,
}: {
  onIsAddNoteBlockOpen?: Dispatch<boolean>;
  currentHighlightId: string;
  isFirstTime?: boolean;
  onDeleteHighlight?: () => void;
  note?: string;
  onChangeNote?: Dispatch<any>;
}) => {
  const arrPath = usePathname().split("/");
  const category = arrPath[1];
  const bookId = arrPath[arrPath.length - 1];

  const dispatch = useAppDispatch();
  const { currentBook, deleteHighlightID, currentCategory, currentChapter } =
    useAppSelector((state) => state.read);

  const { highlightList } = useAppSelector((state) => state.note);
  const firestore = useFirestore();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<dataType> = async (data) => {
    if (data.note.length === 0) return;
    if (currentChapter) {
      const index = highlightList.findIndex(
        (cur) => cur.id === currentHighlightId
      );
      if (highlightList[index].note === data.note) return;
      dispatch(
        updateNote({
          index,
          note: data.note,
        })
      );
      await firestore.updateDocument(
        `/users/${user.uid}/${category}/${bookId}/highlights`,
        currentChapter,
        {
          [`${currentHighlightId}.note`]: data.note,
        }
      );

      if (onChangeNote) {
        onChangeNote(data.note);
      }

      if (onIsAddNoteBlockOpen) {
        onIsAddNoteBlockOpen(false);
      }
      dispatch(setIsEditNoteFieldOpen(false));
    }
  };

  return (
    <div className={styles.noteForm_container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          cols={1}
          placeholder="Add a note..."
          rows={1}
          className={styles.textarea}
          {...register("note")}
        >
          {note && note}
        </textarea>
        <div className={styles.button_wrapper}>
          <button
            id={"btn_cancel_add_note"}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (isFirstTime && onDeleteHighlight) {
                onDeleteHighlight();
                reset();
              }
              if (onIsAddNoteBlockOpen) {
                onIsAddNoteBlockOpen(false);
              }
              dispatch(setActionMenuToggle(false));
              dispatch(setIsEditNoteFieldOpen(false));
              return;
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            id={"btn_save_note"}
            className={styles.button_save}
            onClick={() => {
              handleSubmit(onSubmit);
            }}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;