"use client";

import styles from "./MoreActionList.module.css";

/* Custom_hook */
import { useAppSelector, useAppDispatch } from "@/hooks/redux/hooks";
import { deleteBook, resetSuccessful } from "@/lib/redux/features/bookSlice";
import { setMoreActionBtnClose } from "@/lib/redux/features/moreActionSlice";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import useCloudStorage from "@/hooks/firebase_db/useCloudStorage";
import { useAuth } from "@/context/AuthContext";
import BookProps from "@/types/BookProps";

export default function MoreActionList({ book }: { book: BookProps }) {
  const dispatch = useAppDispatch();
  const firestore = useFirestore();
  const cloudStorage = useCloudStorage();
  const { user } = useAuth();

  const handleDelete = async () => {
    console.log("delete");
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
    <ul className={styles.more_action}>
      <li>Add new tag</li>
      <li className={styles.delete_btn} onClick={() => handleDelete()}>
        Delete this book
      </li>
    </ul>
  );
}
