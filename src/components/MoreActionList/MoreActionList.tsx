"use client";

import styles from "./MoreActionList.module.css";

/* Custom_hook */
import { useAppSelector, useAppDispatch } from "@/hooks/redux/hooks";
import { deleteBook, resetSuccessful } from "@/lib/redux/features/bookSlice";
import { setMoreActionBtnClose } from "@/lib/redux/features/moreActionSlice";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import { useAuth } from "@/context/AuthContext";

export default function MoreActionList({ bookId }: { bookId: string }) {
  const dispatch = useAppDispatch();
  const firestore = useFirestore();
  const { user } = useAuth();

  const handleDelete = async () => {
    console.log("delete");
    const isDataDeletedFromStore = await firestore.deleteDocument(
      `users/${user.uid}/books/${bookId}`
    );

    if (isDataDeletedFromStore) {
      const isFileDeleted = await firestore.deleteFiles(
        `${user.uid}/books/${bookId}/${bookId}`
      );
      dispatch(deleteBook(bookId));
      setTimeout(() => dispatch(resetSuccessful()), 3000);
      dispatch(setMoreActionBtnClose());
    } else {
    }
  };

  return (
    <ul className={styles.more_action}>
      <li className={styles.delete_btn} onClick={() => handleDelete()}>
        Delete this book
      </li>
    </ul>
  );
}
