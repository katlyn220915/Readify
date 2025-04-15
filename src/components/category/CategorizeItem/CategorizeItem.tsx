import React from "react";

import ActionIcon from "@/components/common/ActionIcon/ActionIcon";
import { useAuth } from "@/context/AuthContext";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import { useAppDispatch } from "@/hooks/redux/hooks";
import { deleteBook, resetSuccessful } from "@/lib/redux/features/bookSlice";
import BookProps from "@/types/BookProps";

import styles from "./CategorizeItem.module.css";

export const CategorizeItem = ({
  item,
  book,
}: {
  item: { title: string; iconProp?: any; path: string };
  book: BookProps;
}) => {
  const { user } = useAuth();
  const firestore = useFirestore();
  const dispatch = useAppDispatch();
  const isCurrentCategory = book.category === item.path;

  const handleCategorizeBook = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (book.category === item.path) return;
    await firestore.updateDocument(`users/${user.uid}/books`, book.bookId, {
      category: item.path.split("/").pop(),
    });
    dispatch(deleteBook(book.bookId));
    dispatch(resetSuccessful());
  };
  return (
    <>
      <button
        className={`${styles.li} ${
          isCurrentCategory ? styles.current_path : ""
        }`}
        onClick={(e) => handleCategorizeBook(e)}
      >
        <ActionIcon
          iconProp={item.iconProp}
          promptText={item.title}
          position="top"
          showPrompt={!isCurrentCategory}
          onAction={() => {}}
          color={`${isCurrentCategory ? "grey-600" : "grey-300"}`}
        />
      </button>
      <button
        onClick={(e) => handleCategorizeBook(e)}
        className={styles.mobile_categorize_btn}
      >
        {item.title}
      </button>
    </>
  );
};
