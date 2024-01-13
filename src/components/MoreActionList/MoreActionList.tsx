"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./MoreActionList.module.css";
import { usePathname } from "next/navigation";

import EditTagField from "../EditTagField/EditTagField";

import BookProps from "@/types/BookProps";

/* Custom_hook */
import { useAppDispatch } from "@/hooks/redux/hooks";
import { deleteBook, resetSuccessful } from "@/lib/redux/features/bookSlice";
import { setMoreActionBtnClose } from "@/lib/redux/features/moreActionSlice";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import useCloudStorage from "@/hooks/firebase_db/useCloudStorage";
import { useAuth } from "@/context/AuthContext";

export default function MoreActionList({
  book,
  tags,
  onAddTag,
}: {
  book: BookProps;
  tags: string[] | null;
  onAddTag: Dispatch<SetStateAction<string[]>>;
}) {
  const [isAddTagFieldOpen, setIsAddTagFieldOpen] = useState(false);
  const dispatch = useAppDispatch();
  const firestore = useFirestore();
  const cloudStorage = useCloudStorage();
  const { user } = useAuth();
  const pathname = usePathname();

  const handleDelete = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const isDataDeletedFromStore = await firestore.deleteDocument(
      `users/${user.uid}/books/${book.bookId}`
    );

    if (isDataDeletedFromStore) {
      await cloudStorage.deleteFiles(
        `${user.uid}/books/${book.bookId}/${book.bookId}`
      );
      dispatch(deleteBook(book.bookId));
      setTimeout(() => dispatch(resetSuccessful()), 3000);
      dispatch(setMoreActionBtnClose());
    } else {
    }
  };

  return (
    <>
      <div className={styles.more_action} onClick={(e) => e.stopPropagation()}>
        {!isAddTagFieldOpen && (
          <>
            <button
              onClick={(e) => {
                setIsAddTagFieldOpen(true);
              }}
            >
              Add new tag
            </button>
            <button
              className={styles.delete_btn}
              onClick={(e) => handleDelete(e)}
            >
              Delete this book
            </button>
          </>
        )}
        {isAddTagFieldOpen && (
          <EditTagField tags={tags} onAddTag={onAddTag} bookId={book.bookId} />
        )}
      </div>
    </>
  );
}
